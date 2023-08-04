import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { getSession } from "next-auth/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["BASKET", "ORDERS"],
  endpoints: () => ({}),
});
