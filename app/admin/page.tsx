'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import SyriaMapBG from "../Components/SyriaMapBG";

const adminSchema = z.object({
  username: z.string().min(3, "اسم المستخدم قصير جدًا"),
  password: z.string().min(6, "كلمة المرور قصيرة جدًا"),
});

type AdminForm = z.infer<typeof adminSchema>;

const AdminLoginPage = () => {
     const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminForm>({
    resolver: zodResolver(adminSchema),
  });

  const onSubmit = (data: AdminForm) => {
    console.log("Admin data:", data);
    // هون بتضيف المنطق الحقيقي للتحقق (API call أو local validation)
  };

    return (
    <div className=" animate-enter ">
      <SyriaMapBG />
      {/* <Image
        src={"/assets/SVG/Lock.svg"}
        className="-z-10 h-1/2 top-1/4  fixed w-screen"
        alt="syria map"
        width={700}
        height={500}
      /> */}
      <div className=" min-h-screen flex  items-center justify-center">
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="glass p-8 rounded-2xl w-full max-w-md shadow-xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center mb-4 ">
        التحقق من المشرف
        </h2>

        <div>
          <input
            type="text"
            placeholder="اسم المستخدم"
            {...register("username")}
            className="w-full p-3  input-base"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="كلمة المرور"
            {...register("password")}
            className="w-full p-3 pr-10 input-base "
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#f9bc43b4] transition-colors"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full btn-ios active-tap text-lg font-semibold"
        >
          دخول
        </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
