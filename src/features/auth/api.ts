import { axiosInstance } from '@/shared/api/client';
import { apiGet, apiPost } from '@/shared/api/api-helpers';

import type { AuthResponse, LoginPayload, RegisterPayload, User } from './types';

export const authApi = {
  register(payload: RegisterPayload): Promise<AuthResponse> {
    return apiPost<AuthResponse, RegisterPayload>('/auth/register', payload);
  },

  login(payload: LoginPayload): Promise<AuthResponse> {
    return apiPost<AuthResponse, LoginPayload>('/auth/login', payload);
  },

  refresh(): Promise<AuthResponse> {
    return apiPost<AuthResponse>('/auth/refresh');
  },

  logout(): Promise<void> {
    return axiosInstance.post('/auth/logout').then(() => undefined);
  },

  me(): Promise<User> {
    return apiGet<User>('/auth/me');
  },
};
