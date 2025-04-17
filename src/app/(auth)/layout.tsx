"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const email = user?.email;

  useEffect(() => {
    if (!isLoading && user?.isActive) {
      router.replace("/");
    } else if (!isLoading && user && !user?.isActive) {
      router.replace(`/verify-account?email=${encodeURIComponent(email!)}`);
    }
  }, [isLoading, user, router, email]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (user) {
    return null;
  }

  return <div className="flex justify-center items-center">{children}</div>;
}
