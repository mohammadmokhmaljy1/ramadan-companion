import { createBrowserRouter } from 'react-router';

import AuthLayout from '@/app/layouts/AuthLayout';
import AppLayout from '@/app/layouts/AppLayout';
import AdminLayout from '@/app/layouts/AdminLayout';

export const router = createBrowserRouter([
  // Authentication Routes
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        lazy: async () => ({
          Component: (await import('@/app/pages/auth/LoginPage')).default,
        }),
      },
      {
        path: '/register',
        lazy: async () => ({
          Component: (await import('@/app/pages/auth/RegisterPage')).default,
        }),
      },
      {
        path: '/onboarding',
        lazy: async () => ({
          Component: (await import('@/app/pages/auth/OnboardingPage')).default,
        }),
      },
    ],
  },

  // Main Application Routes
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('@/app/pages/main/HomePage')).default,
        }),
      },
      {
        path: 'prayer-times',
        lazy: async () => ({
          Component: (await import('@/app/pages/main/PrayerTimesPage')).default,
        }),
      },
      {
        path: 'quran',
        lazy: async () => ({
          Component: (await import('@/app/pages/main/QuranPage')).default,
        }),
      },
      {
        path: 'worship',
        lazy: async () => ({
          Component: (await import('@/app/pages/main/WorshipPage')).default,
        }),
      },
      {
        path: 'goals',
        lazy: async () => ({
          Component: (await import('@/app/pages/main/GoalsPage')).default,
        }),
      },
      {
        path: 'reports',
        lazy: async () => ({
          Component: (await import('@/app/pages/main/ReportsPage')).default,
        }),
      },
      {
        path: 'settings',
        lazy: async () => ({
          Component: (await import('@/app/pages/main/SettingsPage')).default,
        }),
      },
    ],
  },

  // Admin Routes
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('@/app/pages/admin/AdminDashboardPage')).default,
        }),
      },
      {
        path: 'seasons',
        lazy: async () => ({
          Component: (await import('@/app/pages/admin/AdminSeasonsPage')).default,
        }),
      },
      {
        path: 'duas',
        lazy: async () => ({
          Component: (await import('@/app/pages/admin/AdminDuasPage')).default,
        }),
      },
      {
        path: 'users',
        lazy: async () => ({
          Component: (await import('@/app/pages/admin/AdminUsersPage')).default,
        }),
      },
      {
        path: 'users/:id',
        lazy: async () => ({
          Component: (await import('@/app/pages/admin/AdminUserDetailsPage')).default,
        }),
      },
      {
        path: 'reminders',
        lazy: async () => ({
          Component: (await import('@/app/pages/admin/AdminRemindersPage')).default,
        }),
      },
    ],
  },

  // Not Found Route
  {
    path: '*',
    lazy: async () => ({
      Component: (await import('@/app/pages/NotFoundPage')).default,
    }),
  },
]);
