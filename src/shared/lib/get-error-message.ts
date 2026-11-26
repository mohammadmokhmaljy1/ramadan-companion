import { ApiError } from '@/shared/api/api-error';

const errorTranslationKeys: Record<string, string> = {
  VALIDATION_ERROR: 'errors.validation',
  UNAUTHORIZED: 'errors.unauthorized',
  INVALID_CREDENTIALS: 'errors.invalidCredentials',
  EMAIL_TAKEN: 'errors.emailTaken',
  WRONG_PASSWORD: 'errors.wrongPassword',
  FORBIDDEN: 'errors.forbidden',
  NOT_FOUND: 'errors.notFound',
  ONBOARDING_REQUIRED: 'errors.onboardingRequired',
  NO_ACTIVE_SEASON: 'errors.noActiveSeason',
  PLAN_EXISTS: 'errors.planExists',
  INVALID_PAGE_RANGE: 'errors.invalidPageRange',
  SEASON_OVERLAP: 'errors.seasonOverlap',
  SEASON_HAS_DATA: 'errors.seasonHasData',
  PRAYER_TIMES_UNAVAILABLE: 'errors.prayerTimesUnavailable',
  TOO_MANY_REQUESTS: 'errors.tooManyRequests',
  CONFLICT: 'errors.conflict',
  PUSH_NOT_CONFIGURED: 'errors.pushNotConfigured',
  INTERNAL_ERROR: 'errors.internal',
};

export function getErrorMessage(error: unknown, t: (key: string) => string): string {
  if (!(error instanceof ApiError) || !error.code) {
    return t('errors.generic');
  }

  const translationKey = errorTranslationKeys[error.code];

  return t(translationKey ?? 'errors.generic');
}
