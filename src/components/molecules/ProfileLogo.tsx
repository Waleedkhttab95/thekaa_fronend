import React from "react";
import Image from "next/image";
import { Button } from "../atoms/button";
import { useRouter } from "next/navigation";
import { ProtectedRoutes } from "@/config/routes";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import { getCookie } from "cookies-next/client";
import { useStudent } from "@/hooks/rqs/students";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/atoms/dropdown-menu";

const ProfileLogo = () => {
  const axiosAuth = useAxiosAuth();
  const studentId = getCookie("current_user");
  const { data: studentData, isLoading: isStudentDataLoading } = useStudent(
    axiosAuth,
    studentId as string
  );
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
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
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(ProtectedRoutes.SonsFiles)}
        >
          Sons Files
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(ProtectedRoutes.Reports)}>
          Reports
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            router.push(`${ProtectedRoutes.EditStudent}/${studentId}`)
          }
        >
          Edit Student
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileLogo;
