import { apiSlice } from "../../../app/api/apiSlice";

export const memberApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoard: builder.query({
      query: (boardId) => `/board/getBoard/${boardId}`,
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        if (responseData?.label) {
          return {
            label: responseData.label,
            description: responseData.description,
            servname: responseData.service_name,
            address: responseData.address,
            tickets: responseData.available_tickets,
          };
        } else {
          return {
            message: responseData.message,
          };
        }
      },
    }),
    join: builder.mutation({
      query: (boardId) => ({
        url: "/board/join",
        method: "POST",
        body: { board_id: boardId },
      }),
      transformResponse: (responseData) => {
        return {
          label: responseData.label,
          description: responseData.description,
          message: responseData.message,
        };
      },
    }),
  }),
});

export const { useGetBoardQuery, useJoinMutation } = memberApiSlice;
