import Image from "next/image";
import { Button } from "../atoms/button";
import Link from "next/link";
import { ProtectedRoutes } from "@/config/routes";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import { getCookie } from "cookies-next/client";
import { useStudent } from "@/hooks/rqs/students";

const ProfileLogo = () => {
  const axiosAuth = useAxiosAuth();
  const studentId = getCookie("current_user");
  const { data: studentData, isLoading: isStudentDataLoading } = useStudent(
    axiosAuth,
    studentId as string
  );
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <Button className="flex justify-center items-center h-14 w-14 py-1 bg-[#E7FEFD] rounded-full gap-2 text-black-500 border-white border-[1px] shadow-inner hover:bg-opacity-70 transition">
        <Link href={ProtectedRoutes.StudentProfile}>
          <Image
            src={"/profile.svg"}
            alt="profile logo"
            width={24}
            height={24}
          />
        </Link>
      </Button>
      <p className="hidden md:block">
        {isStudentDataLoading ? "..." : studentData?.firstName}
      </p>
      <Image
        className="hidden sm:block"
        src={"/arrow-angle-down.svg"}
        alt="arrow"
        width={24}
        height={24}
      />
    </div>
  );
};
export default ProfileLogo;
