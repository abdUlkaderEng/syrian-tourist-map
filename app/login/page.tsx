"use client";
import React, { useState } from "react";
import z from "zod";
import api from "../libs/axios";
import SyriaMapBG from "../Components/SyriaMapBG";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
// import "../globals.css";

// import {Style} from;
const loginSchema = z.object({
  email: z.string().email("الإيميل غير صالح").nonempty("الإيميل مطلوب"),
  password: z
    .string()
    .min(6, "كلمة المرور قصيرة جداً")
    .nonempty("كلمة المرور مطلوبة"),
});
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      loginSchema.parse({ email, password });

      await api.post("api/login", { email, password });
      setLoading(false);
      window.location.href = "/";
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.message);
      } else {
        setError(err.response?.data?.message || "فشل تسجيل الدخول");
      }
    }
  };

  return (
    <div className=" animate-enter ">
      <SyriaMapBG />
      <div className=" min-h-screen flex  items-center justify-center">
        <form
          onSubmit={onSubmit}
          // bg-transparent backdrop-blur-md shadow-md rounded-2xl
          className=" glass  glass:hover p-8 w-full max-w-sm ">
          <h1 className="text-3xl font-bold mb-6 text-center ">تسجيل الدخول</h1>

          <div className="mb-4">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="w-full input-base input-base:focus rounded-lg p-2 focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور"
                className="w-full input-base    "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#f9bc43b4] transition-colors">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full btn-ios by-2 btn-ios:hover transition-colors duration-300">
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
          <p className="pt-4 text-sm text-[#832411] text-center">
            ليس لديك حساب؟{" "}
            <Link
              className="  hover:border-b-[#832411] border-b-2 duration-250 transition-all font-bold border-[#83241100]"
              href={"/register"}>
              إنشاء حساب{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
