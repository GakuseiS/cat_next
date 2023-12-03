import { baseApi } from './baseApi';
import { getAuthToken } from '@/global/lib/auth';

export const serverApi = async <T>(options: TApiOptions): Promise<T> => {
  const token = await getAuthToken();

  return baseApi({ ...options, token });
};
