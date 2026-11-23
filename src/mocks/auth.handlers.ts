import { delay, http, HttpResponse } from 'msw';

import { users, sessions } from './db';
import { fail, ok } from './utils';

function getPublicUser(user: (typeof users)[number]) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export const authHandlers = [
  http.post('/auth/register', async ({ request }) => {
    await delay(400);

    const body = (await request.json()) as {
      name: string;
      email: string;
      password: string;
    };

    const existingUser = users.find((user) => user.email === body.email);

    if (existingUser) {
      const response = fail(409, 'EMAIL_ALREADY_EXISTS', 'Email already exists');

      return HttpResponse.json(response.body, { status: response.status });
    }

    const user = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      password: body.password,
      role: 'USER' as const,
    };

    users.push(user);

    return HttpResponse.json(ok(getPublicUser(user)), { status: 201 });
  }),

  http.post('/auth/login', async ({ request }) => {
    await delay(400);

    const body = (await request.json()) as {
      email: string;
      password: string;
    };

    const user = users.find((item) => item.email === body.email && item.password === body.password);

    if (!user) {
      const response = fail(401, 'INVALID_CREDENTIALS', 'Invalid email or password');

      return HttpResponse.json(response.body, { status: response.status });
    }

    const token = crypto.randomUUID();
    sessions.set(token, user.id);

    return HttpResponse.json(
      ok({
        user: getPublicUser(user),
        accessToken: token,
      }),
    );
  }),

  http.post('/auth/refresh', async () => {
    await delay(400);

    return HttpResponse.json(fail(401, 'INVALID_REFRESH_TOKEN', 'Invalid refresh token').body, {
      status: 401,
    });
  }),

  http.post('/auth/logout', async ({ request }) => {
    await delay(400);

    const authorization = request.headers.get('Authorization');
    const token = authorization?.replace(/^Bearer\s+/i, '');

    if (token) {
      sessions.delete(token);
    }

    return HttpResponse.json(ok({ message: 'Logged out successfully' }));
  }),

  http.get('/auth/me', async ({ request }) => {
    await delay(400);

    const authorization = request.headers.get('Authorization');
    const token = authorization?.replace(/^Bearer\s+/i, '');
    const userId = token ? sessions.get(token) : undefined;

    const user = users.find((item) => item.id === userId);

    if (!user) {
      const response = fail(401, 'UNAUTHORIZED', 'Authentication required');

      return HttpResponse.json(response.body, { status: response.status });
    }

    return HttpResponse.json(ok(getPublicUser(user)));
  }),
];
