"use client";
import { useToast } from "@/Components/Toast/useToast";
import api, { userApi } from "@/libs/axios";
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
        title: "تم إنشاء الحساب بنجاح!",
        description: "يمكنك الآن تسجيل الدخول",
        type: "success",
      });

      router.push("/login");
    } catch (err: any) {
      showToast({
        title: "فشل إنشاء الحساب",
        description: err.response?.data?.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {  authRegister, loading };
};
