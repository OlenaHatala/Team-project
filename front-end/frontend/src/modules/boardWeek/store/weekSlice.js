import { createSlice } from "@reduxjs/toolkit";
import { findTimeBorders } from "../utils/time";
import { WeekDayByIndex } from "../utils/weekDay";
import { skeletonTickets } from "../utils/skeletonTickets";

const initialState = {
  isLoading: true,
  mode: "",
  weekIndex: 0,
  tickets: skeletonTickets,
  dates: {},
  timeBorders: {
    timePoints: {
      upper: "August 19, 1975 10:00:00",
      bottom: "August 19, 1975 19:00:00",
    },
    minutePercentage: 0.138,
  },
  modals: {
    showNewTicket: false,
    showEditTicket: false,
    editedTicket: null,
  },
};

export const weekSlice = createSlice({
  name: "week",
  initialState,
  reducers: {
    ticketAdded: {
      reducer(state, action) {
        if (
          action.payload.ticket.date.getHours() <
          state.timeBorders.timePoints.upper.getHours()
        ) {
          state.timeBorders.timePoints.upper.setHours(
            action.payload.ticket.date.getHours()
          );
        }
        if (
          action.payload.ticket.date.getHours() +
            action.payload.ticket.duration / 60 >
          state.timeBorders.timePoints.bottom.getHours()
        ) {
          state.timeBorders.timePoints.bottom.setHours(
            Math.ceil(
              action.payload.ticket.date.getHours() +
                action.payload.ticket.duration / 60
            )
          );
        }

        state.tickets[0][action.payload.weekday].push(action.payload.ticket);
      },
      prepare(weekday, time, duration, available, id) {
        return {
          payload: {
            ticket: {
              id: id,
              type: "ticket",
              date: new Date(`July 4 1776 ${time}`),
              duration,
            },
            weekday,
            available,
          },
        };
      },
    },

    ticketUpdated(state, action) {
      let ticket = { ...action.payload };
      const dateObj = new Date(ticket.datetime);
      ticket.datetime = dateObj;
      const upper = new Date(state.timeBorders.timePoints.upper);
      const bottom = new Date(state.timeBorders.timePoints.bottom);
      if (ticket.datetime.getHours() < upper.getHours()) {
        upper.setHours(ticket.datetime.getHours());
      }
      if (
        ticket.datetime.getHours() + ticket.duration / 60 >
        bottom.getHours()
      ) {
        bottom.setHours(
          Math.ceil(ticket.datetime.getHours() + ticket.duration / 60)
        );
      }

      let dayarray = state.tickets[WeekDayByIndex[ticket.datetime.getDay()]];
      const index = state.tickets[
        WeekDayByIndex[ticket.datetime.getDay()]
      ].findIndex((oldTicket) => {
        return oldTicket._id === ticket._id;
      });
      //console.log(dayarray);
      //console.log(index)
      //console.log(state.tickets[WeekDayByIndex[ticket.datetime.getDay()]][index])
      //console.log(ticket)
      state.tickets[WeekDayByIndex[ticket.datetime.getDay()]][index] = ticket;
      //console.log(state.tickets[WeekDayByIndex[ticket.datetime.getDay()]][index])
    },

    weekFetched(state, action) {
      state.dates = action.payload.dates;
      state.tickets = action.payload.tickets;
      state.timeBorders.timePoints = findTimeBorders(action.payload.tickets);
      let upperDate = new Date(state.timeBorders.timePoints.upper);
      let bottomDate = new Date(state.timeBorders.timePoints.bottom);
      state.timeBorders.minutePercentage =
        100 / ((bottomDate.getTime() - upperDate.getTime()) / 60000);
    },

    toggleShowNewTicketAction(state, action) {
      if (state.modals.showEditTicket === true && action.payload === true) {
        state.modals.showEditTicket = false;
      }
      state.modals.showNewTicket = action.payload;
    },

    showEditTicketAction(state, action) {
      if (state.modals.showNewTicket === true) {
        state.modals.showNewTicket = false;
      }
      state.modals.showEditTicket = true;
      state.modals.editedTicket = action.payload;
    },

    hideEditTicketAction(state, action) {
      state.modals.showEditTicket = false;
      state.modals.editedTicket = null;
    },

    setModeAction(state, action) {
      state.mode = action.payload;
    },

    setLoadingAction(state, action) {
      state.isLoading = action.payload;
    },

    setWeekIndexAction(state, action) {
      state.weekIndex = action.payload;
    },
  },
});

export const selectWeek = (state) => state.week;
export const selectDates = (state) => state.week.dates;
export const selectWeekIndex = (state) => state.week.weekIndex;
export const selectIsLoading = (state) => state.week.isLoading;
export const selectWeekMode = (state) => state.week.mode;
export const selectModalsState = (state) => state.week.modals;
export const selectTimeBorders = (state) => state.week.timeBorders;

export const {
  ticketAdded,
  ticketUpdated,
  weekFetched,
  toggleShowNewTicketAction,
  showEditTicketAction,
  hideEditTicketAction,
  setModeAction,
  setLoadingAction,
  setWeekIndexAction,
} = weekSlice.actions;

export default weekSlice.reducer;
