"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Eye, EyeOff } from "lucide-react";
import SyriaMapBG from "../Components/SyriaMapBG";
import api, { superApi, userApi } from "../libs/axios";
import axios from "axios";
import { useRouter } from "next/navigation";
interface LoginResponse {
  token: string;
  token_type: string;
  superadmin: {
    super_admin_id: number;
    username: string;
    email: string;
  };
}

const adminSchema = z.object({
  email: z.email().min(1, "البريد الإلكتروني مطلوب"),
  password: z.string().min(6, "كلمة المرور قصيرة جدًا"),
});

type AdminForm = z.infer<typeof adminSchema>;

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminForm>({
    resolver: zodResolver(adminSchema),
  });

  // const onSubmit = async (data: AdminForm) => {
  //   setLoading(true);
  //   try {
  //     const res = await api
  //       .post<LoginResponse>("/superadmin/login", {
  //         email: data.email,
  //         password: data.password,
  //       })
  //       .then((res) => {
  //         localStorage.setItem("user_token", data.access_token);
  //         userApi.defaults.headers.common[
  //           "Authorization"
  //         ] = `Bearer ${data.access_token}`;

  //         const token = res.data.token;
  //         localStorage.setItem("adminToken", token);
  //         axios.defaults.headers.common["Authorization"] =
  //           "Bearer " + data.adminToken;
  //       });
  //     setMessage("تم تسجيل الدخول بنجاح!");
  //   } catch (err: any) {
  //     setMessage(err.response?.data?.message || "فشل تسجيل الدخول");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (data: AdminForm) => {
    setLoading(true);
    
    try {
      const res = await api.post<LoginResponse>("/superadmin/login", {
        email: data.email,
        password: data.password,
      });

      const token = res.data.token;
      console.log(res.data)
      console.log(token)
      localStorage.setItem("adminToken", token);

      superApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const verfiy =
        res.status === 200
          ? router.push("/admin/SuperAdminDashboard")
          : setMessage("فشل تسجيل الدخول");
      setMessage("تم تسجيل الدخول بنجاح!");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" animate-enter ">
      <SyriaMapBG />

      <div className=" min-h-screen flex  items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass p-8 rounded-2xl w-full max-w-md shadow-xl space-y-5">
          <h2 className="text-3xl font-bold text-center mb-4 ">
            التحقق من المشرف
          </h2>

          <div>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              {...register("email")}
              className="w-full p-3  input-base"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#f9bc43b4] transition-colors">
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
            className="w-full btn-ios active-tap text-lg font-semibold">
            {loading ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
