"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import api, { superApi } from "../../libs/axios";
import InputField from "@/Components/Form/InputField";
import Button from "@/Components/Form/Button";
import FormContainer from "@/Components/Form/FormContainer";
import { useAuthLogin } from "@/hooks/Auth/useAuthLogin";
import { useTranslations } from "next-intl";

interface SuperAdminLoginResponse {
  token: string;
  token_type: string;
  superadmin: {
    super_admin_id: number;
    name: string;
    email: string;
  };
}



const AdminLoginPage = () => {
  const t = useTranslations();
  const adminSchema = z.object({
    email: z.email().min(1, t("form.requiredField")),
    password: z.string().min(1, t("form.requiredField")),
  });
  type AdminForm = z.infer<typeof adminSchema>;
  const { login, loading } = useAuthLogin<SuperAdminLoginResponse>({
    apiInstance: superApi,
    endpoint: "/superadmin/login",
    extractToken: (res) => res.token,
    extractName: (res) => res.superadmin.name,
    role:'superadmin',
    redirectTo: "/admin/SuperAdminDashboard",
    extractId: (res) => res.superadmin.super_admin_id,
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
    <FormContainer title={t('auth.checkAdmin')} onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type="email"
        placeholder={t('auth.email')}
        {...register("email")}
        error={errors.email?.message}
      />

      <InputField
        type="password"
        placeholder={t('auth.password')}
        {...register("password")}
        error={errors.password?.message}
      />

      <Button type="submit" loading={loading}>
        {t('buttons.check')}
      </Button>
    </FormContainer>
  );
};

export default AdminLoginPage;
