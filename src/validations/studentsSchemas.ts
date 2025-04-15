import { TFunctionType } from "@/types/common.type";
import { z } from "zod";

export const getStudentAddSchema = (t: TFunctionType) => [
  z.object({
    firstName: z
      .string()
      .nonempty(t("formErrors.studentFirstNameRequired"))
      .regex(/^[\p{L}\s]+$/u, t("formErrors.studentNameInvalid"))
      .min(3, t("formErrors.studentNameMinLength"))
      .max(40, t("formErrors.studentNameMaxLength")),
    lastName: z
      .string()
      .nonempty(t("formErrors.studentLastNameRequired"))
      .regex(/^[\p{L}\s]+$/u, t("formErrors.studentNameInvalid"))
      .min(3, t("formErrors.studentNameMinLength"))
      .max(40, t("formErrors.studentNameMaxLength")),
  }),
  z.object({
    age: z.coerce
      .number()
      .optional()
      .refine((val = 0) => val >= 6 && val <= 12, {
        message: t("formErrors.studentAgeInvalid"),
      }),
    gender: z.string().nonempty(t("formErrors.genderRequired")),
  }),
  z.object({
    country: z.string().nonempty(t("formErrors.countryRequired")),
  }),
  z.object({
    grade: z.string().nonempty(t("formErrors.educationLevelRequired")),
  }),
  z.object({ subject: z.string().nonempty(t("formErrors.subjectRequired")) }),
];
export const getStudentEditSchema = (t: TFunctionType) =>
  z.object({
    firstName: z
      .string()
      .nonempty(t("formErrors.studentFirstNameRequired"))
      .regex(/^[\p{L}\s]+$/u, t("formErrors.studentNameInvalid"))
      .min(3, t("formErrors.studentNameMinLength"))
      .max(40, t("formErrors.studentNameMaxLength")),
    lastName: z
      .string()
      .nonempty(t("formErrors.studentLastNameRequired"))
      .regex(/^[\p{L}\s]+$/u, t("formErrors.studentNameInvalid"))
      .min(3, t("formErrors.studentNameMinLength"))
      .max(40, t("formErrors.studentNameMaxLength")),
    age: z.coerce
      .number()
      .optional()
      .refine((val = 0) => val >= 6 && val <= 12, {
        message: t("formErrors.studentAgeInvalid"),
      }),
    grade: z.string().nonempty(t("formErrors.educationLevelRequired")),
    subject: z.string().nonempty(t("formErrors.subjectRequired")),
    // avatar: z.string().nonempty(t("formErrors.avatarRequired")),
    avatar: z.string().optional(),
  });
