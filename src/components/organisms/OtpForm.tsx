import clsx from "clsx";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../atoms/input-otp";
import { CardDescription, CardTitle } from "../molecules/card";
import { Button } from "../atoms/button";
import { useTranslations } from "next-intl";

// todo: remove isValid after intigerating fully in otp forms.

type OtpFormProps = {
  pageContent: string;
  value: string;
  isValid?: boolean;
  isError: boolean;
  onChange: (value: string) => void;
  handleComplete: () => void;
  isLoading?: boolean;
};

const OtpForm = ({
  pageContent,
  value,
  isValid,
  isError,
  handleComplete,
  onChange,
  isLoading = false,
}: OtpFormProps) => {
  const t = useTranslations(pageContent);
  return (
    <div className="flex flex-col justify-center items-center">
      <InputOTP maxLength={4} value={value} onChange={onChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} error={isError} />
          <InputOTPSlot index={1} error={isError} />
          <InputOTPSlot index={2} error={isError} />
          <InputOTPSlot index={3} error={isError} />
        </InputOTPGroup>
      </InputOTP>
      <div
        className={clsx("mt-6", {
          "flex flex-col items-center": isError,
          "flex flex-col xl:flex-row justify-center items-center": !isError,
        })}
      >
        {isError && (
          <p className="text-destructive text-center mb-2 w-[300px] xl:w-[400px]">
            {t("wrongCode")}
          </p>
        )}
        {!isError && <CardDescription>{t("didNotGetCode")}</CardDescription>}
        <CardTitle className="hover: underline cursor-pointer">
          {t("sendCodeAgain")}
        </CardTitle>
      </div>
      <Button
        className="w-full mt-6"
        onClick={handleComplete}
        disabled={isLoading || value.length !== 4}
      >
        {isLoading ? t("loading") : t("verify")}
      </Button>
      {isValid && (
        <p className="absolute top-4 bg-green-500 text-white">Valid Code</p>
      )}
    </div>
  );
};
export default OtpForm;
