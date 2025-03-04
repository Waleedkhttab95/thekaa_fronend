import AddStudentPage from "@/components/pages/AddStudentPage";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale() as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: 'Student Add'
    },
    ar: { title: "إضافة طالب" },
  };
  return metadataTranslations[locale]
}
const AddStudent = () => {
  return <AddStudentPage />;
};
export default AddStudent;
