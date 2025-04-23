import { getLocale } from "next-intl/server";
import React from "react";
import QuizPage from "@/components/pages/QuizPage";

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: "Quiz",
    },
    ar: { title: "إختبار" },
  };
  return metadataTranslations[locale];
}

const page = () => {
  return <QuizPage />;
};

export default page;
