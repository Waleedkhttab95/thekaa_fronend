import AuthLayout from "@/components/layouts/AuthLayout";
import { CardDescription, CardTitle } from "@/components/molecules/card";
import { LoginForm } from "@/components/organisms/LoginForm";
import { useTranslations } from "next-intl";

const LoginPage = () => {
  const t = useTranslations("LoginPage");

  return (
    <AuthLayout
      headerTitle={t("welcomeText")}
      headerSubTitle={t("description")}
      footerTitle={
        <>
          <CardDescription className="text-lg">
            {t("dontHaveAccount")}
          </CardDescription>{" "}
          <CardTitle className="text-lg cursor-pointer ms-1 hover:underline">
            {t("createAnAccount")}
          </CardTitle>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};
export default LoginPage;
