"use client";
import React from "react";
import SyriaMapBG from "../Components/SyriaMapBG";
import { useState } from "react";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import api from "../libs/axios";
import axios from "axios";

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
  const [showPassword, setShowPassword] = useState(false);
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
      const res = await api.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
      setMessage("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "فشل إنشاء الحساب");
    } finally {
      setLoading(false);
      window.location.href = "/login";
    }
  };
  return (
    <div className="animate-enter">
      <SyriaMapBG />
      <div className="min-h-screen flex items-center justify-center transition-colors duration-500">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass w-full max-w-sm p-6 space-y-5 text-center">
          <h2 className="text-3xl font-semibold ">إنشاء حساب</h2>

          <div className="space-y-3">
            <input
              {...register("name")}
              placeholder="الاسم الكامل"
              className="input-base"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}

            <input
              {...register("email")}
              type="email"
              placeholder="البريد الإلكتروني"
              className="input-base"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور"
                className="input-base pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-3 flex items-center text-gray-500 hover:text-[#f9bc43b4] transition-colors">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="تأكيد كلمة المرور"
            {...register("confirmPassword")}
            className="input-base pr-10"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 btn-ios ">
            {loading ? "جاري الإنشاء..." : "إنشاء حساب"}
          </button>
          {message}
          <p className="text-sm  text-[#832411]">
            لديك حساب؟{" "}
            <Link
              href="/login"
              className=" hover:border-b-[#832411] border-b-2 p-0 duration-250 transition-all font-bold border-[#83241100] ">
              سجّل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
