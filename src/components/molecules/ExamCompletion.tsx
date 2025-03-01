"use client";
import { useState, useEffect } from "react";
import { Button } from "../atoms/button";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "./card";
import robotIcon from "../../../public/robot-icon.svg";
import complete from "../../../public/complete.svg";
import arrow from "../../../public/arrow.svg";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function ExamCompletion() {
  const t = useTranslations("testPage");
  const locale = useLocale();
  const [state, setState] = useState<"analyzing" | "completed">("analyzing");

  useEffect(() => {
    const timer = setTimeout(() => setState("completed"), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      variant="default"
      className="h-[450px] w-[100vw] xl:w-[787px] xl:h-[532px]  flex justify-center items-center flex-col gap-12 mx-auto"
    >
      <CardContent className="flex flex-col justify-center items-center gap-4">
        {state === "analyzing" ? (
          <div className="w-full h-full flex flex-col justify-center items-center gap-4">
            <Image src={robotIcon} alt="AI Robot" width={64} height={64} />
            <h2 className="text-3xl font-pingar font-bold">
              {t("levelLoading")}...
            </h2>
            <p className="font-pingar font-medium max-w-[670px] max-h-[116px] text-center">
              {t("levelMessage")}
            </p>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center gap-3">
            <Image src={complete} alt="Completed" width={80} height={80} />
            <h2 className="font-pingar font-medium text-[28px]">{t("done")}</h2>
            <CardFooter>
              <Link href={"/dashboard"}>
                <Button
                  onClick={() => {}}
                  variant="default"
                  className="w-[264px] h-[56px] font-bold bg-gray-900 hover:bg-gray-800 text-[#E7FEFD] mt-12 select-none"
                >
                  {t("goToDashboard")}
                  <Image
                    src={arrow}
                    alt="arrow"
                    width={17.5}
                    height={11.5}
                    color="white"
                    className={locale === "en" ? "scale-x-[-1]" : ""}
                  ></Image>
                </Button>
              </Link>
            </CardFooter>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
