import { apiSlice } from "../../../app/api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOwnerBoard: builder.query({
      query: (boardId) => `/board/getOwnerBoard/${boardId}`,
      keepUnusedDataFor: 30
    }),
  }),
});

export const { useGetOwnerBoardQuery } = dashboardApiSlice;
