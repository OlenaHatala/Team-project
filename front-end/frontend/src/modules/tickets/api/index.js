import { apiSlice } from "../../../app/api/apiSlice";

const getStartTime = (datetime) => {
    const minutes = datetime.getMinutes();
    const hours = datetime.getHours();
    const minutesStr = minutes > 9 ? `${minutes}` : `0${minutes}`;
    const hoursStr = hours > 9 ? `${hours}` : `0${hours}`;
    return `${hoursStr}:${minutesStr}`;
}

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
        query: () => "/ticket/ticketlist",
        keepUnusedDataFor: 60,
        transformResponse: responseData => {
            let taken_tickets_arr;
            if (!responseData?.taken_tickets_arr){
                taken_tickets_arr = [];
            } else {
                taken_tickets_arr = responseData.taken_tickets_arr.map((ticketData) => {
                    const date = new Date(ticketData.datetime);
                    return {
                        id: ticketData._id,
                        boardName: ticketData.boardlabel,
                        date: date,
                        time: getStartTime(date),
                        status: ticketData.is_confirmed ? "confirmed" : "wait",
                        isOutdated: ticketData.is_outdated,
                        duration: ticketData.duration,
                    };
                })
            }
            return taken_tickets_arr;
        },
      }),
  }),
});

export const { useGetTicketsQuery} = ticketsApiSlice 