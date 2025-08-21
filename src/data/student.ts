import { TFunctionType } from "@/types/common.type";
import { ICountry, IGradeLevel, ISubject } from "@/types/content.type";
type Content = {
  countries: ICountry[] | undefined;
  gradeLevels: IGradeLevel[] | undefined;
  subjects: ISubject[] | undefined;
};
export const getFromSteps = (t: TFunctionType, content: Content) => [
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
      type: "select",
      placeholder: t("formData.age.placeholder"),
      options: [
        { _id: "6", name: "6" },
        { _id: "7", name: "7" },
        { _id: "8", name: "8" },
        { _id: "9", name: "9" },
        { _id: "10", name: "10" },
        { _id: "11", name: "11" },
        { _id: "12", name: "12" },
      ],
    },
    {
      name: "gender",
      label: t("formData.gender.label"),
      type: "select",
      placeholder: t("formData.gender.placeholder"),
      options: [
        {
          _id: "male",
          name: t("formData.gender.options.male"),
        },
        {
          _id: "female",
          name: t("formData.gender.options.female"),
        },
      ],
    },
  ],
  [
    {
      name: "country",
      label: t("formData.country.label"),
      type: "select",
      placeholder: t("formData.country.placeholder"),
      options: content.countries ?? [],
    },
  ],
  [
    {
      name: "grade",
      label: t("formData.educationLevel.label"),
      type: "select",
      options: content.gradeLevels ?? [],
      placeholder: t("formData.educationLevel.placeholder"),
    },
  ],
  [
    {
      name: "subject",
      label: t("formData.subject.label"),
      type: "combo",
      options: content.subjects ?? [],
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
    type: "select",
    placeholder: t("formData.age.placeholder"),
    options: [
      { _id: "6", name: "6" },
      { _id: "7", name: "7" },
      { _id: "8", name: "8" },
      { _id: "9", name: "9" },
      { _id: "10", name: "10" },
      { _id: "11", name: "11" },
      { _id: "12", name: "12" },
    ],
  },
];
