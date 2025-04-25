import fetchAccessToken from "@/utils/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EndPoints } from "@/lib/end-points"; // Should contain CREATE_ADMIN and GET_ADMIN_LIST

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  // Add more fields if needed
}

interface GetAdminListResponse {
  message: string;
  status: boolean;
  data: {
    total: number;
    totalPages: number;
    currentPage: number;
    data: Admin[];
  };
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = await fetchAccessToken();
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    getAdminList: builder.query<
      GetAdminListResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => ({
        url: `${EndPoints.SIGNUP}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const { useGetAdminListQuery } = adminApi;
