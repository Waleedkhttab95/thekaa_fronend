import LandingPage from "@/components/pages/LandingPage";
import { getLocale } from "next-intl/server";
// import ThemeSwitcher from '@/components/atoms/ThemeSwitcher';

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: "Home | Thekaa",
    },
    ar: { title: "ذكاء | الرئيسية" },
  };
  return metadataTranslations[locale];
}
export default function HomePage() {
  return (
    <LandingPage />
  );
}
