import LogoutButton from "@/components/atoms/LogoutButton";
import MainLayout from "@/components/layouts/MainLayout";
import { ProtectedRoute } from "@/components/layouts/ProtectedRoute";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import Link from "next/link";
// import ThemeSwitcher from '@/components/atoms/ThemeSwitcher';

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: "Home | Thekaa",
    },
    ar: { title: "ذكاء | الرئيسية" },
  };
  return metadataTranslations[locale];
}
export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <ProtectedRoute>
      <MainLayout>
        {" "}
        <LogoutButton />
        <div>
          <h1 className="text-red-600 dark:text-yellow-400">{t("base")}</h1>
          <br />
          {/* <ThemeSwitcher /> */}
          <br />
          {/* using next/link for non-localized routes */}
          <Link href="/dashboard"> dashboard</Link>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-pingar font-medium">بيزووو</h1>
          <h1 className="font-ibm font-regular">بيزووو</h1>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
