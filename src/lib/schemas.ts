import { TFunctionType } from "@/types/common.type";
import { z } from "zod";

export const getLoginSchema = (t: TFunctionType) =>
  z.object({
    email: z
      .string()
      .email(t("formErrors.emailInvalid"))
      .nonempty(t("formErrors.emailRequired")),
    password: z.string().nonempty(t("formErrors.passwordRequired")),
  });

export const getSignUpSchema = (t: TFunctionType) =>
  z
    .object({
      parentName: z
        .string()
        .min(1, t("formErrors.parentNameCantBeOneCharacter"))
        .nonempty(t("formErrors.parentNameRequired")),
      email: z
        .string()
        .email(t("formErrors.emailInvalid"))
        .nonempty(t("formErrors.emailRequired")),
      parentPhone: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, t("formErrors.phoneNumberInvalid"))
        .nonempty(t("formErrors.phoneNumberRequired")),
      password: z
        .string()
        .nonempty(t("formErrors.passwordRequired")),
      confirmPassword: z
        .string()
        .nonempty(t("formErrors.confirmPasswordRequired")),
      acceptTerms: z.literal(true, {
        errorMap: () => ({ message: t("formErrors.acceptTermsRequired") }),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("formErrors.passwordsMustMatch"),
      path: ["confirmPassword"],
    });

export const getRecoverPasswordSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("invalidEmail")).nonempty(t("requiredEmail")),
  });

export const getNewPasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      newPassword: z
        .string()
        .nonempty(t("formErrors.passwordRequired")),
      confirmNewPassword: z
        .string()
        .nonempty(t("formErrors.confirmPasswordRequired")),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("formErrors.passwordsMustMatch"),
      path: ["confirmNewPassword"],
    });

export const getEditProfileSchema = (t: (key: string) => string) =>
  z.object({
    avatar: z.string().optional(),
    name: z.string().min(1, { message: t("nameRequired") }),
    age: z.string().min(1, { message: t("ageRequired") }),
    educationLevel: z.string().min(1, { message: t("educationLevelRequired") }),
    subject: z.string().min(1, { message: t("subjectRequired") }),
  });
