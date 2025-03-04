import { getLocale } from "next-intl/server";

import VerifyAccountPage from "@/components/pages/VerifyAccountPage";

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;

  const metadataTranslations = {
    en: {
      title: "Verify Account",
    },
    ar: { title: "التحقق من الحساب" },
  };

  return metadataTranslations[locale];
}

const VerifyAccount = () => {
  return <VerifyAccountPage />;
};
export default VerifyAccount;
