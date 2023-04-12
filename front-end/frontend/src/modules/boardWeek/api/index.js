import { apiSlice } from "../../../app/api/apiSlice";

export const weekApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWeek: builder.query({
      query: (cfg) => `/board/readOneWeek/${cfg.boardId}/${cfg.weekIndex}`,
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        return responseData.tickets;
      },
    }),
    configureTicket: builder.mutation({
      query: (ticket) => ({
        url: "/ticket/update",
        method: "PATCH",
        body: { ticketData: { enabled: ticket.available }, id: ticket._id },
      }),
    }),
  }),
});

export const { useGetWeekQuery, useConfigureTicketMutation } = weekApiSlice;
