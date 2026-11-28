import { delay, http, HttpResponse } from 'msw';

import {
  clearMockRefreshSession,
  hasRefreshCookie,
  refreshTokens,
  sessions,
  setMockRefreshSession,
  users,
} from './db';
import { fail, ok } from './utils';

const ACCESS_TOKEN_EXPIRY = 900;
const REFRESH_COOKIE_NAME = 'refreshToken';

const LOGIN_ATTEMPT_LIMIT = 10;
const LOGIN_ATTEMPT_WINDOW = 60_000;

const loginAttempts = new Map<string, number[]>();

const accessTokenExpirations = new Map<string, number>();

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    password.length <= 64 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password)
  );
}

export function getAuthenticatedUser(request: Request) {
  const authorization = request.headers.get('Authorization');
  const accessToken = authorization?.replace(/^Bearer\s+/i, '');

  if (!accessToken) {
    return undefined;
  }

  const userId = sessions.get(accessToken);
  const expiresAt = accessTokenExpirations.get(accessToken);

  if (!userId || !expiresAt || Date.now() >= expiresAt) {
    sessions.delete(accessToken);
    accessTokenExpirations.delete(accessToken);
    return undefined;
  }

  return users.find((user) => user.id === userId);
}

function storeAccessToken(token: string, userId: number) {
  sessions.set(token, userId);
  accessTokenExpirations.set(token, Date.now() + ACCESS_TOKEN_EXPIRY * 1000);
}

function isRateLimited(email: string) {
  const now = Date.now();

  const attempts = (loginAttempts.get(email) ?? []).filter(
    (timestamp) => now - timestamp < LOGIN_ATTEMPT_WINDOW,
  );

  if (attempts.length >= LOGIN_ATTEMPT_LIMIT) {
    loginAttempts.set(email, attempts);
    return true;
  }

  attempts.push(now);
  loginAttempts.set(email, attempts);

  return false;
}

function getPublicUser(user: (typeof users)[number]) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    preferredLanguage: user.preferredLanguage,
    onboardingCompleted: user.onboardingCompleted,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
  };
}

function createToken() {
  return crypto.randomUUID();
}

