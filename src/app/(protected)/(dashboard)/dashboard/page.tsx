import DashboardPage from "@/components/pages/DashboardPage";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: "Dashboard",
    },
    ar: { title: "لوحة التحكم" },
  };
  return metadataTranslations[locale];
}

const Page = () => {
  return <DashboardPage />;
};
export default Page;
