"use client";
import z from "zod";
import api from "../../libs/axios";
import Link from "next/link";
import Button from "@/Components/Form/Button";
import FormContainer from "@/Components/Form/FormContainer";
import InputField from "@/Components/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthLogin } from "@/hooks/Auth/useAuthLogin";
import { useTranslations } from "next-intl";
interface UserLoginResponse {
  token: string;
  token_type: string;
  user: {
    user_id: number;
    name: string;
    email: string;
  };
}

const LoginPage = () => {
  const t = useTranslations();

  const userLoginSchema = z.object({
    email: z.string().email(t("form.invalidEmail")).nonempty(t("form.requiredField")),
    password: z.string().nonempty(t("form.requiredField")),
  });

  type userLoginForm = z.infer<typeof userLoginSchema>;
  const { login, loading } = useAuthLogin<UserLoginResponse>({
    apiInstance: api,
    endpoint: "/login",
    extractToken: (res: UserLoginResponse) => res.token,
    extractName: (res: UserLoginResponse) => res.user.name,
    role:'user',
    redirectTo: "/",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginForm>({
    resolver: zodResolver(userLoginSchema),
  });

  async function onSubmit(data: userLoginForm) {
    await login(data);
  }


  return (
    <FormContainer title={t("auth.login")} onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type="email"
        placeholder={t("auth.email")}
        {...register("email")}
        error={errors.email?.message}
      />

      <InputField
        type="password"
        placeholder={t("auth.password")}
        {...register("password")}
        error={errors.password?.message}
      />

      <Button type="submit" loading={loading}>
        {t("auth.login")}
      </Button>

      <p className="pt-4 text-sm text-[#832411] text-center">
        {t("auth.noAccount")}{" "}
        <Link
          className="  hover:border-b-[#832411] border-b-2 duration-250 transition-all font-bold border-[#83241100]"
          href={"/register"}>
          {t("auth.register")}
        </Link>
      </p>
    </FormContainer>
  );
};

export default LoginPage;
