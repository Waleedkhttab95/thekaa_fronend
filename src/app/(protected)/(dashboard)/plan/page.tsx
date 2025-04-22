import PlanPage from "@/components/pages/PlanPage";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: "Curriculum plan",
    },
    ar: { title: "الخطة الدراسية" },
  };
  return metadataTranslations[locale];
}

const Plan = () => {
  return <PlanPage />;
};
export default Plan;
