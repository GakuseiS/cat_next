import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { isServerEnv } from '@/constants';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/cat',
  }),

  tagTypes: ['BASKET', 'ORDERS'],
  endpoints: () => ({}),
});

export const baseApi = async <T>({
  url,
  data,
  token,
  searchParams,
  headers = { ...DEFAULT_HEADERS },
  method = 'GET',
  ...restOptions
}: TApiOptions): Promise<T> => {
  let fullUrl = isServerEnv ? `${API_BASE_URL}/api/${url}` : `/api/cat${url}`;
  if (searchParams) fullUrl += `?${searchParams}`;
  if (isServerEnv && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(fullUrl, {
    method,
    headers,
    credentials: 'same-origin',
    body: JSON.stringify(data),
    ...restOptions,
  });

  if (!res.ok) {
    let body;
    try {
      body = await res.json();
    } catch (err) {
      body = res.statusText;
    }
    throw Error(JSON.stringify({ statusCode: res.status, body }));
  }
  return res.json();
};
