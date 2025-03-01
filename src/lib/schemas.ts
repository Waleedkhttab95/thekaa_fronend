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
  z.object({
    parentName: z.string().nonempty(),
    email: z.string().nonempty().email(),
    phoneNumber: z.string().nonempty(), //todo: search how to handle phone numbers in schema
    password: z.string().nonempty(), //todo: handle using regex to make it a strong password
    confirmPassword: z.string().nonempty(), //todo: handle confirm password validation
    acceptTerms: z.boolean().default(false), //todo: make it required true
  });
