"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import InputField from "@/Components/Form/InputField";
import Button from "@/Components/Form/Button";
import FormContainer from "@/Components/Form/FormContainer";
import { useAuthRegister } from "@/hooks/Auth/useAuthRegister";
import { useTranslations } from "next-intl";


const RegisterPage = () => {
  const { authRegister, loading } = useAuthRegister();
  const t = useTranslations();
  const registerSchema = z
    .object({
      name: z.string().min(3, t('form.longerName')),
      email: z.string().email(t('form.invalidEmail')).nonempty(t('form.requiredField')),
      password: z.string().min(6, t('form.longerPassword')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('form.confirmPasswordDontMatch'),
      path: ["confirmPassword"],
    });
  
  type RegisterForm = z.infer<typeof registerSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <FormContainer title={t('auth.register')} onSubmit={handleSubmit(authRegister)}>
      <InputField
        type="text"
        placeholder={t('auth.username')}
        {...register("name")}
        error={errors.email?.message}
      />
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
        error={errors.email?.message}
      />
      <InputField
        type="password"
        placeholder={t('auth.confirmpassword')}
        {...register("confirmPassword")}
        error={errors.email?.message}
      />
      <Button type="submit" loading={loading}>
        {(t('auth.register'))}
                     </Button>

      <p className="text-sm text-center  text-[#832411]">
        {t('auth.haveAccount')}{" "}
        <Link
          href="/login"
          className=" hover:border-b-[#832411] border-b-2 p-0 duration-250 transition-all font-bold border-[#83241100] ">
          {t('auth.login')}
        </Link>
      </p>
    </FormContainer>
  );
};

export default RegisterPage;
