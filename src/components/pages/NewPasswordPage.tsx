"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import AuthLayout from "../layouts/AuthLayout";
import NewPasswordForm from "../organisms/NewPasswordForm";
import AuthHeader from "../molecules/AuthHeader";
import KeyIcon from "../../../public/key.svg";
import SuccessfulNewPassword from "../organisms/SuccessfulNewPassword";

const NewPasswordPage = () => {
  const t = useTranslations("NewPasswordPage");
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) return <SuccessfulNewPassword />;
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
      <NewPasswordForm setIsSuccess={setIsSuccess} />
    </AuthLayout>
  );
};
export default NewPasswordPage;
