import { getLocale } from "next-intl/server";
import StudentProfilePage from "@/components/pages/StudentProfilePage";

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: "Student Profile",
    },
    ar: { title: "صفحة الطالب" },
  };
  return metadataTranslations[locale];
}

const StudentProfile = () => {
  return <StudentProfilePage />;
};
export default StudentProfile;
