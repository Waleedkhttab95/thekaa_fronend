import Image from "next/image";
import { Button } from "./button";
import GoogleIcon from "../../../public/google-icon.svg"; // Imported as an image

const GoogleLoginButton = () => {
  return (
    <Button variant="google" className="md:w-[487px] h-[56px]">
      <Image src={GoogleIcon} alt="Google Logo" width={56} height={56} />
    </Button>
  );
};

export default GoogleLoginButton;
