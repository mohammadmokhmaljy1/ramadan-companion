import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';

export function LanguageSwitcher() {
  const { t } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'ar';

  const nextLanguage = currentLanguage === 'ar' ? 'en' : 'ar';

  const nextLanguageLabel = nextLanguage === 'en' ? t('common.english') : t('common.arabic');

  return (
    <button
      type="button"
      onClick={() => void i18n.changeLanguage(nextLanguage)}
      aria-label={`${t('common.language')}: ${nextLanguageLabel}`}
      className="border-border-strong text-text-primary hover:bg-surface-raised inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium"
    >
      {nextLanguageLabel}
    </button>
  );
}
