"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "./button";

export default function LogoutButton() {
  const { logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
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
