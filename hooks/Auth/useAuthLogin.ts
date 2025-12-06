"use client";

import { useState } from "react";
import axios, { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/Components/Toast/useToast";
import { useTranslations } from "next-intl";
import { useAuthSignal } from "./authSignal";
import { useAuthStore } from "./authStore";
import { setCookie } from "cookies-next";

export interface AuthLoginOptions<TResponse> {
  apiInstance?: AxiosInstance;
  endpoint: string;
  extractToken: (response: TResponse) => string;
  extractName: (response: TResponse) => string;
  extractId: (response: TResponse) => number;
  role: "user" | "admin" | "superadmin";
  redirectTo: string;
}

export function useAuthLogin<TResponse>(options: AuthLoginOptions<TResponse>) {
  const {
    apiInstance = axios,
    endpoint,
    extractToken,
    extractName,
    extractId,
    role,
    redirectTo,
  } = options;

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const t = useTranslations();
  const { refresh } = useAuthSignal();
  const { setAuth } = useAuthStore();

  const login = async (data: any) => {
    setLoading(true);

    try {
      const res = await apiInstance.post<TResponse>(endpoint, data, {
        withCredentials: true,
      });

      const token = extractToken(res.data);
      const userName = extractName(res.data);
      const id = extractId(res.data);

      setAuth(token, userName, role, id);

      router.push(redirectTo);

      showToast({
        title: t("successMessages.loginSuccessfuly"),
        description: `${t("successMessages.hello")} ${userName}!!`,
        type: "success",
      });
      refresh();
    } catch (err: any) {
      showToast({
        title: t("errorMessages.loginFailed"),
        description:
          err.response?.data?.message || t("errorMessages.somethingWentWrong"),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
