import { useTranslations } from "next-intl";

import AuthLayout from "../layouts/AuthLayout";
import RecoverPasswordForm from "../organisms/RecoverPasswordForm";
import AuthHeader from "../molecules/AuthHeader";

import MailIcon from "../../../public/mail.svg";

const RecoverPasswordPage = () => {
  const t = useTranslations("RecoverPasswordPage");
  return (
    <AuthLayout
      headerTitle={
        <AuthHeader
          imageSrc={MailIcon}
          imageAlt="authorized"
          imageW={59}
          imageH={49}
          title={t("title")}
          subtitle={t("subTitle")}
        />
      }
    >
      <RecoverPasswordForm />
    </AuthLayout>
  );
};
export default RecoverPasswordPage;
