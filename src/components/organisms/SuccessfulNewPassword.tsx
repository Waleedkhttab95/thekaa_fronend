import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../molecules/card";
import SuccessIcon from "../../../public/successful-new-password.svg";
import { useTranslations } from "next-intl";
import { Button } from "../atoms/button";
import Link from "next/link";

const SuccessfulNewPassword = () => {
  const t = useTranslations("NewPasswordPage");
  return (
    <Card className="flex flex-col justify-center items-center py-28 px-28">
      <CardHeader>
        <Image src={SuccessIcon} alt="success-icon" width={67} height={67} />
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3 ">
        <CardTitle className="text-3xl">{t("congrats")}</CardTitle>
        <CardDescription>{t("successMassage")}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link href={"/login"}>
          <Button className="w-64 mt-12">{t("login")}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
export default SuccessfulNewPassword;