function getRefreshToken(request: Request) {
  const cookies = request.headers.get('Cookie') ?? '';

  const cookie = cookies
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${REFRESH_COOKIE_NAME}=`));

  return cookie?.slice(REFRESH_COOKIE_NAME.length + 1);
}

function createRefreshCookie(token: string) {
  return `${REFRESH_COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax`;
}

function clearRefreshCookie() {
  return `${REFRESH_COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
}

function unauthorized() {
  const response = fail(401, 'UNAUTHORIZED', 'Authentication required');

  return HttpResponse.json(response.body, {
    status: response.status,
  });
}

export const authHandlers = [
  http.post('/auth/register', async ({ request }) => {
    await delay(400);

    const body = (await request.json()) as {
      fullName: string;
      email: string;
      password: string;
      preferredLanguage: 'ar' | 'en';
    };

    if (!isValidPassword(body.password)) {
      const response = fail(
        400,
        'VALIDATION_ERROR',
        'Password must be 8-64 characters and contain at least one letter and one digit',
      );

      return HttpResponse.json(response.body, {
        status: response.status,
      });
    }

    const existingUser = users.find(
      (user) => normalizeEmail(user.email) === normalizeEmail(body.email),
    );

    if (existingUser) {
      const response = fail(409, 'EMAIL_TAKEN', 'Email already exists');

      return HttpResponse.json(response.body, {
        status: response.status,
      });
    }

    const user = {
      id: Math.max(0, ...users.map((item) => item.id)) + 1,
      fullName: body.fullName,
      email: normalizeEmail(body.email),
      password: body.password,
      role: 'USER' as const,
      preferredLanguage: body.preferredLanguage,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: null,
    };

    users.push(user);

    const accessToken = createToken();
    const refreshToken = createToken();

    storeAccessToken(accessToken, user.id);
    setMockRefreshSession(refreshToken, user.id);

    return HttpResponse.json(
      ok({
        accessToken,
        expiresIn: ACCESS_TOKEN_EXPIRY,
        user: getPublicUser(user),
      }),
      {
        status: 201,
        headers: {
          'Set-Cookie': createRefreshCookie(refreshToken),
        },
      },
    );
  }),

  http.post('/auth/login', async ({ request }) => {
    await delay(400);

    const body = (await request.json()) as {
      email: string;
      password: string;
    };

    if (isRateLimited(normalizeEmail(body.email))) {
      const response = fail(
        429,
        'TOO_MANY_REQUESTS',
        'Too many login attempts. Please try again later.',
      );

      return HttpResponse.json(response.body, {
        status: response.status,
      });
    }

    const user = users.find(
      (item) =>
        normalizeEmail(item.email) === normalizeEmail(body.email) &&
        item.password === body.password,
    );

    if (!user) {
      const response = fail(401, 'INVALID_CREDENTIALS', 'Invalid email or password');

      return HttpResponse.json(response.body, {
        status: response.status,
      });
    }

    user.lastLoginAt = new Date().toISOString();

    const accessToken = createToken();
    const refreshToken = createToken();

    storeAccessToken(accessToken, user.id);
    setMockRefreshSession(refreshToken, user.id);

    return HttpResponse.json(
      ok({
        accessToken,
        expiresIn: ACCESS_TOKEN_EXPIRY,
        user: getPublicUser(user),
      }),
      {
        headers: {
          'Set-Cookie': createRefreshCookie(refreshToken),
        },
      },
    );
  }),

  http.post('/auth/refresh', async ({ cookies }) => {
    await delay(400);

    const cookieToken = cookies[REFRESH_COOKIE_NAME];

    const storedRefreshToken =
      cookieToken ?? (hasRefreshCookie ? Array.from(refreshTokens.keys()).pop() : undefined);

    const userId = storedRefreshToken ? refreshTokens.get(storedRefreshToken) : undefined;

    const user = users.find((item) => item.id === userId);

    if (!hasRefreshCookie || !user || !storedRefreshToken) {
      return unauthorized();
    }

    const accessToken = createToken();

    storeAccessToken(accessToken, user.id);

    return HttpResponse.json(
      ok({
        accessToken,
        expiresIn: ACCESS_TOKEN_EXPIRY,
        user: getPublicUser(user),
      }),
    );
  }),

  http.post('/auth/logout', async ({ request }) => {
    await delay(400);

    const authorization = request.headers.get('Authorization');
    const accessToken = authorization?.replace(/^Bearer\s+/i, '');

    if (accessToken) {
      sessions.delete(accessToken);
      accessTokenExpirations.delete(accessToken);
    }

    const refreshToken = getRefreshToken(request);

    if (refreshToken) {
      refreshTokens.delete(refreshToken);
    }

    clearMockRefreshSession();

    return new HttpResponse(null, {
      status: 204,
      headers: {
        'Set-Cookie': clearRefreshCookie(),
      },
    });
  }),

  http.get('/auth/me', async ({ request }) => {
    await delay(400);

    const user = getAuthenticatedUser(request);

    if (!user) {
      return unauthorized();
    }

    return HttpResponse.json(ok(getPublicUser(user)));
  }),

  http.patch('/auth/me', async ({ request }) => {
    await delay(400);

    const user = getAuthenticatedUser(request);

    if (!user) {
      return unauthorized();
    }

    if (!user.onboardingCompleted && user.role === 'USER') {
      const response = fail(403, 'ONBOARDING_REQUIRED', 'Complete onboarding first');

      return HttpResponse.json(response.body, {
        status: response.status,
      });
    }

    const body = (await request.json()) as {
      fullName?: string;
      preferredLanguage?: 'ar' | 'en';
    };

    if (body.fullName !== undefined) {
      user.fullName = body.fullName;
    }

    if (body.preferredLanguage !== undefined) {
      user.preferredLanguage = body.preferredLanguage;
    }

    return HttpResponse.json(ok(getPublicUser(user)));
  }),

  http.patch('/auth/me/password', async ({ request }) => {
    await delay(400);

    const user = getAuthenticatedUser(request);

    if (!user) {
      return unauthorized();
    }

    if (!user.onboardingCompleted && user.role === 'USER') {
      const response = fail(403, 'ONBOARDING_REQUIRED', 'Complete onboarding first');

      return HttpResponse.json(response.body, {
        status: response.status,
      });
    }

    const body = (await request.json()) as {
      currentPassword: string;
      newPassword: string;
    };

    if (user.password !== body.currentPassword) {
      const response = fail(400, 'WRONG_PASSWORD', 'Current password is incorrect');

      return HttpResponse.json(response.body, {
        status: response.status,
      });
    }

    if (!isValidPassword(body.newPassword)) {
      const response = fail(
        400,
        'VALIDATION_ERROR',
        'Password must be 8-64 characters and contain at least one letter and one digit',
      );

      return HttpResponse.json(response.body, {
        status: response.status,
      });
    }

    user.password = body.newPassword;

    return new HttpResponse(null, {
      status: 204,
    });
  }),
];
