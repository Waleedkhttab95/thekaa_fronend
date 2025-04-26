import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ReactNode } from "react";

const StudentProfileLayout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};
export default StudentProfileLayout;
