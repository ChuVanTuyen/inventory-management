import { NewProduct, Product } from '../types/global.type';
import { baseApi } from './baseApi';

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string | void>({
      query: (search) => ({
        url: '/products',
        params: search ? { search } : {}
      }),
      providesTags: ['Products']
    }),
    createProduct: builder.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: '/products/create',
        method: 'POST',
        body: newProduct
      }),
      invalidatesTags: ['Products']
    })
  })
});

export const { useGetProductsQuery, useCreateProductMutation } = productApi;
