import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginService } from "@/services/auth";
import { axiosAuthClient } from "@/lib/axios";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      loginService(axiosAuthClient, credentials),
    onMutate: async (variables) => {
      console.log("Logging in with:", variables);
      await queryClient.cancelQueries({ queryKey: ["auth", "user"] });
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
    },
  });
};
