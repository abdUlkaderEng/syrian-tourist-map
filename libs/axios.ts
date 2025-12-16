import { useAuthStore } from "@/hooks/Auth/authStore";
import axios from "axios";

// Default API instance with credentials
const BASE_URL = "http://127.0.0.1:8000/api";
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Automatically sends cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// API instances with credentials enabled (tokens sent via cookies)
export const userApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Sends user_token cookie automatically
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
userApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const adminApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Sends admin_token cookie automatically
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
adminApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const superApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

superApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
