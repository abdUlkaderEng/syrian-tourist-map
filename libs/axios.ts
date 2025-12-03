import axios from "axios";
import { getCookie } from "cookies-next";

const BASE_URL = "http://127.0.0.1:8000/api";

// Default API instance with credentials
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

export const adminApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Sends admin_token cookie automatically
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const superApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Sends super_token cookie automatically
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

superApi.interceptors.request.use((config) => {
  const token = getCookie("super_token"); 
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;

// import axios, { AxiosRequestConfig } from "axios";
// import { getCookie } from "cookies-next";

// const BASE_URL = "http://127.0.0.1:8000/api";

// type TokenType = "user" | "admin" | "super";

// function getToken(type: TokenType) {
//   switch (type) {
//     case "user":
//       return getCookie("user_token");
//     case "admin":
//       return getCookie("admin_token");
//     case "super":
//       return getCookie("super_token");
//   }
// }

// export function createApi(type: TokenType) {
//   const instance = axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
//     headers: { "Content-Type": "application/json", Accept: "application/json" },
//   });

//   instance.interceptors.request.use((config: AxiosRequestConfig) => {
//     const token = getToken(type);
//     if (!token) {
//       throw new Error("Token missing, please login.");
//     }

//     // نضبط headers للتوافق مع نوع AxiosRequestHeaders
//     config.headers = {
//       ...(config.headers as any),
//       Authorization: `Bearer ${token}`,
//     };

//     return config as any; // type assertion لتجاوز مشكلة النوع
//   });

//   return instance;
// }

// // instances جاهزة
// export const userApi = createApi("user");
// export const adminApi = createApi("admin");
// export const superApi = createApi("super");
// export default createApi;
