export type SupportedLanguage = 'ar' | 'en';

const getLocale = (lang: SupportedLanguage) => (lang === 'ar' ? 'ar-SA' : 'en-US');

export function formatNumber(value: number, lang: SupportedLanguage): string {
  return new Intl.NumberFormat(getLocale(lang)).format(value);
}

export function formatDate(date: Date, lang: SupportedLanguage): string {
  return new Intl.DateTimeFormat(getLocale(lang), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatHijri(date: Date, lang: SupportedLanguage): string {
  return new Intl.DateTimeFormat(getLocale(lang), {
    calendar: 'islamic-umalqura',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
