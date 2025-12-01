"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios, { AxiosInstance } from "axios";
import { useToast } from "@/Components/Toast/useToast";
import { clearUserNameCookie, clearTokenCookie } from "@/hooks/useUserName";

export interface AuthLogoutOptions {
  apiInstance?: AxiosInstance;
  redirectTo?: string;
}

export function useAuthLogout(options?: AuthLogoutOptions) {
  const { apiInstance = axios, redirectTo = "/" } = options || {};

  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);

      // Call backend logout endpoint to clear session/tokens
      await apiInstance.post(
        "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // Clear all cookies
      clearTokenCookie("user_token");
      clearTokenCookie("admin_token");
      clearTokenCookie("super_token");
      clearUserNameCookie();

      showToast({
        title: "تم تسجيل الخروج",
        description: "تم خروجك بنجاح",
        type: "success",
      });

      // Redirect to home or specified page
      router.push(redirectTo);
    } catch (err) {
      console.error("Logout error:", err);
      showToast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء محاولة تسجيل الخروج",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}
