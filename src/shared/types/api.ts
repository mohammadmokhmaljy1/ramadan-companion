export type ApiErrorCode = string;

export interface PageMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  [key: string]: unknown;
}

export interface ApiErrorBody {
  code?: ApiErrorCode;
  message: string;
  details?: unknown;
}

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  meta?: PageMeta | null;
  error?: ApiErrorBody | null;
}
