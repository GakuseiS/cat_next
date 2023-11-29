import { LoginParams } from './login.types';
import { baseApi } from '../baseApi';

export const postLogin = async (params: LoginParams) => {
  const res = await baseApi({ url: '/api/users/login', method: 'POST', data: params });
  return { body: await res.json(), status: res.status };
};
