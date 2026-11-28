import { createContext } from 'react';

import type { AuthResponse, User } from '@/features/auth/types';

export type AuthStatus = 'loading' | 'authenticated' | 'guest';

export interface AuthContextValue {
  user: User | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  establishSession: (response: AuthResponse) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
