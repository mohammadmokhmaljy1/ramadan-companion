import axios from 'axios';

import i18n from '@/shared/i18n/i18n';
import { ApiError } from '@/shared/api/api-error';
import type { ApiErrorBody } from '@/shared/types/api';

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

  if (typeof candidate.message !== 'string') return null;

  return {
    message: candidate.message,
    code: typeof candidate.code === 'string' ? candidate.code : undefined,
    details: candidate.details,
  };
}

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  config.headers.set('Accept-Language', i18n.language);

  // TODO(auth): Add the authentication token header here.

  return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0;
      const responseData: unknown = error.response?.data;
      const apiError = getApiErrorBody(responseData);

      return Promise.reject(
        new ApiError(
          status,
          apiError?.code ?? null,
          apiError?.message || error.message || 'Request failed',
          apiError?.details,
        ),
      );
    }

    return Promise.reject(
      new ApiError(0, null, error instanceof Error ? error.message : 'Unknown error'),
    );
  },
);
