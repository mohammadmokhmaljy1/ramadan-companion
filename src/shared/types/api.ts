export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_TAKEN'
  | 'WRONG_PASSWORD'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'ONBOARDING_REQUIRED'
  | 'NO_ACTIVE_SEASON'
  | 'PLAN_EXISTS'
  | 'INVALID_PAGE_RANGE'
  | 'SEASON_OVERLAP'
  | 'SEASON_HAS_DATA'
  | 'PRAYER_TIMES_UNAVAILABLE'
  | 'TOO_MANY_REQUESTS'
  | 'CONFLICT'
  | 'PUSH_NOT_CONFIGURED'
  | 'INTERNAL_ERROR'
  | (string & {});

export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiErrorDetail {
  field: string;
  errors: string[];
}

export interface ApiErrorBody {
  code: ApiErrorCode;
  message: string;
  details?: ApiErrorDetail[];
}

export interface ApiEnvelope<T> {
  success: boolean;
  data: T | null;
  meta: PageMeta | null;
  error: ApiErrorBody | null;
}
