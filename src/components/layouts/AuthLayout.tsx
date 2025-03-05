import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../molecules/card";

type AuthLayoutProps = {
  headerTitle: ReactNode;
  headerSubTitle?: string;
  footerTitle?: ReactNode;
  className?: string;
  children: ReactNode;
};

const AuthLayout = ({
  headerTitle,
  headerSubTitle,
  footerTitle,
  className,
  children,
}: AuthLayoutProps) => {
  return (
    <Card
      className={`xl:w-[787px] flex flex-col justify-center items-center py-14 px-5 xl:px-0 ${className}`}
      variant="transparent"
    >
      <CardHeader className="justify-center items-center gap-y-2 mb-11 text-center">
        <CardTitle className="text-[28px]">{headerTitle}</CardTitle>
        <CardDescription className="text-lg">{headerSubTitle}</CardDescription>
      </CardHeader>
      <CardContent className="max-w-full">{children}</CardContent>
      {footerTitle && <CardFooter>{footerTitle}</CardFooter>}
    </Card>
  );
};
export default AuthLayout;
