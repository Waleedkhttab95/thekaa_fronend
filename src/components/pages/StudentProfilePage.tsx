import Image from "next/image";
import { Button } from "../atoms/button";
import EditProfileForm from "../organisms/EditProfileForm";

const StudentProfilePage = () => {
  return (
    <div className="bg-[url('/student-profile-bg.png')] bg-cover rounded-[40px] h-[744px] relative flex flex-col items-center justify-center">
      <Button
        className="absolute top-10 end-10 w-14 h-14 border border-red-500 bg-white"
        variant={"secondary"}
      >
        <Image src={"/delete.svg"} alt="delete" width={24} height={24} />
      </Button>
      <EditProfileForm />
    </div>
  );
};
export default StudentProfilePage;
