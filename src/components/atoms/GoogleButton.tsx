import Image from "next/image";
import { Button } from "./button";
import GoogleIcon from "../../../public/google-icon.svg";

const GoogleButton = () => {
  return (
    <Button variant="google">
      <Image src={GoogleIcon} alt="Google Logo" width={56} height={56} />
    </Button>
  );
};

export default GoogleButton;
