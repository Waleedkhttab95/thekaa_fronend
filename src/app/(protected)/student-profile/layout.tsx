import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";

const StudentProfileLayout = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={dir}>
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
};
export default StudentProfileLayout;
