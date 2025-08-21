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
import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { toast } from "../atoms/sooner";
const SignUpForm = () => {
  const router = useRouter();
  const t = useTranslations("SignUpPage");
  const locale = useLocale();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<ReturnType<typeof getSignUpSchema>>>({
    resolver: zodResolver(getSignUpSchema(t)),
    defaultValues: {
      parentName: "",
      email: "",
      parentPhone: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    form.clearErrors();
  }, [locale, form]);

  const mutation = useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      parentName: string;
      parentPhone: string;
    }) => {
      // Add +966 country code to Saudi mobile numbers (format: 05xxxxxxxx)
      let phoneNumber = data.parentPhone;
      if (!phoneNumber.startsWith('+')) {
        phoneNumber = '+966' + phoneNumber;
      }
      
      const payload = {
        email: data.email,
        password: data.password,
        parentName: data.parentName,
        parentPhone: phoneNumber,
      };
      return axiosClient.post("/auth/user/create", payload);
    },
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: async (response, variables) => {
      if (response.status === 201) {
        const email = variables.email;

        router.replace(`/verify-account?email=${encodeURIComponent(email)}`);
        toast({
          title: t("success"),
          description: t("successDescription"),
          variant: "success",
        });
      } else {
        console.error(
          "User creation failed, unexpected status:",
          response.status
        );
      }
    },
    onError: (error: { response: { status: number } }) => {
      console.error("Sign-up failed:", error);

      if (error.response?.status === 409) {
        form.setError("email", {
          type: "manual",
          message: t("formErrors.emailAlreadyInUse"),
        });
      } else {
        form.setError("email", {
          type: "manual",
          message: "something went wrong",
        });
      }
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: z.infer<ReturnType<typeof getSignUpSchema>>) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="auth-form-width flex flex-col gap-y-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="parentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="parentName">{t("formInputs.parentName.label")}</FormLabel>
              <FormControl>
                <Input
                  id="parentName"
                  placeholder={t("formInputs.parentName.placeholder")}
                  {...field}
                  aria-describedby="parentName-error"
                  className="focus:ring-2 focus:ring-[#23F6F0] focus:ring-offset-2"
                />
              </FormControl>
              <FormMessage id="parentName-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">{t("formInputs.email.label")}</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("formInputs.email.placeholder")}
                  {...field}
                  aria-describedby="email-error"
                  className="focus:ring-2 focus:ring-[#23F6F0] focus:ring-offset-2"
                />
              </FormControl>
              <FormMessage id="email-error" />
            </FormItem>
          )}
        />
        {/*
          phone number rules:
            ✅ Must start with "05" (Saudi Arabia mobile format).
            ✅ Must be exactly 10 digits long.
            ✅ Can only contain digits (no spaces, dashes, or special characters).
            ✅ +966 country code will be automatically added before sending to backend.
            ❌ No letters allowed.
            ❌ No spaces, dashes (-), or parentheses.
            ❌ Cannot be empty (must be provided).
            ❌ Cannot start with any other prefix than "05".
        */}
        <FormField
          control={form.control}
          name="parentPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="parentPhone">{t("formInputs.phoneNumber.label")}</FormLabel>
              <FormControl>
                <Input
                  id="parentPhone"
                  type="tel"
                  placeholder={t("formInputs.phoneNumber.placeholder")}
                  {...field}
                  aria-describedby="parentPhone-error"
                  className="focus:ring-2 focus:ring-[#23F6F0] focus:ring-offset-2"
                />
              </FormControl>
              <FormMessage id="parentPhone-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="password">{t("formInputs.password.label")}</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  placeholder={t("formInputs.password.placeholder")}
                  type={showPassword ? "text" : "password"}
                  {...field}
                  aria-describedby="password-error"
                  className="focus:ring-2 focus:ring-[#23F6F0] focus:ring-offset-2"
                />
              </FormControl>
              <button
                type="button"
                className="absolute top-[32px] end-4 cursor-pointer bg-transparent border-none p-0"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Image
                  src={EyeSlashed}
                  alt={showPassword ? "Hide password" : "Show password"}
                  width={24}
                  height={24}
                />
              </button>
              <FormMessage id="password-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel htmlFor="confirmPassword">{t("formInputs.confirmPassword.label")}</FormLabel>
              <FormControl>
                <Input
                  id="confirmPassword"
                  placeholder={t("formInputs.confirmPassword.placeholder")}
                  type={showConfirmPassword ? "text" : "password"}
                  {...field}
                  aria-describedby="confirmPassword-error"
                  className="focus:ring-2 focus:ring-[#23F6F0] focus:ring-offset-2"
                />
              </FormControl>
              <button
                type="button"
                className="absolute top-[32px] end-4 cursor-pointer bg-transparent border-none p-0"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <Image
                  src={EyeSlashed}
                  alt={showConfirmPassword ? "Hide password" : "Show password"}
                  width={24}
                  height={24}
                />
              </button>
              <FormMessage id="confirmPassword-error" />
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
                    id="acceptTerms"
                    className="w-6 h-6 bg-white focus:ring-2 focus:ring-[#23F6F0] focus:ring-offset-2"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-describedby="acceptTerms-error"
                  />
                </FormControl>
                <FormLabel htmlFor="acceptTerms" className="pb-2 ms-1 cursor-pointer">
                  {t("formInputs.acceptTerms.label")}
                </FormLabel>
                <FormMessage id="acceptTerms-error" />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-y-4 mt-6">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("loading") : t("signUpButton")}
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
};

export default SignUpForm;
