import AuthLayout from "../layouts/AuthLayout";
import AuthHeader from "../molecules/AuthHeader";
import NewPasswordForm from "../organisms/NewPasswordForm";
import KeyIcon from "../../../public/key.svg";
import { useTranslations } from "next-intl";

const NewPasswordPage = () => {
  const t = useTranslations("NewPasswordPage");
  return (
    <AuthLayout
      headerTitle={
        <AuthHeader
          imageSrc={KeyIcon}
          imageAlt="key-icon"
          imageW={45}
          imageH={45}
          title={t("title")}
          subtitle={t("subTitle")}
        />
      }
    >
      <NewPasswordForm />
    </AuthLayout>
  );
};
export default NewPasswordPage;
