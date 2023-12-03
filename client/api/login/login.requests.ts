import { LoginData, LoginParams } from './login.types';
import { baseApi } from '../baseApi';

export const postLogin = async (params: LoginParams) => {
  const loginData = await baseApi<LoginData>({
    url: 'users/login',
    method: 'POST',
    data: params,
  });
  return loginData;
};
