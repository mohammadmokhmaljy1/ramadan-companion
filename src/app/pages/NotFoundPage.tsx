import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <main className="bg-background text-foreground flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md text-center">
        <p className="text-6xl" aria-hidden="true">
          🌙
        </p>

        <p className="text-gold-400 mt-4 text-5xl font-extrabold">404</p>

        <h1 className="mt-4 text-2xl font-bold">{t('notFound.title')}</h1>

        <p className="text-muted-foreground mt-3">{t('notFound.description')}</p>

        <Link
          to="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex rounded-lg px-5 py-3 font-medium transition-colors"
        >
          {t('notFound.backHome')}
        </Link>
      </div>
    </main>
  );
}
