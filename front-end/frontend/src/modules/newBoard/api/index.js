import { apiSlice } from "../../../app/api/apiSlice";

export const boardFormApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (boardData) => ({
        url: "/board/create",
        method: "POST",
        body: { ...boardData },
      }),
    }),
    update: builder.mutation({
      query: (newBoardData) => ({
        url: "/board/update",
        method: "PATCH",
        body: { ...newBoardData },
      }),
    }),
  }),
});

export const { useCreateMutation, useUpdateMutation } = boardFormApiSlice;
