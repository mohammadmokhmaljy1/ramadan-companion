import type { AxiosRequestConfig } from 'axios';

import { axiosInstance } from '@/shared/api/client';
import type { ApiEnvelope, PageMeta } from '@/shared/types/api';

export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axiosInstance.get<ApiEnvelope<T>>(url, config);
  return response.data.data as T;
}

export async function apiPost<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axiosInstance.post<ApiEnvelope<T>>(url, body, config);
  return response.data.data as T;
}

export async function apiPut<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axiosInstance.put<ApiEnvelope<T>>(url, body, config);
  return response.data.data as T;
}

export async function apiPatch<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axiosInstance.patch<ApiEnvelope<T>>(url, body, config);
  return response.data.data as T;
}

export async function apiDelete(
  url: string,
  config?: AxiosRequestConfig,
): Promise<void> {
  await axiosInstance.delete(url, config);
}

export async function apiGetPage<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<{ data: T; meta: PageMeta }> {
  const response = await axiosInstance.get<ApiEnvelope<T>>(url, config);

  if (!response.data.meta) {
    throw new Error('Pagination metadata is missing from the API response');
  }

  return {
    data: response.data.data as T,
    meta: response.data.meta,
  };
}
