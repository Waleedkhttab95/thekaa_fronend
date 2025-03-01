import Link from "next/link";

import { useTranslations } from "next-intl";

import AuthLayout from "../layouts/AuthLayout";
import { LoginForm } from "../organisms/LoginForm";
import { CardDescription, CardTitle } from "../molecules/card";

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
            <Link href={"/sign-up"}>{t("createAnAccount")}</Link>
          </CardTitle>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};
export default LoginPage;
