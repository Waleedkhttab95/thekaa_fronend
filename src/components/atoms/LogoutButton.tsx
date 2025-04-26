"use client";

import { Button } from "./button";
import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button onClick={handleLogout} className="w-60">
      Logout
    </Button>
  );
}
