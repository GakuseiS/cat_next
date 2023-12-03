import { LoginData, LoginParams, RegisterParams } from './login.types';
import { api } from '../baseApi';

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation<LoginData, LoginParams>({
      query: (body) => ({ url: 'users/login', body, method: 'POST' }),
    }),
    postRegister: builder.mutation<{ message: string }, RegisterParams>({
      query: (body) => ({ url: 'users/register', body, method: 'POST' }),
    }),
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation } = extendedApi;
