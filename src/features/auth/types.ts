export type Role = 'USER' | 'ADMIN';

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  preferredLanguage: 'ar' | 'en';
  onboardingCompleted: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  user: User;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  preferredLanguage: 'ar' | 'en';
}

export interface LoginPayload {
  email: string;
  password: string;
}
