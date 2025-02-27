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
