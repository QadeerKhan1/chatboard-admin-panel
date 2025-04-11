import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import fetchAccessToken from "@/utils/cookies";

// Create an Axios instance with default configuration
export const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const setOrDeleteAuthorizationToken = (
    token: string,
    deleteToken: boolean = false
) => {
    if (token && !deleteToken) {
        AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete AxiosInstance.defaults.headers.common["Authorization"];
    }
};

// Add request interceptor
AxiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Modify request config before sending
        const token = await fetchAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Uncomment and refine the response interceptor as needed
// AxiosInstance.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     // Handle response errors globally
//     return Promise.reject(error);
//   }
// );
