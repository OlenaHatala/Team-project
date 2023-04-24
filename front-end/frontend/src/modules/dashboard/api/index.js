import { apiSlice } from "../../../app/api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOwnerBoard: builder.query({
      query: (boardId) => `/board/getOwnerBoard/${boardId}`,
      keepUnusedDataFor: 120,
      providesTags: ['dashboard']
    }),

    approveRequest: builder.mutation({
      query: (payload) => ({
        url: "/board/addMember",
        method: "PATCH",
        body: {
          board_id: payload.board_id,
          user_id: payload.user_id,
          is_approved: "true",
        },
      }),
      invalidatesTags: ['dashboard'],
    }),

    denyRequest: builder.mutation({
      query: (payload) => ({
        url: "/board/addMember",
        method: "PATCH",
        body: {
          board_id: payload.board_id,
          user_id: payload.user_id,
          is_approved: "false",
        },
      }),
      invalidatesTags: ['dashboard'],
    }),
  }),
});

export const {
  useGetOwnerBoardQuery,
  useApproveRequestMutation,
  useDenyRequestMutation,
} = dashboardApiSlice;
