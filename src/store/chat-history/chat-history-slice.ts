import fetchAccessToken from "@/utils/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EndPoints } from "@/lib/end-points"; // Your backend endpoints

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
interface UserChat {
  _id: string;
  lastRequest: string;
  lastResponse: string;
  // Add other fields as needed
}

interface ChatUserListResponse {
  message: string;
  status: boolean;
  data: {
    total: number;
    totalPages: number;
    currentPage: number;
    data: UserChat[];
  };
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = await fetchAccessToken();
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    getChatUserList: builder.query<
      ChatUserListResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => ({
        url: `${EndPoints.CHAT_USER_LIST}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),

    getChatMessages: builder.query({
      query: ({ conversationId, page = 1, limit = 20 }) => ({
        url: `${EndPoints.CHAT_MESSAGE}?page=${page}&limit=${limit}&user=${conversationId}`,
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
  }),
});

export const { useGetChatMessagesQuery, useGetChatUserListQuery } = chatApi;
