"use client";

import { deleteCookie } from "cookies-next/client";
import { Button } from "./button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/services/auth";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const axiosAuth = useAxiosAuth();
  const { mutateAsync: MutateLogoutAsync } = useMutation({
    mutationFn: () => logout(axiosAuth),

  })
  const handleLogout = async () => {
    try {
      await MutateLogoutAsync()

    } catch (error) {
      console.error("Logout error: ", error);
    } finally {
      deleteCookie("Authentication");
      queryClient.setQueryData(["auth", "user"], null);
    }

  };

  return (
    <Button onClick={handleLogout} className="w-60">
      Logout
    </Button>
  );
}
