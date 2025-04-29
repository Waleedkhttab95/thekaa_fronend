"use client";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ReactNode } from "react";
import { Locales } from "@/types/locales.enum";
import LocaleSwitcher from "../molecules/LocaleSwitcher";
import ProfileLogo from "../molecules/ProfileLogo";
import { Button } from "../atoms/button";
import { useProfile } from "@/hooks/rqs/profile";
import Link from "next/link";
import { ProtectedRoutes } from "@/config/routes";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const locale = useLocale();
  const t = useTranslations("dashboardLayout");
  const { data: profile } = useProfile();
  return (
    <div className="flex flex-col items-center pt-10 min-h-screen overflow-x-hidden">
      <div
        className="bg-[linear-gradient(to_right,_#23F6F04D_0%,_#CBBDF24D_50%,_#F7AEF34D_100%)] 
        w-11/12 sm:w-10/12 rounded-[40px] h-20 px-8 max-w-[1300px] min-w-[310px] flex justify-between"
      >
        <Link href={"/"} className="flex items-center justify-center">
          {locale === Locales.ar ? (
            <Image
              className="hidden sm:block"
              src={"/assets/images/ar-logo.svg"}
              alt="logo"
              width={94}
              height={26}
            />
          ) : (
            <Image
              className="hidden sm:block"
              src={"/assets/images/en-logo.svg"}
              alt="logo"
              width={94}
              height={26}
            />
          )}
        </Link>
        <div className="flex items-center gap-3 justify-evenly sm:justify-start w-full sm:w-auto">
          <LocaleSwitcher onlySmall />
          <ProfileLogo name={profile?.parentName?.split(" ")![0] ?? "??"} />
          <Link href={ProtectedRoutes.Dashboard}>
            <Button className="sm:w-48 text-base">
              <Image
                src={"/dashboard-circle.svg"}
                alt="dashboard"
                width={24}
                height={24}
              />
              <p className="hidden sm:block">{t("dashboard")}</p>
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-16 mb-36 w-11/12 sm:w-10/12 max-w-[1300px] min-w-[310px] min-h-[calc(100vh-352px)]">
        {children}
      </div>
      <div className="h-16 bg-[#23f6f0] flex justify-between items-center p-4 sm:px-24 min-w-[100vw]">
        {locale === Locales.ar ? (
          <Image
            src={"/assets/images/ar-logo.svg"}
            alt="logo"
            width={94}
            height={26}
          />
        ) : (
          <Image
            src={"/assets/images/en-logo.svg"}
            alt="logo"
            width={94}
            height={26}
          />
        )}
        <p>
          {t("allRights")} {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};
export default DashboardLayout;
