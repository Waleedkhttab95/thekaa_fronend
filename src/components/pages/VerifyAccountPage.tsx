import { useTranslations } from "next-intl";

import AuthLayout from "../layouts/AuthLayout";
import VerifyAccountForm from "../organisms/VerifyAccountForm";
import AuthHeader from "../molecules/AuthHeader";

import AuthorizedLogo from "../../../public/authorized.svg";

const VerifyAccountPage = () => {
  const t = useTranslations("VerifyAccountPage");
  return (
    <AuthLayout
      headerTitle={
        <AuthHeader
          imageSrc={AuthorizedLogo}
          imageAlt="authorized"
          imageW={53}
          imageH={48}
          title={t("title")}
          subtitle={t("subTitle")}
          subtitle2={t("subSubTitle")}
        />
      }
    >
      <VerifyAccountForm />
    </AuthLayout>
  );
};
export default VerifyAccountPage;
