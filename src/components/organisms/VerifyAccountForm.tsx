"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import OtpForm from "./OtpForm";
import { useRouter } from "next/navigation";
import { toast } from "../atoms/sooner";
import { useTranslations } from "next-intl";

const VerifyAccountForm = () => {
  const t = useTranslations("VerifyAccountPage");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      router.replace("/login");
    }
  }, [email, router]);

  const verifyMutation = useMutation({
    mutationFn: async (otp: string) => {
      if (!email) throw new Error("Email is required");
      return axiosClient.post("/auth/otp/verify", {
        email,
        otp,
      });
    },
    onSuccess: (response) => {
      if (response.status === 201) {
        router.push("/");
        toast({
          title: t("success"),
          description: t("successDescription"),
          variant: "success",
        });
      } else {
        setIsError(true);
      }
    },
    onError: () => {
      setIsError(true);
    },
  });

  const onChange = (value: string) => {
    setValue(value);
    setIsError(false);
  };

  const handleComplete = () => {
    if (value.length !== 4) {
      setIsError(true);
      return;
    }
    verifyMutation.mutate(value);
  };

  return (
    <OtpForm
      pageContent="VerifyAccountPage"
      value={value}
      isError={isError}
      onChange={onChange}
      handleComplete={handleComplete}
      isLoading={verifyMutation.isPending}
    />
  );
};

export default VerifyAccountForm;
