"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import api, { superApi } from "../../libs/axios";
import InputField from "@/Components/Form/InputField";
import Button from "@/Components/Form/Button";
import FormContainer from "@/Components/Form/FormContainer";
import { useAuthLogin } from "@/hooks/useAuthLogin";

interface SuperAdminLoginResponse {
  token: string;
  token_type: string;
  superadmin: {
    super_admin_id: number;
    username: string;
    email: string;
  };
}

const adminSchema = z.object({
  email: z.email().min(1, "الرجاء إدخال البريد الإلكتروني"),
  password: z.string().min(1, "الرجاء إدخال كلمة المرور "),
});

type AdminForm = z.infer<typeof adminSchema>;

const AdminLoginPage = () => {
  const { login, loading } = useAuthLogin<SuperAdminLoginResponse>({
    apiInstance: api,
    endpoint: "/superadmin/login",

    extractToken: (res) => res.token,
    extractSuperAdminUsername: (res) => res.superadmin.username,
    tokenStorageKey: "super_token",

    redirectTo: "/admin/SuperAdminDashboard",

    setAuthHeader: (token) => {
      superApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminForm>({
    resolver: zodResolver(adminSchema),
  });

  async function onSubmit(data: AdminForm) {
    await login(data);
  }

  return (
    <FormContainer title="التحقق من المشرف" onSubmit={handleSubmit(onSubmit)}>
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
        error={errors.password?.message}
      />

      <Button type="submit" loading={loading}>
        تسجيل الدخول
      </Button>
    </FormContainer>
  );
};

export default AdminLoginPage;
