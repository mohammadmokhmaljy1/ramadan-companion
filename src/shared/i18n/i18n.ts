import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import ar from './locales/ar.json';
import en from './locales/en.json';

const resources = {
  ar: {
    translation: ar,
  },
  en: {
    translation: en,
  },
} as const;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: typeof resources.ar;
    returnNull: false;
  }
}

const updateDocumentLanguage = (language: string) => {
  if (typeof document === 'undefined') return;

  const lang = language.startsWith('en') ? 'en' : 'ar';

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    supportedLngs: ['ar', 'en'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'ramadan-companion-language',
      caches: ['localStorage'],
    },
    returnNull: false,
  });

i18n.on('languageChanged', updateDocumentLanguage);

updateDocumentLanguage(i18n.resolvedLanguage ?? i18n.language ?? 'ar');

export default i18n;
