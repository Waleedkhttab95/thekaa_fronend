import { getLocale } from "next-intl/server";

import RecoveryCodePage from "@/components/pages/RecoveryCodePage";

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: "Recovery Code",
    },
    ar: { title: "رمز الإسترجاع" },
  };
  return metadataTranslations[locale];
}

const RecoveryCode = () => {
  return <RecoveryCodePage />;
};
export default RecoveryCode;
