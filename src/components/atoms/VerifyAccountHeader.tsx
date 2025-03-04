import Image from "next/image";

import { useTranslations } from "next-intl";

import AuthorizedLogo from "../../../public/authorized.svg";
import { CardDescription, CardTitle } from "../molecules/card";

const VerifyAccountHeader = () => {
  const t = useTranslations("VerifyAccountPage");

  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={AuthorizedLogo}
        alt="authorized"
        width={53}
        height={48}
        className="mb-3"
      />
      <div className="flex flex-col items-center gap-3">
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription className="text-forcedGray text-lg">
          {t("subTitle")}
        </CardDescription>
        <CardDescription className="text-forcedGray text-lg">
          {t("subSubTitle")}
        </CardDescription>
      </div>
    </div>
  );
};
export default VerifyAccountHeader;
