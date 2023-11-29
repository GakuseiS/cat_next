import { OrderData } from './order.types';
import { api } from '../baseApi';

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrderData, void>({ query: () => 'api/orders', providesTags: ['ORDERS'] }),
    postOrder: builder.mutation<{ message: string }, { id: number }>({
      query: (data) => ({ url: '/api/orders', method: 'post', body: data }),
      invalidatesTags: ['BASKET', 'ORDERS'],
    }),
  }),
});

export const { useGetOrdersQuery, usePostOrderMutation } = extendedApi;
