import VerifyAccountHeader from "../molecules/AuthHeader";
import AuthLayout from "../layouts/AuthLayout";
import VerifyAccountForm from "../organisms/VerifyAccountForm";

import AuthorizedLogo from "../../../public/authorized.svg";
import { useTranslations } from "next-intl";

const VerifyAccountPage = () => {
  const t = useTranslations("VerifyAccountPage");
  return (
    <AuthLayout
      headerTitle={
        <VerifyAccountHeader
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
