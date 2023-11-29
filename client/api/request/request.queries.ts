import { RequestParams } from "./request.types";
import { api } from "../baseApi";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postProgramm: builder.mutation<{ message: string }, RequestParams>({
      query: (data) => ({ url: "api/form", body: data, method: "POST" }),
    }),
  }),
});

export const { usePostProgrammMutation } = extendedApi;
