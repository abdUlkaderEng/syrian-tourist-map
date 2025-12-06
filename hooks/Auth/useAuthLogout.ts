"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios, { AxiosInstance } from "axios";
import { useToast } from "@/Components/Toast/useToast";
import { useTranslations } from "next-intl";
import { useAuthSignal } from "./authSignal";
import { useAuthStore } from "./authStore";

export interface AuthLogoutOptions {
  apiInstance?: AxiosInstance;
  redirectTo?: string;
}

export function useAuthLogout(options?: AuthLogoutOptions) {
  const { apiInstance = axios, redirectTo = "/" } = options || {};

  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const { refresh } = useAuthSignal();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const logout = async () => {
    try {
      setLoading(true);
      clearAuth();
      refresh();
      showToast({
        title: t("successMessages.logoutSuccessfuly"),
        type: "success",
      });

      // Redirect to home or specified page
      router.push(redirectTo);
    } catch (err) {
      console.error("Logout error:", err);
      showToast({
        title: t("errorMessages.logoutFailed"),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}
