import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { getAuthToken } from '@/global/lib/auth/getAuthToken';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await getAuthToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['BASKET', 'ORDERS'],
  endpoints: () => ({}),
});

type TApiOptions = {
  url: string;
  data?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
  token?: string;
};

export const baseApi = async ({ url, data, cache, next, token, method = 'GET' }: TApiOptions) => {
  const res: Response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers: new Headers(
      Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: `Bearer ${token}` } : null),
    ),
    credentials: 'same-origin',
    body: JSON.stringify(data),
    cache,
    next,
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res;
};
