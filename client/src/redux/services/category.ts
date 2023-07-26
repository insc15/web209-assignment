import ICate from '@/interfaces/category';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const category = createApi({
  reducerPath: 'category',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (builder) => ({
    getCategories: builder.query<ICate[], void>({
        query: () => `/categories`,
    })
  }),
});

export const { useGetCategoriesQuery } = category;