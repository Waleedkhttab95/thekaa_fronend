import { TFunctionType } from "@/types/common.type";

export const getFromSteps = (t: TFunctionType) => [
  {
    name: "studentName",
    label: t("formData.studentName.label"),
    type: "text",
    placeholder: t("formData.studentName.placeholder"),
  },
  {
    name: "age",
    label: t("formData.age.label"),
    type: "text",
    placeholder: t("formData.age.placeholder"),
  },
  {
    name: "educationLevel",
    label: t("formData.educationLevel.label"),
    type: "select",
    options: ["إبتدائي", "إعدادي", "ثانوي", "جامعي"],
    placeholder: t("formData.educationLevel.placeholder"),
  },
  {
    name: "subject",
    label: t("formData.subject.label"),
    type: "select",
    options: ["علوم", "رياضيات", "تكنولوجيا ", "لغة إنجليزية"],
    placeholder: t("formData.subject.placeholder"),
  },
];
