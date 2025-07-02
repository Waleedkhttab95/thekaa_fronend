import React from "react";
import Image from "next/image";
import { Button } from "../atoms/button";
import { useRouter } from "next/navigation";
import { ProtectedRoutes } from "@/config/routes";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import { getCookie } from "cookies-next";
import { useStudent } from "@/hooks/rqs/students";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/atoms/dropdown-menu";
import { useTranslations } from "next-intl";
import { logout } from "@/services/auth";

const ProfileLogo = () => {
  const axiosAuth = useAxiosAuth();
  const studentId = getCookie("current_user");
  const { data: studentData, isLoading: isStudentDataLoading } = useStudent(
    axiosAuth,
    studentId as string
  );
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("dropDownItems");

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer group hover:opacity-80 transition-shadow select-none">
          <Button className="flex justify-center items-center h-14 w-14 py-1 bg-[#E7FEFD] rounded-full gap-2 text-black-500 border-white border-[1px] shadow-inner hover:bg-opacity-70 transition">
            <Image
              src={"/profile.svg"}
              alt="profile logo"
              width={24}
              height={24}
            />
          </Button>
          <p className="hidden md:block">
            {isStudentDataLoading ? "..." : studentData?.firstName}
          </p>
          <Image
            className="hidden sm:block transition-transform duration-200"
            src={"/arrow-angle-down.svg"}
            alt="arrow"
            width={24}
            height={24}
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[150px] text-start flex flex-col items-center"
        align="center"
      >
        <DropdownMenuItem
          onClick={() => router.push(ProtectedRoutes.SonsFiles)}
          dir="center"
          className="transition duration-200 hover:bg-primary/10 hover:text-primary cursor-pointer w-full justify-center border-b-2"
        >
          {t("sonsFiles")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(ProtectedRoutes.Reports)}
          className="transition duration-200 hover:bg-primary/10 hover:text-primary cursor-pointer w-full justify-center border-b-2"
        >
          {t("reports")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            router.push(`${ProtectedRoutes.EditStudent}/${studentId}`)
          }
          className="transition duration-200 hover:bg-primary/10 hover:text-primary cursor-pointer w-full justify-center border-b-2"
        >
          {t("editStudent")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="transition duration-200 hover:bg-red-100 hover:text-red-600 cursor-pointer w-full justify-center"
        >
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileLogo;
