import { apiSlice } from "../../../app/api/apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/user/update",
        method: "PATCH",
        body: { ...userData },
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
} = accountApiSlice;