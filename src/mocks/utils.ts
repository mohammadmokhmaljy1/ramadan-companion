import type { ApiEnvelope, ApiErrorDetail, PageMeta } from '@/shared/types/api';

export function ok<T>(data: T, meta?: PageMeta): ApiEnvelope<T> {
  return {
    success: true,
    data,
    meta: meta ?? null,
    error: null,
  };
}

export function fail(
  status: number,
  code: string,
  message: string,
  details?: ApiErrorDetail[],
) {
  return {
    status,
    body: {
      success: false,
      data: null,
      meta: null,
      error: {
        code,
        message,
        ...(details ? { details } : {}),
      },
    },
  };
}