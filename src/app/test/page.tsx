import TestPage from "@/components/pages/TestPage";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: "Placement Test",
    },
    ar: { title: "اختبار تحديد المستوى" },
  };
  return metadataTranslations[locale];
}
const Test = () => {
  return <TestPage />;
};
export default Test;
