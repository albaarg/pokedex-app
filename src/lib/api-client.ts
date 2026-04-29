import axios from "axios";
import { parseApiError } from "./errors";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const appError = parseApiError(error);

    return Promise.reject(appError);
  },
);
