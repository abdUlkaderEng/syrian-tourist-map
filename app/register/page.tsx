"use client";
import React from "react";
import SyriaMapBG from "../../Components/SyriaMapBG";
import { useState } from "react";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import api from "../../libs/axios";
import axios from "axios";
import InputField from "@/Components/Form/InputField";
import Button from "@/Components/Form/Button";
import FormContainer from "@/Components/Form/FormContainer";

const registerSchema = z
  .object({
    name: z.string().min(3, "الاسم يكون 3 أحرف على الأقل"),
    email: z.string().email("البريد غير صالح"),
    password: z.string().min(6, "كلمة المرور  تكون 6 أحرف على الأقل"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post(
        "/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.confirmPassword,
        },
        { withCredentials: true }
      );
      setMessage("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "فشل إنشاء الحساب");
    } finally {
      setLoading(false);
      window.location.href = "/login";
    }
  };
  return (
    <FormContainer title="التحقق من المشرف" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type="text"
        placeholder="البريد الإلكتروني"
        {...register("name")}
        error={errors.email?.message}
      />
      <InputField
        type="email"
        placeholder="البريد الإلكتروني"
        {...register("email")}
        error={errors.email?.message}
      />
      <InputField
        type="password"
        placeholder="كلمة المرور"
        {...register("password")}
        error={errors.email?.message}
      />
      <InputField
        type="password"
        placeholder="تأكيد كلمة المرور"
        {...register("confirmPassword")}
        error={errors.email?.message}
      />
      <Button type="submit" loading={loading}>
        تسجيل الدخول
      </Button>

      <p className="text-sm  text-[#832411]">
        لديك حساب؟{" "}
        <Link
          href="/login"
          className=" hover:border-b-[#832411] border-b-2 p-0 duration-250 transition-all font-bold border-[#83241100] ">
          سجّل الدخول
        </Link>
      </p>
    </FormContainer>
  );
};

export default RegisterPage;
