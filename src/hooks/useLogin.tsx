import { useTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, login as loginService } from "@/services/auth";
import { axiosClient } from "@/lib/axios";
import { toast } from "@/components/atoms/sooner";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAxiosAuth } from "./useAxiosAuth";
import { ProtectedRoutes } from "@/config/routes";

export const useLogin = () => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  const t = useTranslations("LoginPage");

  const mutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      loginService(axiosClient, credentials),
    onMutate: async (variables) => {
      console.log("Logging in with:", variables);
      await queryClient.cancelQueries({ queryKey: ["auth", "user"] });
      return { email: variables.email };
    },
    onSuccess: async () => {
      startTransition(() => {
        router.replace(ProtectedRoutes.SonsFiles);
      });
      try {
        const user = await getUser(axiosAuth);
        queryClient.setQueryData(["auth", "user"], user);
      } catch {
        toast({
          title: t("loginError"),
          description: t("loginErrorDescription"),
          variant: "destructive",
        });
      }
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

  return { ...mutation, isNavigating };
};
