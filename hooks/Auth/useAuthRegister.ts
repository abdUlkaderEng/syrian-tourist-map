"use client";
import { useToast } from "@/Components/Toast/useToast";
import api, { userApi } from "@/libs/axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useAuthRegister = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const t = useTranslations();

  const authRegister = async (data: RegisterPayload) => {
    setLoading(true);

    try {
      const res = await userApi.post(
        "/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.confirmPassword,
        },
        { withCredentials: true }
      );
      console.log(res.data.data);

      showToast({
        title: t('successMessages.registerSuccessfuly'),
        description: t('successMessages.canLoginNow'),
        type: "success",
      });

      router.push("/login");
    } catch (err: any) {
      showToast({
        title: t('errorMessages.registerFailed'),
        description: err.response?.data?.message || t('errorMessages.somethingWentWrong') ,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {  authRegister, loading };
};
