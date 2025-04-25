// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { userManagementApi } from "./user-management/user-management-slice";
import { adminApi } from "./create-admin/create-admin";
import { dashboardApi } from "./dashboard/dashboard-slice";
import { chatApi } from "./chat-history/chat-history-slice";
import { userSettingApi } from "./user-setting/user-setting";

export const store = configureStore({
  reducer: {
    [userManagementApi.reducerPath]: userManagementApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [userSettingApi.reducerPath]: userSettingApi.reducer,
    // ...other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userManagementApi.middleware,
      chatApi.middleware,
      dashboardApi.middleware,
      adminApi.middleware,
      userSettingApi.middleware
    ),
});

// Type definitions for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
