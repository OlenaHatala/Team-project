import { apiSlice } from "../../../app/api/apiSlice";

export const weekApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWeek: builder.query({
      query: (cfg) => `/board/readOneWeek/${cfg.boardId}/${cfg.weekIndex}`,
      keepUnusedDataFor: 60,
      providesTags: (arg) => [{ type: "week", id: arg.weekIndex }],
      transformResponse: (responseData) => {
        console.log({
          tickets: responseData.tickets,
          dates: responseData?.dates || {},
        });
        return {
          tickets: responseData.tickets,
          dates: responseData?.dates || {},
        };
      },
    }),
    
    configureTicket: builder.mutation({
      query: (ticket) => ({
        url: "/ticket/update",
        method: "PATCH",
        body: { ticketData: { enabled: ticket.available }, id: ticket._id },
      }),
      invalidatesTags: (arg) => [{ type: "week", id: arg.weekIndex }],
    }),

    takeTicket: builder.mutation({
      query: (ticket) => ({
        url: "/ticket/takeTicket",
        method: "POST",
        body: { ticket_id: ticket._id },
      }),
      invalidatesTags: (arg) => [{ type: "week", id: arg.weekIndex }],
    }),
  }),
});

export const {
  useGetWeekQuery,
  useConfigureTicketMutation,
  useTakeTicketMutation,
} = weekApiSlice;
