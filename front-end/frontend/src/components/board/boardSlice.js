import { createSlice, nanoid } from "@reduxjs/toolkit";

import {
  defaultOwnerId,
  defaultDetails,
  defaulSettings,
  defaultMarkup,
  defaultTickets,
  defaultBordId,
  defaultTimeBorders,
  defaultMinutePercentage,
} from "../../context/BoardContext";

const initialState = {
  boardId: defaultBordId,
  ownerId: defaultOwnerId,
  details: defaultDetails,
  settings: defaulSettings,
  markup: defaultMarkup,
  tickets: defaultTickets,
  timeBorders: defaultTimeBorders,
  minutePercentage: defaultMinutePercentage,
  isConfiguring: false
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    ticketAdded: {
      reducer(state, action) {
        if (
          action.payload.ticket.date.getHours() <
          state.timeBorders.upper.getHours()
        ) {
          state.timeBorders.upper.setHours(
            action.payload.ticket.date.getHours()
          );
        }
        if (
          (
            action.payload.ticket.date.getHours() +
              action.payload.ticket.duration / 60
          ) > state.timeBorders.bottom.getHours()
        ) {
          state.timeBorders.bottom.setHours(
            Math.ceil(
              action.payload.ticket.date.getHours() +
                action.payload.ticket.duration / 60
            )
          );
        }

        state.tickets[0][action.payload.weekday].push(action.payload.ticket);
      },
      prepare(weekday, time, duration, available) {
        return {
          payload: {
            ticket: {
              id: nanoid(),
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

    configuringStarted(state, action) {
      state.isConfiguring = true;
    },

    configuringEnded(state, action) {
      state.isConfiguring = false;
    },

    boardFetched(state, action) {
      state.boardId = action.payload.boardId;
      state.ownerId = action.payload.ownerId;
      state.details = action.payload.details;
      state.settings = action.payload.settings;
      state.markup = action.payload.markup;
      //todo: add resTickets to reducer
    }
  },
});

export const selectBoard = (state) => state.board;

export const { ticketAdded, configuringStarted, configuringEnded, boardFetched} = boardSlice.actions;

export default boardSlice.reducer;
