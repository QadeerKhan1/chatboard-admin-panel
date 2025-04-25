import fetchAccessToken from "@/utils/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EndPoints } from "@/lib/end-points";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const userManagementApi = createApi({
  reducerPath: "userManagementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    jsonContentType: "application/json",
    prepareHeaders: async (headers) => {
      const token = await fetchAccessToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    // GET: Fetch user by ID or profile
    getUserManagementList: builder.query({
      query: () => ({
        url: EndPoints.USER_MANAGEMENT, // Example: "/user/profile"
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // PUT: Update user profile or info
    updateSingleUser: builder.mutation({
      query: (updatedData) => ({
        url: EndPoints.UPDATE_USER_MANAGEMENT, // Example: "/user/update"
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserManagementListQuery, useUpdateSingleUserMutation } =
  userManagementApi;
