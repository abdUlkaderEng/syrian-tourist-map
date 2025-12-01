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

interface UserLoginResponse {
  token: string;
  token_type: string;
  user: {
    user_id: number;
    name: string;
    email: string;
  };
}

const userLoginSchema = z.object({
  email: z.string().email("الإيميل غير صالح").nonempty("الإيميل مطلوب"),
  password: z.string().nonempty("كلمة المرور مطلوبة"),
});

type userLoginForm = z.infer<typeof userLoginSchema>;
const LoginPage = () => {
  const { login, loading } = useAuthLogin<UserLoginResponse>({
    apiInstance: api,
    endpoint: "/login",
    extractToken: (res: UserLoginResponse) => res.token,
    extractName: (res: UserLoginResponse) => res.user.name,
    tokenCookieName: "user_token",
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
    <FormContainer title="تسجيل الدخول" onSubmit={handleSubmit(onSubmit)}>
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

      <p className="pt-4 text-sm text-[#832411] text-center">
        ليس لديك حساب؟{" "}
        <Link
          className="  hover:border-b-[#832411] border-b-2 duration-250 transition-all font-bold border-[#83241100]"
          href={"/register"}>
          إنشاء حساب{" "}
        </Link>
      </p>
    </FormContainer>
  );
};

export default LoginPage;
