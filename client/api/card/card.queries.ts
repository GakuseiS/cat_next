import { CardData } from "./card.types";
import { api } from "../baseApi";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBasket: builder.query<CardData, void>({ query: () => "api/card", providesTags: ["BASKET"] }),
    deleteBasket: builder.mutation<{ message: string }, void>({
      query: () => ({ url: "/api/card", method: "delete" }),
      invalidatesTags: ["BASKET"],
    }),
    deleteBasketItem: builder.mutation<{ message: string }, { id: string }>({
      query: (data) => ({ url: `/api/card/${data.id}`, method: "delete" }),
      invalidatesTags: ["BASKET"],
    }),
  }),
});

export const { useGetBasketQuery, useDeleteBasketMutation, useDeleteBasketItemMutation } = extendedApi;
