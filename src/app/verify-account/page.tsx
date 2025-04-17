import { getLocale } from "next-intl/server";

import VerifyAccountPage from "@/components/pages/VerifyAccountPage";
import { VerifyPageLayout } from "@/components/layouts/VerifyPageLayout";

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
  return (
    <VerifyPageLayout>
      <div className="flex justify-center items-center">
        <VerifyAccountPage />
      </div>
    </VerifyPageLayout>
  );
};
export default VerifyAccount;
