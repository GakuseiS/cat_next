import { RequestParams } from './request.types';
import { api } from '../baseApi';

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postProgram: builder.mutation<{ message: string }, RequestParams>({
      query: (data) => ({ url: 'api/form', body: data, method: 'POST' }),
    }),
  }),
});

export const { usePostProgramMutation } = extendedApi;
