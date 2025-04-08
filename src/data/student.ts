import { TFunctionType } from "@/types/common.type";

export const getFromSteps = (t: TFunctionType) => [
  [
    {
      name: "firstName",
      label: t("formData.studentFirstName.label"),
      type: "text",
      placeholder: t("formData.studentFirstName.placeholder"),
      options: [],
    },
    {
      name: "lastName",
      label: t("formData.studentLastName.label"),
      type: "text",
      placeholder: t("formData.studentLastName.placeholder"),
      options: [],
    },
  ],
  [
    {
      name: "age",
      label: t("formData.age.label"),
      type: "number",
      placeholder: t("formData.age.placeholder"),
      options: [],
    },
    {
      name: "gender",
      label: t("formData.gender.label"),
      type: "select",
      placeholder: t("formData.gender.placeholder"),
      options: [
        {
          id: "female",
          name: t("formData.gender.options.male"),
        },
        {
          id: "female",
          name: t("formData.gender.options.female"),
        },
      ],
    },
  ],
  [
    {
      name: "phone",
      label: t("formData.phone.label"),
      type: "text",
      placeholder: t("formData.phone.placeholder"),
      options: [],
    },
    {
      name: "country",
      label: t("formData.country.label"),
      type: "text",
      placeholder: t("formData.country.placeholder"),
      options: [],
    },
  ],
  [
    {
      name: "grade",
      label: t("formData.educationLevel.label"),
      type: "select",
      options: ["إبتدائي", "إعدادي", "ثانوي", "جامعي"],
      placeholder: t("formData.educationLevel.placeholder"),
    },
  ],
  [
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
  ],
];
export const getEditStudentFormFields = (t: TFunctionType) => [
  {
    name: "firstName",
    label: t("formData.studentFirstName.label"),
    type: "text",
    placeholder: t("formData.studentFirstName.placeholder"),
  },
  {
    name: "lastName",
    label: t("formData.studentLastName.label"),
    type: "text",
    placeholder: t("formData.studentLastName.placeholder"),
  },
  {
    name: "age",
    label: t("formData.age.label"),
    type: "number",
    placeholder: t("formData.age.placeholder"),
  },
  {
    name: "grade",
    label: t("formData.educationLevel.label"),
    type: "select",
    options: ["إبتدائي", "إعدادي", "ثانوي", "جامعي"],
    placeholder: t("formData.educationLevel.placeholder"),
  },
  {
    name: "phone",
    label: t("formData.phone.label"),
    type: "text",
    placeholder: t("formData.phone.placeholder"),
    options: [],
  },
  {
    name: "subject",
    label: t("formData.subject.label"),
    type: "select",
    options: [
      { id: "science", name: t("formData.subject.options.science") },
      { id: "math", name: t("formData.subject.options.math") },
      { id: "english", name: t("formData.subject.options.english") },
      { id: "chemistry", name: t("formData.subject.options.chemistry") },
      { id: "physics", name: t("formData.subject.options.physics") },
    ],
    placeholder: t("formData.subject.placeholder"),
  },
];
