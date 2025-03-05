import { getLocale } from "next-intl/server";

import RecoverPasswordPage from "@/components/pages/RecoverPasswordPage";

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: "Recover Password",
    },
    ar: { title: "إستعادة كلمة المرور" },
  };
  return metadataTranslations[locale];
}

const RecoverPassword = () => {
  return <RecoverPasswordPage />;
};
export default RecoverPassword;
