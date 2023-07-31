import IProduct from '@/interfaces/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

export const product = createApi({
  reducerPath: 'product',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], string | void>({
        query: (paramString) => `/products${(paramString ? ('?'+paramString) : '')}`,
        transformResponse: async (response: IProduct[]) => {
          const transformedResponse : IProduct[] = [];
          if(response.length > 0) {
            for (const item of response) {
              const { data: imageBuffer } : { data: Blob } = await axios.get(item.image as string, { responseType: 'blob' });
              transformedResponse.push({
                ...item,
                image: URL.createObjectURL(imageBuffer)
              })
            }
          }
          return transformedResponse;
        }
    }),
    getProduct: builder.query<IProduct, string>({
        query: (id) => `/products/${id}`,
        transformResponse: async (response: IProduct) => {
          const { data: imageBuffer } : { data: Blob } = await axios.get(response.image as string, { responseType: 'blob' });
          return {
            ...response,
            image: URL.createObjectURL(imageBuffer)
          }
        }
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = product;