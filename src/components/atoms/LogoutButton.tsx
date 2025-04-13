"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const { logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading} className="w-60">
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
}
