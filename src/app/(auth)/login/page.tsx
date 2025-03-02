import LoginPage from "@/components/pages/LoginPage";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale() as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: 'login'
    },
    ar: { title: "تسجيل الدخول" },
  };
  return metadataTranslations[locale]
}
const Login = () => {
  return <LoginPage />;
};
export default Login;
