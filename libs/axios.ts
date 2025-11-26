import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const userApi = axios.create({ baseURL: BASE_URL });
export const adminApi = axios.create({ baseURL: BASE_URL });
export const superApi = axios.create({ baseURL: BASE_URL });

// attach tokens after reload
export function attachTokens() {
  const user = localStorage.getItem("user_token");
  const admin = localStorage.getItem("admin_token");
  const superAdmin = localStorage.getItem("super_token");

  if (user) userApi.defaults.headers.common.Authorization = `Bearer ${user}`;
  if (admin) adminApi.defaults.headers.common.Authorization = `Bearer ${admin}`;
  if (superAdmin)
    superApi.defaults.headers.common.Authorization = `Bearer ${superAdmin}`;
}

// super admin interceptor
superApi.interceptors.request.use((config) => {
  console.log("SENDING TOKEN:", config.headers.Authorization);
  const token = localStorage.getItem("super_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// admin interceptor
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// user interceptor
userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("user_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
