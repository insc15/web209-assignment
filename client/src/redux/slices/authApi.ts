import ApiResponse from '@/interfaces/ApiResponse';
import IUser from '@/interfaces/IUser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), 
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body:{email:string;password:string}) => ({
        url: '/signin',
        method: 'POST',
        body
      }),
    }),
  }),
});
export const {useLoginUserMutation}= authApi;
