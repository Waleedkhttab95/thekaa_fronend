"use client";

import { useRouter } from "next/navigation";
import { getSignUpSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../atoms/form";
import { Input } from "../atoms/input";
import Image from "next/image";
import { Button } from "../atoms/button";
import { CardDescription } from "../molecules/card";
import GoogleButton from "../atoms/GoogleButton";
import EyeSlashed from "../../../public/eye-slash.svg";
import { Checkbox } from "../atoms/checkbox";

const SignUpForm = () => {
  const router = useRouter();
  const t = useTranslations("SignUpPage");
  const locale = useLocale();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<ReturnType<typeof getSignUpSchema>>>({
    resolver: zodResolver(getSignUpSchema(t)),
    defaultValues: {
      parentName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    form.clearErrors();
  }, [locale, form]);

  function onSubmit(data: z.infer<ReturnType<typeof getSignUpSchema>>) {
    console.log(data);
    form.reset();
    router.push("/sign-up/verify-account");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[487px] flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="parentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("formInputs.parentName.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("formInputs.parentName.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("formInputs.phoneNumber.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("formInputs.phoneNumber.placeholder")}
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>{t("formInputs.confirmPassword.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("formInputs.confirmPassword.placeholder")}
                  type={showConfirmPassword ? "text" : "password"}
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
                  setShowConfirmPassword((prev) => !prev);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center">
                <FormControl>
                  <Checkbox
                    className="w-6 h-6 bg-white"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="pb-2 ms-1">
                  {t("formInputs.acceptTerms.label")}
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-y-4 mt-6">
          <Button type="submit">{t("signUpButton")}</Button>
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
};
export default SignUpForm;
