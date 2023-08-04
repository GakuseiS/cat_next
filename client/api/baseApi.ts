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

type TApi = {
  url: string;
  data?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
  token?: string;
};

export const baseApi = async ({ url, method = "GET", data, cache, next, token }: TApi) => {
  const res: Response = await fetch(`http://localhost:3001${url}`, {
    method,
    headers: new Headers(
      Object.assign({ "Content-Type": "application/json" }, token ? { Authorization: `Bearer ${token}` } : null)
    ),
    credentials: "same-origin",
    body: JSON.stringify(data),
    cache,
    next,
  });

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res;
};
