import NewPasswordPage from "@/components/pages/NewPasswordPage";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: "New Password",
    },
    ar: { title: "كلمة مرور جديدة" },
  };
  return metadataTranslations[locale];
}

const NewPassword = () => {
  return <NewPasswordPage />;
};
export default NewPassword;
