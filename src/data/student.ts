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
    type: "number",
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
    type: "combo",
    options: [
      {
        id: "english",
        name: t("formData.subject.options.english"),
        icon: "/assets/images/icons/en-subject.svg",
      },
      {
        id: "physics",
        name: t("formData.subject.options.physics"),
        icon: "/assets/images/icons/physics-subject.svg",
      },
      {
        id: "math",
        name: t("formData.subject.options.math"),
        icon: "/assets/images/icons/math-subject.svg",
      },
      {
        id: "science",
        name: t("formData.subject.options.science"),
        icon: "/assets/images/icons/science-subject.svg",
      },
      {
        id: "chemistry",
        name: t("formData.subject.options.chemistry"),
        icon: "/assets/images/icons/chemistry-subject.svg",
      },
    ],
    placeholder: t("formData.subject.placeholder"),
  },
];
export const getEditStudentFormFields = (t: TFunctionType) => [
  {
    name: "studentName",
    label: t("formData.studentName.label"),
    type: "text",
    placeholder: t("formData.studentName.placeholder"),
  },
  {
    name: "age",
    label: t("formData.age.label"),
    type: "number",
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
    options: [
      t("formData.subject.options.science"),
      t("formData.subject.options.math"),
      t("formData.subject.options.science"),
      t("formData.subject.options.english"),
      t("formData.subject.options.chemistry"),
    ],
    placeholder: t("formData.subject.placeholder"),
  },
];
