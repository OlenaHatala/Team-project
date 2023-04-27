import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../../modules/auth/store";
import weekReducer from "../../modules/boardWeek/store/weekSlice";
import dashboardReduces from "../../modules/dashboard/store";
import notificationReducer from '../../modules/notifications/store/notificationsSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    week: weekReducer,
    dashboard: dashboardReduces,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
