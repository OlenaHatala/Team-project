import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  messageType: "",
  open: false
};

export const sliceNotification = createSlice({
  initialState,
  name: "notification",
  reducers: {
    clearNotificationAction(state, action) {
      state.message = "";
      state.messageType = state.messageType;
      state.open = false;
    },
    setNotificationAction(state, action) {
      state.message = action.payload.message;
      state.messageType = action.payload.messageType;
      state.open = true;
    },
  },
});

export const selectNotification = (state) => state.notification;

export const { clearNotificationAction, setNotificationAction } =
  sliceNotification.actions;

export default sliceNotification.reducer;
