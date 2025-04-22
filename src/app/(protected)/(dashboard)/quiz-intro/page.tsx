import QuizIntroPage from "@/components/pages/QuizIntroPage";
import { getLocale } from "next-intl/server";
import React from "react";

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: "Quiz Introduction",
    },
    ar: { title: "ما قبل الإختبار" },
  };
  return metadataTranslations[locale];
}

const page = () => {
  return <QuizIntroPage />;
};

export default page;
