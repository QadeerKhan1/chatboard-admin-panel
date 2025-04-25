import fetchAccessToken from "@/utils/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EndPoints } from "@/lib/end-points";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const userSettingApi = createApi({
  reducerPath: "userSetting",
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
  tagTypes: ["UserSetting"],
  keepUnusedDataFor: 600,
  endpoints: (builder) => ({
    // GET: Fetch user by ID or profile
    getUserInfo: builder.query({
      query: ({ page = 1, limit = 9 }) => ({
        url: `${EndPoints.USER}?page=${page}&limit=${limit}`, // Example: "/user/profile"
        method: "GET",
      }),
      providesTags: ["UserSetting"],
    }),

    // PUT: Update user profile or info
    updateUserInfo: builder.mutation({
      query: ({
        id,
        updatedInfo,
      }: {
        id: string;
        updatedInfo: {
          name: string;
          email: string;
          phone: string;
        };
      }) => ({
        url: `${EndPoints.USER}/${id}`,
        method: "PATCH",
        body: updatedInfo,
      }),
      invalidatesTags: ["UserSetting"],
    }),
    createAdmin: builder.mutation({
      query: (body) => ({
        url: EndPoints.SIGNUP,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserSetting"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserSetting"],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useDeleteUserMutation,
} = userSettingApi;
