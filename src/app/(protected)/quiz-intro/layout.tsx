import DashboardLayout from "@/components/layouts/DashboardLayout";
import QuizIntroLayout from "@/components/layouts/QuizIntroLayout";
import React, { PropsWithChildren } from "react";

const layout = async ({ children }: PropsWithChildren) => {
  return (
    <DashboardLayout>
      <QuizIntroLayout>{children}</QuizIntroLayout>
    </DashboardLayout>
  );
};

export default layout;
