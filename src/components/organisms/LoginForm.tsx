"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import GoogleButton from "../atoms/GoogleButton";
import { getLoginSchema } from "@/lib/schemas";
import { useLocale, useTranslations } from "next-intl";
import { CardDescription } from "../molecules/card";
import { Checkbox } from "../atoms/checkbox";
import EyeSlashed from "../../../public/eye-slash.svg";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const t = useTranslations("LoginPage");
  const locale = useLocale();
  const router = useRouter();
  const { login, loginLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<ReturnType<typeof getLoginSchema>>>({
    resolver: zodResolver(getLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const emailValue = form.getValues("email");
  const passwordValue = form.getValues("password");

  useEffect(() => {
    if (emailValue) {
      form.clearErrors("email");
    }
  }, [emailValue, form]);

  useEffect(() => {
    if (passwordValue) {
      form.clearErrors("password");
    }
  }, [passwordValue, form]);

  useEffect(() => {
    form.clearErrors();
  }, [locale, form]);

  async function onSubmit(data: z.infer<ReturnType<typeof getLoginSchema>>) {
    setError(null);
    try {
      await login({ email: data.email, password: data.password });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setError("something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="auth-form-width flex flex-col gap-y-2"
      >
        {error && <p className="text-red-500">{error}</p>}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("formInputs.email.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("formInputs.email.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>{t("formInputs.password.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("formInputs.password.placeholder")}
                  type={showPassword ? "text" : "password"}
                  {...field}
                />
              </FormControl>
              <Image
                className="absolute top-[32px] end-4 cursor-pointer"
                src={EyeSlashed}
                alt="eye-slashed"
                width={24}
                height={24}
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center">
                <FormControl>
                  <Checkbox
                    className="w-6 h-6 bg-white"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
                <FormLabel className="pb-2 ms-1">
                  {t("formInputs.rememberMe.label")}
                </FormLabel>
              </FormItem>
            )}
          />
          <p className="cursor-pointer hover:underline">
            <Link href={"/recover-password"}>{t("forgotPassword")}</Link>
          </p>
        </div>
        <div className="w-full flex flex-col gap-y-4 mt-6">
          <Button type="submit" disabled={loginLoading}>
            {loginLoading ? t("loading") : t("loginButton")}
          </Button>
          <CardDescription className="relative flex items-center gap-x-2 w-full text-center text-sm">
            <span className="flex-1 h-px bg-[#E7E4E5]"></span>
            <span className="px-2">{t("continueWith")}</span>
            <span className="flex-1 h-px bg-[#E7E4E5]"></span>
          </CardDescription>
          <GoogleButton type="button" />
        </div>
      </form>
    </Form>
  );
}
