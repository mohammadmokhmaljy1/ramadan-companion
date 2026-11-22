import {
  Home,
  Clock,
  BookOpen,
  Heart,
  Ellipsis,
  Target,
  ChartNoAxesColumn,
  Settings,
} from 'lucide-react';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Dialog } from 'radix-ui';

const mainItems = [
  { to: '/', label: 'home', icon: Home, end: true },
  { to: '/prayer-times', label: 'prayerTimes', icon: Clock, end: false },
  { to: '/quran', label: 'quran', icon: BookOpen, end: false },
  { to: '/worship', label: 'worship', icon: Heart, end: false },
] as const;

const moreItems = [
  { to: '/goals', label: 'goals', icon: Target },
  { to: '/reports', label: 'reports', icon: ChartNoAxesColumn },
  { to: '/settings', label: 'settings', icon: Settings },
] as const;

export default function MobileBottomNavigation() {
  const { t } = useTranslation();

  return (
    <nav className="border-border-subtle bg-card fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t p-2 md:hidden">
      {mainItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 rounded-lg py-2 text-xs transition-colors ${
              isActive ? 'text-gold-400' : 'text-muted-foreground'
            }`
          }
        >
          <Icon size={20} />
          <span>{t(`navigation.${label}`)}</span>
        </NavLink>
      ))}

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="text-muted-foreground flex flex-col items-center gap-1 rounded-lg py-2 text-xs"
          >
            <Ellipsis size={20} />
            <span>{t('navigation.more')}</span>
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />

          <Dialog.Content className="bg-card border-border-subtle fixed inset-x-0 bottom-0 z-50 max-h-[70dvh] w-full overflow-y-auto rounded-t-2xl border-t p-5 pb-8">
            <div className="bg-muted-foreground/30 mx-auto mb-4 h-1 w-10 rounded-full" />

            <Dialog.Title className="mb-5 text-lg font-bold">{t('navigation.more')}</Dialog.Title>

            <nav className="flex flex-col gap-2">
              {moreItems.map(({ to, label, icon: Icon }) => (
                <Dialog.Close asChild key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `grid w-full grid-cols-[20px_1fr] items-center gap-3 rounded-xl px-4 py-3 text-start transition-colors ${
                        isActive
                          ? 'bg-primary-900 text-gold-400'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span>{t(`navigation.${label}`)}</span>
                  </NavLink>
                </Dialog.Close>
              ))}
            </nav>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </nav>
  );
}
