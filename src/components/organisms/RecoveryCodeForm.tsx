"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import { CardDescription, CardTitle } from "../molecules/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../atoms/input-otp";
import { Button } from "../atoms/button";
import { useRouter } from "next/navigation";

const RecoveryCodeForm = () => {
  const router = useRouter();
  const t = useTranslations("RecoveryCodePage");
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isError, setIsError] = useState(false);

  const onComplete = () => {
    if (value === "1234") {
      setIsValid(true);
      setIsError(false);
      router.push("/new-password");
      return;
    }
    setIsError(true);
    setIsValid(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <InputOTP
        maxLength={4}
        value={value}
        onChange={(value) => {
          setValue(value);
          setIsError(false);
        }}
        onComplete={onComplete}
      >
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
          "flex justify-center items-center": !isError,
        })}
      >
        {isError && (
          <p className="text-destructive text-center mb-2 w-[400px]">
            {t("wrongCode")}
          </p>
        )}
        {!isError && <CardDescription>{t("didNotGetCode")}</CardDescription>}
        <CardTitle className="hover:underline cursor-pointer">
          {t("sendCodeAgain")}
        </CardTitle>
      </div>
      <Button className="w-full mt-6">{t("verify")}</Button>
      {isValid && (
        <p className="absolute top-4 bg-green-500 text-white">validCode</p>
      )}
    </div>
  );
};

export default RecoveryCodeForm;
