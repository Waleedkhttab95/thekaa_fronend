"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MainLayout from "./MainLayout";

type VerifyProtectedRouteProps = {
  children: React.ReactNode;
};

export const VerifyPageLayout = ({ children }: VerifyProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.isActive) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (isLoading || user?.isActive) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return <MainLayout>{children}</MainLayout>;
};
