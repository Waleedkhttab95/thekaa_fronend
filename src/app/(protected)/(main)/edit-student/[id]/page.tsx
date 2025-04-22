import EditStudentPage from "@/components/pages/EditStudentPage";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale() as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: 'Student edit'
    },
    ar: { title: "تعديل طالب" },
  };
  return metadataTranslations[locale]
}
const AddStudent = () => {
  return <EditStudentPage />;
};
export default AddStudent;
