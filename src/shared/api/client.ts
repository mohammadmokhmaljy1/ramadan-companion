import axios, { type InternalAxiosRequestConfig } from 'axios';

import i18n from '@/shared/i18n/i18n';
import { ApiError } from '@/shared/api/api-error';
import { clearAccessToken, getAccessToken, setAccessToken } from '@/shared/api/token';
import type { ApiEnvelope, ApiErrorBody } from '@/shared/types/api';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshResponse {
  accessToken: string;
  expiresIn: number;
  user: unknown;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getApiErrorBody(data: unknown): ApiErrorBody | null {
  if (!isRecord(data)) return null;

  const candidate = isRecord(data.error) ? data.error : data;

  if (typeof candidate.message !== 'string' || typeof candidate.code !== 'string') {
    return null;
  }

  return {
    message: candidate.message,
    code: candidate.code,
    details: Array.isArray(candidate.details) ? candidate.details : undefined,
  };
}

function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    const apiError = getApiErrorBody(error.response?.data);

    return new ApiError(
      status,
      apiError?.code ?? null,
      apiError?.message ?? error.message ?? 'Request failed',
      apiError?.details,
    );
  }

  return new ApiError(0, null, error instanceof Error ? error.message : 'Unknown error');
}

function getLanguage(): 'ar' | 'en' {
  const language = i18n.resolvedLanguage ?? i18n.language ?? 'ar';

  return language.startsWith('en') ? 'en' : 'ar';
}

axiosInstance.interceptors.request.use((config) => {
  config.headers.set('Accept-Language', getLanguage());

  const token = getAccessToken();

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  } else {
    config.headers.delete('Authorization');
  }

  return config;
});

let refreshPromise: Promise<string> | null = null;

async function performRefresh(): Promise<string> {
  const baseURL = axiosInstance.defaults.baseURL ?? '';
  const refreshUrl = `${baseURL.replace(/\/$/, '')}/auth/refresh`;

  const response = await axios.post<ApiEnvelope<RefreshResponse>>(refreshUrl, undefined, {
    withCredentials: true,
    headers: {
      'Accept-Language': getLanguage(),
    },
  });

  const payload = response.data.data;

  if (!payload?.accessToken) {
    throw new Error('Refresh response did not contain an access token');
  }

  setAccessToken(payload.accessToken);

  return payload.accessToken;
}

export async function refreshSession(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = performRefresh().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

/**
 * Call once during application startup to restore the session
 * using the httpOnly refresh cookie.
 */
export async function restoreSession(): Promise<boolean> {
  try {
    await refreshSession();
    return true;
  } catch {
    clearAccessToken();
    return false;
  }
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(toApiError(error));
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const apiError = toApiError(error);

    if (
      error.response?.status !== 401 ||
      apiError.code !== 'UNAUTHORIZED' ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/refresh') ||
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register')
    ) {
      return Promise.reject(apiError);
    }

    const hadActiveSession = Boolean(getAccessToken());
    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshSession();

      originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);

      return axiosInstance(originalRequest);
    } catch {
      clearAccessToken();

      if (hadActiveSession) {
        window.dispatchEvent(new Event('auth:session-expired'));
      }

      return Promise.reject(apiError);
    }
  },
);
