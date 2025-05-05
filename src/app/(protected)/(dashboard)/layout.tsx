import { axiosAuthServer } from "@/lib/serverAxios";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { STUDENTS_QUERY } from "@/config/qr.constants";
import { getCookie } from "cookies-next/client";
import { getStudentById } from "@/services/students";
import { redirect } from "next/navigation";
import { ProtectedRoutes } from "@/config/routes";

const StudentProfileLayout = async ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  const id = getCookie("current_user");
  if (!id) {
    redirect(ProtectedRoutes.SonsFiles);
  }
  await queryClient.prefetchQuery({
    queryKey: [STUDENTS_QUERY, id],
    queryFn: () => getStudentById(axiosAuthServer, id as string),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardLayout>{children}</DashboardLayout>
    </HydrationBoundary>
  );
};
export default StudentProfileLayout;
