import { useMutation } from "@tanstack/react-query";
import { login as loginService } from "@/services/auth";
import { axiosClient } from "@/lib/axios";
import { toast } from "@/components/atoms/sooner";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ProtectedRoutes } from "@/config/routes";
import { useTransition } from "react";

export const useLogin = () => {
  const router = useRouter();
  const t = useTranslations("LoginPage");
  const [isNavigating, startTransition] = useTransition();

  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      loginService(axiosClient, credentials),
    onSuccess: async () => {
      startTransition(() => {
        router.replace(ProtectedRoutes.SonsFiles);
      });
    },
    onError: (error, variables) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message === "User is not active") {
          const email = variables.email;
          router.push(`/verify-account?email=${encodeURIComponent(email!)}`);
          toast({
            title: t("accountNeedsVerification"),
            description: t("accoundNeedsVerificationDescription"),
            variant: "destructive",
          });
        } else {
          toast({
            title: t("loginError"),
            description: t("loginErrorDescription"),
            variant: "destructive",
          });
        }
      }
    },
  });

  return { ...loginMutation, isNavigating };
};
