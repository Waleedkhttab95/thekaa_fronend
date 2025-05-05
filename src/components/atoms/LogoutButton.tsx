"use client";

import { deleteCookie } from "cookies-next/client";
import { Button } from "./button";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GuestOnlyRoutes } from "@/config/routes";

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("Authentication");
    deleteCookie("current_user");
    queryClient.setQueryData(["auth", "user"], null);
    router.replace(GuestOnlyRoutes.Login);
  };

  return (
    <Button onClick={handleLogout} className="w-60">
      Logout
    </Button>
  );
}
