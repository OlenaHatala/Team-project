import { apiSlice } from "../../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getUser: builder.query({
      query: () => "/user/read",
      keepUnusedDataFor: 5,
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
} = authApiSlice;
