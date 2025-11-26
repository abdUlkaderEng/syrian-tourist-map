"use client";

import { useState } from "react";
import axios, { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/Components/Toast/useToast";

export interface AuthLoginOptions<TResponse> {
  apiInstance?: AxiosInstance;         
  endpoint: string;                     
  extractToken: (response: TResponse) => string; 
  tokenStorageKey: string;              
  redirectTo?: string;                  
  setAuthHeader?: (token: string) => void; 
}

export function useAuthLogin<TResponse>(options: AuthLoginOptions<TResponse>) {
  const {
    apiInstance = axios,
    endpoint,
    extractToken,
    tokenStorageKey,
    redirectTo,
    setAuthHeader
  } = options;

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const login = async (data: any) => {
    setLoading(true);

    try {
      const res = await apiInstance.post<TResponse>(endpoint, data);

      const token = extractToken(res.data);

      localStorage.setItem(tokenStorageKey, token);

      if (setAuthHeader) {
        setAuthHeader(token);
      } else {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      showToast({
        title: "تم تسجيل الدخول",
        type: "success"
      });

      if (redirectTo) router.push(redirectTo);

    } catch (err: any) {
      showToast({
        title: err.response?.data?.message || "خطأ في تسجيل الدخول",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
