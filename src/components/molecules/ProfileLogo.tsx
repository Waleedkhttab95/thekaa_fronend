import Image from "next/image";
import { Button } from "../atoms/button";

const ProfileLogo = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <Button className="flex justify-center items-center h-14 w-14 py-1 bg-[#E7FEFD] rounded-full gap-2 text-black-500 border-white border-[1px] shadow-inner hover:bg-opacity-70 transition">
        <Image src={"/profile.svg"} alt="profile logo" width={24} height={24} />
      </Button>
      <p className="hidden md:block">{name}</p>
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
