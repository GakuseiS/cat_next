import { RequestParams } from './request.types';
import { api } from '../baseApi';

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postProgram: builder.mutation<{ message: string }, RequestParams>({
      query: (data) => ({ url: 'form', body: data, method: 'POST' }),
    }),
  }),
});

export const { usePostProgramMutation } = extendedApi;
