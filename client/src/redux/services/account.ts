import IUser from '@/interfaces/IUser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath:"account",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }), 
  tagTypes:["user"],
  endpoints: (builder) => ({
    fetchUser: builder.query<IUser[],void>({
      query: () => '/account',
      providesTags:["user"]
    }),
    removeUser: builder.mutation({
      query: (_id:string) =>({
        url:"/account/"+_id,
        method: "DELETE"
      }),
      invalidatesTags:["user"]
    }),
    addUser: builder.mutation({
      query: (user:IUser) =>({
        url:"/account",
        method: "POST",
        body:user
      }),
      invalidatesTags:["user"]
    })
  }),
});

export const { useFetchUserQuery,useRemoveUserMutation,useAddUserMutation } = userApi;
export default userApi
