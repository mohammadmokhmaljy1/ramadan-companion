import type { ApiErrorCode } from '@/shared/types/api';

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: ApiErrorCode | null;
  public readonly details: unknown;

  constructor(status: number, code: ApiErrorCode | null, message: string, details?: unknown) {
    super(message);

    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
