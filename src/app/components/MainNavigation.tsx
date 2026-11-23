import { Home, Clock, BookOpen, Heart, Target, ChartNoAxesColumn, Settings } from 'lucide-react';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';

const navigationItems = [
  { to: '/', label: 'home', icon: Home, end: true },
  { to: '/prayer-times', label: 'prayerTimes', icon: Clock, end: false },
  { to: '/quran', label: 'quran', icon: BookOpen, end: false },
  { to: '/worship', label: 'worship', icon: Heart, end: false },
  { to: '/goals', label: 'goals', icon: Target, end: false },
  { to: '/reports', label: 'reports', icon: ChartNoAxesColumn, end: false },
  { to: '/settings', label: 'settings', icon: Settings, end: false },
] as const;

export default function MainNavigation() {
  const { t } = useTranslation();

  return (
    <nav className="space-y-2">
      {navigationItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 transition-colors ${
              isActive
                ? 'bg-primary-900 text-gold-400'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`
          }
        >
          <Icon size={20} />
          <span>{t(`navigation.${label}`)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
