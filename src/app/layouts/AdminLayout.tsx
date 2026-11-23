import { useState } from 'react';
import { Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import { Dialog } from 'radix-ui';

import AdminNavigation from '@/app/components/AdminNavigation';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';

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
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="text-foreground hover:bg-secondary rounded-lg p-2 md:hidden"
                aria-label="Open admin menu"
              >
                <Menu size={22} />
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 md:hidden" />

              <Dialog.Content className="bg-card border-border-subtle fixed inset-y-0 z-50 w-72 border-e p-4 md:hidden">
                <Dialog.Title className="text-gold-400 mb-8 text-xl font-bold">
                  {t('navigation.adminDashboard')}
                </Dialog.Title>

                <AdminNavigation onNavigate={() => setMenuOpen(false)} />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <LanguageSwitcher />
        </header>

        <main className="min-w-0 flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
