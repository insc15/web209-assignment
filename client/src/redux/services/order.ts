// import ICate from '@/interfaces/category';
import IOrder from '@/interfaces/IOrder';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const order = createApi({
  reducerPath: 'order',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder[], string>({
        query: (userId) => `/order?userId=${userId}`,
    }),
    getOrder: builder.query<IOrder, string>({
        query: (id) => `/order/${id}`,
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderQuery } = order;