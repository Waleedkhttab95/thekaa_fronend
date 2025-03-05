"use client";

import { useState } from "react";

import OtpForm from "./OtpForm";
import { useRouter } from "next/navigation";

const RecoveryCodeForm = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isError, setIsError] = useState(false);

  const onChange = (value: string) => {
    setValue(value);
    setIsError(false);
  };

  const handleComplete = () => {
    if (value !== "1234") {
      setIsError(true);
      setIsValid(false);
    }
    if (value === "1234") {
      setIsValid(true);
      setIsError(false);
      router.push("/new-password");
    }
  };

  return (
    <OtpForm
      pageContent="RecoveryCodePage"
      value={value}
      isValid={isValid}
      isError={isError}
      onChange={onChange}
      handleComplete={handleComplete}
    />
  );
};

export default RecoveryCodeForm;
