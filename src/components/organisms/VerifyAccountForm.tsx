"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import OtpForm from "./OtpForm";
import { useRouter } from "next/navigation";
import { toast } from "../atoms/sooner";
import { useTranslations } from "next-intl";
import { ProtectedRoutes } from "@/config/routes";
import { getUser, verifyAccount } from "@/services/auth";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";

const VerifyAccountForm = () => {
  const t = useTranslations("VerifyAccountPage");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const email = searchParams.get("email");
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    if (!email) {
      router.replace("/login");
    }
  }, [email, router]);

  const verifyMutation = useMutation({
    mutationFn: async (otp: string) =>
      verifyAccount(axiosClient, { email: email!, otp }),
    onSuccess: async (response) => {
      if (response.status === 201) {
        toast({
          title: t("success"),
          description: t("successDescription"),
          variant: "success",
        });
      }

      try {
        const user = await getUser(axiosAuth);
        queryClient.setQueryData(["auth", "user"], user);
        router.replace(ProtectedRoutes.SonsFiles);
      } catch {
        toast({
          title: t("somethingWentWrong"),
          description: t("somethingWentWrongDescription"),
          variant: "destructive",
        });
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
