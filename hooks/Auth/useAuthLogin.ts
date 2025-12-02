"use client";

import { useState } from "react";
import axios, { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/Components/Toast/useToast";
import { setUserNameCookie, setTokenCookie } from "@/hooks/useUserName";
import { useTranslations } from "next-intl";

export interface AuthLoginOptions<TResponse> {
  apiInstance?: AxiosInstance;
  endpoint: string;
  extractToken: (response: TResponse) => string;
  extractName: (response: TResponse) => string;
  tokenCookieName?: string;
  redirectTo?: string;
}

export function useAuthLogin<TResponse>(options: AuthLoginOptions<TResponse>) {
  const {
    apiInstance = axios,
    endpoint,
    extractToken,
    extractName,
    tokenCookieName = "user_token",
    redirectTo,
  } = options;

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const t = useTranslations();
  const login = async (data: any) => {
    setLoading(true);

    try {
      const res = await apiInstance.post<TResponse>(endpoint, data, {
        withCredentials: true,
      });

      // Extract and store token from response
      const token = extractToken(res.data);
      setTokenCookie(token, tokenCookieName);

      // Extract and store username
      const userName = extractName(res.data);
      setUserNameCookie(userName);

      showToast({
        title: t('successMessages.loginSuccessfuly'),
        description: `${t("successMessages.hello")} ${userName}!!`,
        type: "success",
      });

      if (redirectTo) router.push(redirectTo);
    } catch (err: any) {
      showToast({
        title: t('errorMessages.loginFailed'),
        description: err.response?.data?.message || t('errorMessages.somethingWentWrong') ,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
