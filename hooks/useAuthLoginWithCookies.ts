"use client";

import { useState } from "react";
import axios, { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/Components/Toast/useToast";
import { setCookie } from "cookies-next";
export interface AuthLoginCookieOptions<TResponse> {
  apiInstance?: AxiosInstance;
  endpoint: string;
  extractToken: (response: TResponse) => string;
  extractName: (response: TResponse) => string;
  tokenCookieKey: string;
  nameCookieKey: string;
  redirectTo?: string;
  setAuthHeader?: (token: string) => void;
}

export function useAuthLoginWithCookies<TResponse>(
  options: AuthLoginCookieOptions<TResponse>
) {
  const {
    apiInstance = axios,
    endpoint,
    extractToken,
    extractName,
    tokenCookieKey,
    nameCookieKey,
    redirectTo,
    setAuthHeader,
  } = options;

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const login = async (data: any) => {
    setLoading(true);

    try {
      const res = await apiInstance.post<TResponse>(endpoint, data, {
        withCredentials: true,
      });

      const token = extractToken(res.data);
      const userName = extractName(res.data);

      // تخزين التوكين
      setCookie(tokenCookieKey, token, {
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // أسبوع
      });

      // تخزين الاسم
      setCookie(nameCookieKey, userName, {
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });

      // ضبط الهيدر إذا لزم
      if (setAuthHeader) {
        setAuthHeader(token);
      } else {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      showToast({
        title: "تم تسجيل الدخول",
        description: `أهلا ${userName}`,
        type: "success",
      });

      if (redirectTo) router.push(redirectTo);
    } catch (err: any) {
      showToast({
        title: "صار خطأ",
        description: err.response?.data?.message || "خطأ في تسجيل الدخول",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
