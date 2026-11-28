import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { authApi } from '@/features/auth/api';
import type { RegisterPayload } from '@/features/auth/types';

export function useRegister() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage ?? i18n.language ?? 'ar';
  const preferredLanguage = currentLanguage.startsWith('en') ? 'en' : 'ar';

  return useMutation({
    mutationFn: (data: Omit<RegisterPayload, 'preferredLanguage'>) =>
      authApi.register({
        ...data,
        preferredLanguage,
      }),
  });
}
