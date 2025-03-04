"use client";

import { getNewPasswordSchema } from "@/lib/schemas";
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
import EyeSlashed from "../../../public/eye-slash.svg";

const NewPasswordForm = () => {
  const t = useTranslations("NewPasswordPage");
  const locale = useLocale();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<z.infer<ReturnType<typeof getNewPasswordSchema>>>({
    resolver: zodResolver(getNewPasswordSchema(t)),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    form.clearErrors();
  }, [locale, form]);

  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  function onSubmit(data: z.infer<ReturnType<typeof getNewPasswordSchema>>) {
    console.log(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[487px] flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>{t("formInputs.newPasswordLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("formInputs.newPasswordPlaceholder")}
                  type={showPassword ? "text" : "password"}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    evaluatePasswordStrength(e.target.value);
                  }}
                />
              </FormControl>
              <Image
                className="absolute top-[32px] end-4 cursor-pointer"
                src={EyeSlashed}
                alt="eye-slashed"
                width={24}
                height={24}
                onClick={() => setShowPassword((prev) => !prev)}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>{t("formInputs.confirmNewPasswordLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("formInputs.confirmNewPasswordPlaceholder")}
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
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Strength Indicator */}
        <div className="flex justify-between items-center mt-4">
          <CardDescription className="text-lg text-forcedGray mb-1">
            {t("passwordStrength")}
          </CardDescription>
          <div className="w-[70%] h-2 rounded-full bg-gray-300">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                passwordStrength === 1
                  ? "bg-red-500 w-1/3"
                  : passwordStrength === 2
                  ? "bg-yellow-500 w-2/3"
                  : passwordStrength === 3
                  ? "bg-green-500 w-full"
                  : "w-0"
              }`}
            ></div>
          </div>
          <span
            className={`text-sm mt-1 ${
              passwordStrength === 1
                ? "text-red-500"
                : passwordStrength === 2
                ? "text-yellow-500"
                : passwordStrength === 3
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            {passwordStrength === 1
              ? t("weak")
              : passwordStrength === 2
              ? t("mid")
              : passwordStrength === 3
              ? t("strong")
              : ""}
          </span>
        </div>
        <ul className="flex flex-col gap-1 text-forcedGray list-disc list-inside">
          <li>{t("numberOfCharacters")}</li>
          <li>{t("oneNumber")}</li>
          <li>{t("oneSpecialCharacter")}</li>
        </ul>
        <div className="w-full flex flex-col gap-y-4 mt-6">
          <Button type="submit">{t("changePassword")}</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewPasswordForm;
