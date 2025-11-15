import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});
// interceptor لتعامل موحّد مع الأخطاء
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);
export default api;
