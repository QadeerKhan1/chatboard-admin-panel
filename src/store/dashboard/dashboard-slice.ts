import fetchAccessToken from "@/utils/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EndPoints } from "@/lib/end-points";

export interface DashboardStats {
  totalQueries: number;
  activeUsers: number;
  successRate: number;
  systemHealth: string;
  uptimePercentage: number;
  averageResponseTime: number;
  lastDownTime: string;
  userEngagement: {
    newUsers: number;
    oldUsers: number;
  };
  errorLogsList: Array<{
    _id: string;
    errorType: string;
    severity: string;
    message: string;
    timestamp: string;
    __v: number;
  }>;
  chatLogs: Array<{
    _id: string;
    user: string;
    request: string;
    response: string;
    correctAnswer: boolean;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>;
}

interface ActivityItem {
  id: string;
  action: string;
  user: string;
  timestamp: string;
}

interface DashboardResponse {
  status: boolean;
  message: string;
  data: DashboardStats;
}

interface ActivityResponse {
  status: boolean;
  message: string;
  data: ActivityItem[];
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = await fetchAccessToken();
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    // GET: Dashboard Summary
    getDashboardStats: builder.query<DashboardResponse, void>({
      query: () => ({
        url: EndPoints.DASHBOARD_DATA,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    // GET: Recent Activity with year param
    getRecentActivity: builder.query<ActivityResponse, { year: number }>({
      query: ({ year }) => ({
        url: `${EndPoints.DASHBOARD_QUERY_GRAPH}?year=${year}`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetRecentActivityQuery } =
  dashboardApi;
