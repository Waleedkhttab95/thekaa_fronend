import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, login as loginService } from "@/services/auth";
import { axiosAuthClient } from "@/lib/axios";
import { toast } from "@/components/atoms/sooner";
import { useTranslations } from "next-intl";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const t = useTranslations("LoginPage");

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      loginService(axiosAuthClient, credentials),
    onMutate: async (variables) => {
      console.log("Logging in with:", variables);
      await queryClient.cancelQueries({ queryKey: ["auth", "user"] });
    },
    onSuccess: async () => {
      try {
        const user = await getUser(axiosAuthClient);
        queryClient.setQueryData(["auth", "user"], user);

        router.push("/dashboard");
      } catch {
        toast({
          title: t("loginError"),
          description: t("loginErrorDescription"),
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: t("loginError"),
        description: t("loginErrorDescription"),
        variant: "destructive",
      });
    },
  });
};
