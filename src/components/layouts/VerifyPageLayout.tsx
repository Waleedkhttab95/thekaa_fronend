"use client";

import MainLayout from "./MainLayout";

type VerifyProtectedRouteProps = {
  children: React.ReactNode;
};

export const VerifyPageLayout = ({ children }: VerifyProtectedRouteProps) => {

  return <MainLayout>{children}</MainLayout>;
};
