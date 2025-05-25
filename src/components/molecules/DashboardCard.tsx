"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../atoms/button";
import { useLocale } from "next-intl";
import { Locales } from "@/types/locales.enum";
import { motion } from "framer-motion";

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
  disabled?: boolean;
  tooltip?: string;
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
  disabled,
  tooltip,
}: DashboardCardProps) => {
  const locale = useLocale();

  return (
    <div className="relative group">
      {tooltip && (
        <div
          className="absolute z-20 top-[35%] w-[50%] left-1/2 transform -translate-x-1/2 
          bg-gray-800 text-white text-lg text-center rounded py-1 px-3 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-200
          pointer-events-none"
        >
          {tooltip}
        </div>
      )}
      <motion.div
        initial={!disabled ? { opacity: 0, y: 30 } : false}
        animate={!disabled ? { opacity: 1, y: 0 } : false}
        transition={!disabled ? { duration: 0.8, ease: "easeOut" } : {}}
        whileHover="hover"
        variants={!disabled ? { hover: { scale: 1.02 } } : {}}
      >
        <Card
          variant={variant}
          className={cn(
            "relative min-h-[150px] min-w-[340px] sm:min-w-[33%] sm:max-w-[100%] flex flex-col pt-11 ps-11 overflow-hidden m-0 cursor-pointer",
            disabled && "opacity-50",
            tooltip && "opacity-50",
            className
          )}
        >
          {disabled && (
            <p className="absolute top-12 start-24 text-red-500">
              COMING SOON!
            </p>
          )}
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
              inLineIconText && "flex-row items-center mx-auto ms-[4em]"
            )}
          >
            <motion.div
              variants={
                !disabled && !tooltip ? { hover: { rotateX: 360 } } : {}
              }
              transition={!disabled ? { duration: 0.5, ease: "easeInOut" } : {}}
            >
              <Image
                className={cn(
                  locale === Locales.en && flipIcon && "scale-x-[-1]"
                )}
                src={iconPath}
                alt={`${alt} icon`}
                width={40}
                height={40}
              />
            </motion.div>

            <div
              className={cn(
                "font-bold sm:text-2xl",
                inLineIconText && "text-xs sm:text-2xl"
              )}
            >
              {text}
            </div>
          </div>

          {children && (
            <CardContent className="mt-6 w-[90%]">{children}</CardContent>
          )}

          {haveArrow && (
            <motion.div
              whileHover={!disabled ? { y: -3 } : {}}
              transition={
                !disabled ? { type: "spring", stiffness: 300, damping: 20 } : {}
              }
              className="absolute w-10 h-10 end-6 bottom-6 z-10"
            >
              <Button className="w-full h-full" disabled={disabled}>
                <Image
                  className={cn(
                    "absolute",
                    locale === Locales.en && "rotate-180"
                  )}
                  src={"./arrow.svg"}
                  alt="go to page"
                  width={24}
                  height={24}
                />
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardCard;
