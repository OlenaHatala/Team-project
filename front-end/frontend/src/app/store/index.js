import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../../modules/auth/store";
import weekReducer from "../../modules/boardWeek/store/weekSlice";
import dashboardReduces from "../../modules/dashboard/store";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    week: weekReducer,
    dashboard: dashboardReduces,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
