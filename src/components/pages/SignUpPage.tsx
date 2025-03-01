import Link from "next/link";

import { useTranslations } from "next-intl";

import AuthLayout from "../layouts/AuthLayout";
import SignUpForm from "../organisms/SignUpForm";
import { CardDescription, CardTitle } from "../molecules/card";

const SignUpPage = () => {
  const t = useTranslations("SignUpPage");

  return (
    <AuthLayout
      headerTitle={t("welcomeText")}
      headerSubTitle={t("description")}
      footerTitle={
        <>
          <CardDescription className="text-lg">
            {t("alreadyHaveAnAccount")}
          </CardDescription>
          <CardTitle className="text-lg cursor-pointer ms-1 hover:underline">
            <Link href={"/login"}>{t("login")}</Link>
          </CardTitle>
        </>
      }
    >
      <SignUpForm />
    </AuthLayout>
  );
};
export default SignUpPage;
