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
    age: z.number().min(5, t("formErrors.studentAgeInvalid")),
    gender: z.string().nonempty(t("formErrors.genderRequired")),
  }),
  z.object({
    phone: z
      .string()
      .nonempty(t("formErrors.phoneRequired"))
      .min(10, t("formErrors.phoneMinError"))
      .max(20, t("formErrors.phoneMaxError"))
      .regex(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
        t("formErrors.phoneInvalid")
      ),
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
    age: z.number().min(5, t("formErrors.studentAgeInvalid")),
    grade: z.string().nonempty(t("formErrors.educationLevelRequired")),
    subject: z.string().nonempty(t("formErrors.subjectRequired")),
    // avatar: z.string().nonempty(t("formErrors.avatarRequired")),
    avatar: z.string().optional(),
  });
