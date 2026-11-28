import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

import { ApiError } from '@/shared/api/api-error';

type ServerFieldError = {
  field: string;
  errors: string[];
};

export function applyServerErrors<TFieldValues extends FieldValues>(
  form: Pick<UseFormReturn<TFieldValues>, 'setError'>,
  error: unknown,
): boolean {
  if (
    !(error instanceof ApiError) ||
    error.code !== 'VALIDATION_ERROR' ||
    !Array.isArray(error.details)
  ) {
    return false;
  }

  for (const item of error.details) {
    if (typeof item === 'object' && item !== null && 'field' in item && 'errors' in item) {
      const fieldError = item as ServerFieldError;

      if (
        typeof fieldError.field === 'string' &&
        Array.isArray(fieldError.errors) &&
        typeof fieldError.errors[0] === 'string'
      ) {
        form.setError(fieldError.field as FieldPath<TFieldValues>, {
          type: 'server',
          message: fieldError.errors[0],
        });
      }
    }
  }

  return true;
}
