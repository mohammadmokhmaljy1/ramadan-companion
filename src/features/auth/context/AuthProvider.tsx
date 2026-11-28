import { useEffect, useState, type PropsWithChildren } from 'react';

import { AuthContext, type AuthStatus } from '@/features/auth/context/auth-context';
import { authApi } from '@/features/auth/api';
import type { User } from '@/features/auth/types';
import { clearAccessToken, setAccessToken } from '@/shared/api/token';
import { queryClient } from '@/shared/api/query-client';
import { restoreSession } from '@/shared/api/client';
import { router } from '@/app/router';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      const restored = await restoreSession();

      if (!restored) {
        if (isMounted) {
          setUser(null);
          setStatus('guest');
        }

        return;
      }
      if (!isMounted) {
        return;
      }

      try {
        const currentUser = await authApi.me();

        if (isMounted) {
          setUser(currentUser);
          setStatus('authenticated');
        }
      } catch {
        clearAccessToken();

        if (isMounted) {
          setUser(null);
          setStatus('guest');
        }
      }
    }

    void initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    function handleSessionExpired() {
      clearAccessToken();
      setUser(null);
      setStatus('guest');
      queryClient.clear();

      void router.navigate('/login?reason=expired');
    }

    window.addEventListener('auth:session-expired', handleSessionExpired);

    return () => {
      window.removeEventListener('auth:session-expired', handleSessionExpired);
    };
  }, []);

  async function login(email: string, password: string) {
    const response = await authApi.login({ email, password });

    setAccessToken(response.accessToken);
    setUser(response.user);
    setStatus('authenticated');
  }

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      clearAccessToken();
      setUser(null);
      setStatus('guest');
      queryClient.clear();

      await router.navigate('/login');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
