import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, login as loginService } from "@/services/auth";
import { axiosAuthClient } from "@/lib/axios";
import { toast } from "@/components/atoms/sooner";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import axios from "axios";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("LoginPage");

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      loginService(axiosAuthClient, credentials),
    onMutate: async (variables) => {
      console.log("Logging in with:", variables);
      await queryClient.cancelQueries({ queryKey: ["auth", "user"] });
      return { email: variables.email };
    },
    onSuccess: async () => {
      try {
        const user = await getUser(axiosAuthClient);
        queryClient.setQueryData(["auth", "user"], user);
        router.push("/");
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
};
