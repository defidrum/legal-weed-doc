import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'v1' }),
  endpoints: (builder) => ({
    getDataFromEndpoint1: builder.query({
      query: () => '/url-endpoint1',
    }),
  })
});


export const {useGetDataFromEndpoint1Query} = apiSlice
