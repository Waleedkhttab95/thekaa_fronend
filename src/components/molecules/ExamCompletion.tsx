"use client";
import { useState, useEffect } from "react";
import { Button } from "../atoms/button";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "./card";
import robotIcon from "../../../public/robot-icon.svg";
import complete from "../../../public/complete.svg";
import arrow from "../../../public/arrow.svg";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ProtectedRoutes } from "@/config/routes";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import { getCookie } from "cookies-next/client";
import { useStudent } from "@/hooks/rqs/students";

type ExamCompletionState = "analyzing" | "completed";

interface ExamCompletionProps {
  initialState?: ExamCompletionState;
}

export function ExamCompletion({
  initialState = "analyzing",
}: ExamCompletionProps) {
  const t = useTranslations("testPage");
  const [state, setState] = useState<ExamCompletionState>(initialState);

  useEffect(() => {
    if (state === "analyzing") {
      const timer = setTimeout(() => setState("completed"), 18000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const axiosAuth = useAxiosAuth();
  const studentId = getCookie("current_user") as string;
  const { data: studentData } = useStudent(axiosAuth, studentId as string);

  return (
    <Card
      variant="default"
      className="h-[450px] xl:w-[787px] xl:h-[532px] md:w-[75%] sm:w-[75%] flex justify-center items-center flex-col gap-12 mx-auto"
    >
      <CardContent className="flex flex-col justify-center items-center gap-4">
        {state === "analyzing" ? (
          <div className="w-full h-full flex flex-col justify-center items-center gap-4">
            <Image src={robotIcon} alt="AI Robot" width={64} height={64} />
            <h2 className="text-3xl font-pingar font-bold">
              {t("levelLoading")}...
            </h2>
            <p className="font-pingar font-medium max-w-[670px] max-h-[116px] text-center">
              {t("levelMessage", { firstName: studentData?.firstName })}
            </p>
          </div>
        ) : (
          <div className="xl:w-full h-full flex flex-col justify-center items-center text-center gap-3">
            <Image src={complete} alt="Completed" width={80} height={80} />
            <h2 className="font-pingar font-bold text-[28px]">{t("done")} !</h2>
            <CardFooter>
              <Link href={`${ProtectedRoutes.Dashboard}`}>
                <Button
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
                    className={"ltr:scale-x-[-1]"}
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
