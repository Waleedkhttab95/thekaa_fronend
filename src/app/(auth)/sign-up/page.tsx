import SignUpPage from "@/components/pages/SignUpPage";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;

  const metadataTranslations = {
    en: {
      title: "Sign up",
    },
    ar: { title: "إنشاء حساب" },
  };

  return metadataTranslations[locale];
}

const SignUp = () => {
  return <SignUpPage />;
};
export default SignUp;
