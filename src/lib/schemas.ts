import { z } from "zod";

export const getLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .nonempty(t("formErrors.emailRequired"))
      .email(t("formErrors.emailInvalid")),
    password: z.string().nonempty(t("formErrors.passwordRequired")),
    rememberMe: z.boolean().default(false),
  });

export const getSignUpSchema = (t: (key: string) => string) =>
  z
    .object({
      parentName: z
        .string()
        .nonempty(t("formErrors.parentNameRequired"))
        .min(1, t("formErrors.parentNameCantBeOneCharacter")),
      email: z
        .string()
        .nonempty(t("formErrors.emailRequired"))
        .email(t("formErrors.emailInvalid")),
      phoneNumber: z
        .string()
        .nonempty(t("formErrors.phoneNumberRequired"))
        .regex(/^\+?[1-9]\d{1,14}$/, t("formErrors.phoneNumberInvalid")),
      password: z
        .string()
        .min(8, t("formErrors.passwordMinLength"))
        .regex(/[A-Z]/, t("formErrors.passwordUpperCase"))
        .regex(/[a-z]/, t("formErrors.passwordLowerCase"))
        .regex(/\d/, t("formErrors.passwordDigit"))
        .regex(/[@$!%*?&]/, t("formErrors.passwordSpecialCharacter")),
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
