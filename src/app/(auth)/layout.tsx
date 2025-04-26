"use client";

import MainLayout from "@/components/layouts/MainLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <MainLayout>
      <div className="flex justify-center items-center">{children}</div>
    </MainLayout>
  );
}
