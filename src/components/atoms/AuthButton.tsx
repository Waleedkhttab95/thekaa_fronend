import Image from "next/image";
import { Button } from "./button";
import GoogleIcon from "../../../public/google-icon.svg";
import { ReactNode } from "react";

const GetAuthButton = ({
  authButtonType,
  children,
}: {
  authButtonType: "basic" | "google";
  children?: ReactNode;
}) => {
  return authButtonType === "basic" ? (
    <Button className="w-[220px] sm:w-[300px] md:w-[487px] h-[56px] text-base">
      {children}
    </Button>
  ) : (
    <Button
      variant="google"
      className="w-[220px] sm:w-[300px] md:w-[487px] h-[56px]"
    >
      <Image src={GoogleIcon} alt="Google Logo" width={56} height={56} />
    </Button>
  );
};

const AuthButton = ({
  children,
  authButtonType,
}: {
  children?: ReactNode;
  authButtonType: "basic" | "google";
}) => {
  return (
    <GetAuthButton authButtonType={authButtonType}>{children}</GetAuthButton>
  );
};

export default AuthButton;
