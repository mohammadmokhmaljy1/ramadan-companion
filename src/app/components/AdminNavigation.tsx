import { LayoutDashboard, CalendarRange, HandHeart, Users, BellRing } from 'lucide-react';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';

const adminItems = [
  { to: '/admin', label: 'adminDashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/seasons', label: 'seasons', icon: CalendarRange, end: false },
  { to: '/admin/duas', label: 'duas', icon: HandHeart, end: false },
  { to: '/admin/users', label: 'users', icon: Users, end: false },
  { to: '/admin/reminders', label: 'reminders', icon: BellRing, end: false },
] as const;

interface AdminNavigationProps {
  onNavigate?: () => void;
}

export default function AdminNavigation({ onNavigate }: AdminNavigationProps) {
  const { t } = useTranslation();

  return (
    <nav className="space-y-2">
      {adminItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
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
