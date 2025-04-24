import ReportsPage from "@/components/pages/ReportsPage";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: "Reports",
    },
    ar: { title: "التقارير" },
  };
  return metadataTranslations[locale];
}

const Page = () => {
  return <ReportsPage />;
};
export default Page;
