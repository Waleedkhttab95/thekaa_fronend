import { z } from "zod";

export const getLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .email(t("formErrors.emailInvalid"))
      .nonempty(t("formErrors.emailRequired")),
    password: z.string().nonempty(t("formErrors.passwordRequired")),
    rememberMe: z.boolean().default(false),
  });

export const getSignUpSchema = (t: (key: string) => string) =>
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

export const getStudentAddSchema = (t: (key: string) => string) => [
  z.object({
    studentName: z.string().nonempty(t("formErrors.studentNameRequired")),
  }),
  z.object({
    age: z.coerce
      .number({
        invalid_type_error: t("formErrors.studentAgeInvalid"),
      })
      .min(5, t("formErrors.studentAgeInvalid")),
  }),
  z.object({
    educationLevel: z.string().nonempty(t("formErrors.educationLevelRequired")),
  }),
  z.object({ subject: z.string().nonempty(t("formErrors.subjectRequired")) }),
];
