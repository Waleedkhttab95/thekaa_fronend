import { ReactNode } from "react";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../atoms/button";
import { useLocale } from "next-intl";
import { Locales } from "@/types/locales.enum";

type DashboardCardProps = {
  children?: ReactNode;
  text: string;
  variant: "blue" | "pink";
  className?: string;
  imageClassName?: string;
  left?: boolean;
  haveArrow?: boolean;
  iconPath: string;
  alt?: string;
  flipIcon?: boolean;
  inLineIconText?: boolean;
};
const DashboardCard = ({
  children,
  text,
  variant,
  className,
  imageClassName,
  left,
  haveArrow,
  iconPath,
  alt,
  flipIcon,
  inLineIconText,
}: DashboardCardProps) => {
  const locale = useLocale();

  return (
    <Card
      variant={variant}
      className={cn(
        "relative min-h-[150px] min-w-[420px] flex flex-col pt-11 ps-11 overflow-hidden m-0",
        className
      )}
    >
      <Image
        className={cn(
          "absolute top-0",
          left ? "end-0" : "start-0",
          imageClassName
        )}
        src={"./dashboard-card-circle.svg"}
        alt="logo"
        width={170}
        height={166}
      />
      <div
        className={cn(
          "max-h-24 flex flex-col gap-3 z-10",
          inLineIconText && "flex-row  items-center "
        )}
      >
        <Image
          className={cn(locale === Locales.en && flipIcon && "scale-x-[-1]")}
          src={iconPath}
          alt={`${alt} icon`}
          width={40}
          height={40}
        />
        <div className="font-bold text-2xl">{text}</div>
      </div>
      {children && (
        <CardContent className="mt-6 w-[90%]">
          {children}
        </CardContent>
      )}
      {haveArrow && (
        <Button className="absolute w-10 h-10 end-10 bottom-6 z-10">
          <Image
            className={cn("absolute", locale === Locales.en && "rotate-180")}
            src={"./arrow.svg"}
            alt="go to page"
            width={24}
            height={24}
          />
        </Button>
      )}
    </Card>
  );
};
export default DashboardCard;
