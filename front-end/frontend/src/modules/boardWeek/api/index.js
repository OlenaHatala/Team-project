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
        body: {
          ticketData: {
            enabled: ticket.availablePayload,
            //duration: ticket.duration,
            //datetime: ticket.datetime,
          },
          id: ticket._id,
        },
      }),
      invalidatesTags: (arg) => [{ type: "week", id: arg.weekIndex }],
    }),

    approveTicket: builder.mutation({
      query: (ticket) => ({
        url: "/ticket/confirmTicket",
        method: "POST",
        body: { ticket_id: ticket._id, is_approved: "true" },
      }),
      invalidatesTags: (arg) => [{ type: "week", id: arg.weekIndex }],
    }),

    denyTicket: builder.mutation({
      query: (ticket) => ({
        url: "/ticket/confirmTicket",
        method: "POST",
        body: { ticket_id: ticket._id, is_approved: "false" },
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

    deleteTicket: builder.mutation({
      query: (ticket) => ({
        url: "/ticket/deleteTicket",
        method: "DELETE",
        body: {
          id: ticket._id,
        },
      }),
      invalidatesTags: (arg) => [{ type: "week", id: arg.weekIndex }],
    }),

  }),
});

export const {
  useGetWeekQuery,
  useConfigureTicketMutation,
  useTakeTicketMutation,
  useApproveTicketMutation,
  useDenyTicketMutation,
  useDeleteTicketMutation,
} = weekApiSlice;
