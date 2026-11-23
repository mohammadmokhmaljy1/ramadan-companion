import { useState } from 'react';
import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';

import AdminNavigation from '@/app/components/AdminNavigation';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/shared/ui/sheet';

export default function AdminLayout() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-background text-foreground flex min-h-screen">
      {/* Admin Sidebar */}
      <aside className="border-border-subtle bg-card hidden w-64 shrink-0 border-e p-4 md:block">
        <h1 className="text-gold-400 mb-8 text-xl font-bold">{t('navigation.adminDashboard')}</h1>

        <AdminNavigation />
      </aside>

      {/* Admin Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-border-subtle flex items-center justify-between border-b p-4">
          {/* Mobile Menu */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="text-foreground hover:bg-secondary rounded-lg p-2 md:hidden"
                aria-label="Open admin menu"
              >
                <Menu size={22} />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-card border-border-subtle w-72 border-e p-4 md:hidden"
            >
              <SheetTitle className="text-gold-400 mb-8 text-xl font-bold">
                {t('navigation.adminDashboard')}
              </SheetTitle>

              <AdminNavigation onNavigate={() => setMenuOpen(false)} />
            </SheetContent>
          </Sheet>

          <LanguageSwitcher />
        </header>

        <main className="min-w-0 flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
