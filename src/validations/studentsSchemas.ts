import { TFunctionType } from "@/types/common.type";
import { z } from "zod";

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
