import { useToday } from '@/features/today/hooks/useToday';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { data, isPending, isError, error } = useToday();
  const { i18n } = useTranslation();

  const isArabic = i18n.language.startsWith('ar');

  if (isPending) {
    return (
      <main className="p-6" dir={isArabic ? 'rtl' : 'ltr'}>
        <p className="text-[#afc3ba]">
          {isArabic ? 'جارٍ تحميل بيانات اليوم...' : 'Loading today data...'}
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-6" dir={isArabic ? 'rtl' : 'ltr'}>
        <p role="alert" className="text-red-400">
          {isArabic ? 'تعذر تحميل بيانات اليوم: ' : 'Unable to load today data: '}
          {error.message}
        </p>
      </main>
    );
  }

  if (!data) return null;
  return (
    <main dir={isArabic ? 'rtl' : 'ltr'} className="p-5 sm:p-8">
      <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm text-white">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
