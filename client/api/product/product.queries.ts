import { ProductData } from './product.types';
import { api } from '../baseApi';

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMainProducts: builder.query<ProductData, void>({ query: () => 'cards' }),
    getSupplements: builder.query<Omit<ProductData, 'img' | 'taste'>, void>({ query: () => 'addons' }),
    postProduct: builder.mutation<{ message: string }, { id: string }>({
      query: (id) => ({ url: 'card', method: 'post', body: id }),
      invalidatesTags: ['BASKET'],
    }),
  }),
});

export const { useGetMainProductsQuery, useGetSupplementsQuery, usePostProductMutation } = extendedApi;
