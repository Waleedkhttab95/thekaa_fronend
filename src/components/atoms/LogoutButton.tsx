"use client";

import { Button } from "./button";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next/client";
import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      deleteCookie("Authentication");
      logout();
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Button onClick={handleLogout} className="w-60">
      Logout
    </Button>
  );
}
