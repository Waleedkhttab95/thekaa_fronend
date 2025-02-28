import AuthLayout from "@/components/layouts/AuthLayout";
import { CardDescription, CardTitle } from "@/components/molecules/card";
import SignUpForm from "@/components/organisms/SignUpForm";
import { useTranslations } from "next-intl";
import Link from "next/link";

const SignUp = () => {
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
export default SignUp;
