import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import MobileBottomNavigation from '@/app/components/MobileBottomNavigation';

import MainNavigation from '@/app/components/MainNavigation';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';

export default function AppLayout() {
  const { t } = useTranslation();

  return (
    <div className="bg-background text-foreground flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="border-border-subtle bg-card hidden w-64 shrink-0 border-e p-4 md:block">
        <h1 className="text-gold-400 mb-8 text-xl font-bold">{t('common.appName')}</h1>

        <MainNavigation />
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-border-subtle flex items-center justify-end border-b p-4">
          <LanguageSwitcher />
        </header>

        <main className="min-w-0 flex-1 p-4 pb-24 md:p-8 md:pb-8">
          <Outlet />
        </main>
      </div>
      <MobileBottomNavigation />
    </div>
  );
}
