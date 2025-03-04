import { TFunctionType } from "@/types/common.type";
import { z } from "zod";

export const getLoginSchema = (t: TFunctionType) =>
  z.object({
    email: z
      .string()
      .email(t("formErrors.emailInvalid"))
      .nonempty(t("formErrors.emailRequired")),
    password: z.string().nonempty(t("formErrors.passwordRequired")),
    rememberMe: z.boolean().default(false),
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
      phoneNumber: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, t("formErrors.phoneNumberInvalid"))
        .nonempty(t("formErrors.phoneNumberRequired")),
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


export const getStudentAddSchema = (t: TFunctionType) => [
  z.object({
    studentName: z
      .string()
      .nonempty(t("formErrors.studentNameRequired"))
      .regex(/^[\p{L}\s]+$/u, t("formErrors.studentNameInvalid"))
      .min(3, t("formErrors.studentNameMinLength"))
      .max(40, t("formErrors.studentNameMaxLength")),
  }),
  z.object({
    age: z.number().min(5, t("formErrors.studentAgeInvalid")),
  }),
  z.object({
    educationLevel: z.string().nonempty(t("formErrors.educationLevelRequired")),
  }),
  z.object({ subject: z.string().nonempty(t("formErrors.subjectRequired")) }),
];

export const getRecoverPasswordSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("invalidEmail")).nonempty(t("requiredEmail")),
  });

