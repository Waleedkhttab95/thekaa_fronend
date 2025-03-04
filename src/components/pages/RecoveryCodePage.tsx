import { useTranslations } from "next-intl";

import AuthLayout from "../layouts/AuthLayout";
import RecoveryCodeForm from "../organisms/RecoveryCodeForm";
import AuthHeader from "../molecules/AuthHeader";

import SentIcon from "../../../public/sent.svg";

const RecoveryCodePage = () => {
  const t = useTranslations("RecoveryCodePage");
  return (
    <AuthLayout
      headerTitle={
        <AuthHeader
          imageSrc={SentIcon}
          imageAlt="sent-icon"
          imageW={52}
          imageH={52}
          title={t("title")}
          subtitle={t("subTitle")}
          subtitle2={t("subSubTitle")}
          email="ph*******@example.com"
        />
      }
    >
      <RecoveryCodeForm />
    </AuthLayout>
  );
};
export default RecoveryCodePage;
