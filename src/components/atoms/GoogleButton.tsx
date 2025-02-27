import { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import { Button } from "./button";
import GoogleIcon from "../../../public/google-icon.svg";

const GoogleButton = ({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button variant="google" {...props}>
      <Image src={GoogleIcon} alt="Google Logo" width={56} height={56} />
    </Button>
  );
};

export default GoogleButton;
