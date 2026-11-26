import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { getToday } from '@/features/today/api';

export function useToday() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage ?? i18n.language ?? 'ar';
  const lang = currentLanguage.startsWith('en') ? 'en' : 'ar';

  return useQuery({
    queryKey: ['today', lang],
    queryFn: getToday,
  });
}
