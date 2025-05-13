"use client";

import React, { useState } from "react";
import { setCookie } from "cookies-next/client";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { PencilLineIcon } from "lucide-react";
import { getAvatarInitials } from "@/utils/avatar";
import { IStudentData } from "@/types/student.type";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../atoms/tooltip";
import { useTranslations } from "next-intl";
import { ProtectedRoutes } from "@/config/routes";
import { useCheckStudentAssesmentStatus } from "@/hooks/rqs/assessmentTest";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../atoms/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../atoms/button";
import Image from "next/image";

type props = {
  son: IStudentData;
  isOpen: boolean;
};
const SonAvatar = ({ son, isOpen = false }: props) => {
  const [takeTest, setTakeTest] = useState(false);
  const router = useRouter();
  const t = useTranslations("common");
  const dialogT = useTranslations("SonsStudentsManagementPage");
  const axiosAuth = useAxiosAuth();
  const onEditClick = () => {
    router.push(`${ProtectedRoutes.EditStudent}/${son._id}`);
  };

  const { data: assesmentTestStatus, isLoading: CheckingAssesmentTestStatus } =
    useCheckStudentAssesmentStatus(axiosAuth, son._id);

  const handleChooseProfile = () => {
    if (!isOpen) {
      if (!CheckingAssesmentTestStatus) {
        setCookie("current_user", son._id, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        setCookie("assesment_test_status", assesmentTestStatus, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        if (assesmentTestStatus) {
          router.push(ProtectedRoutes.Dashboard);
        } else {
          setTakeTest(true);
        }
      }
    }
  };

  return (
    <>
      <Dialog open={takeTest} onOpenChange={setTakeTest}>
        <DialogContent className="h-72 flex flex-col items-center justify-center gap-5">
          <Image src={"robot-icon.svg"} alt="robot" width={80} height={80} />
          <DialogHeader className="flex items-center">
            <DialogDescription className="font-bold">
              {dialogT("youNeedToTakeTheTest")}
            </DialogDescription>
            <DialogTitle className="hidden">
              {dialogT("youHaventTakenTheTest")}
            </DialogTitle>
            <div className="h-5/6 w-full flex items-end justify-evenly">
              <Button
                className="min-w-24"
                onClick={() => {
                  router.push(ProtectedRoutes.Test);
                }}
              >
                {dialogT("takeTheTestNow")}
              </Button>
              <Button
                variant={"destructive"}
                className="min-w-24"
                onClick={() => setTakeTest(false)}
              >
                {dialogT("cancel")}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div
        className={cn(
          "flex flex-col items-center justify-center py-6 pt-0",
          CheckingAssesmentTestStatus && "opacity-50"
        )}
      >
        <div className="relative group">
          <div
            className={cn(
              "relative mb-3 w-[169px] h-[169px] rounded-full overflow-hidden shadow-xl cursor-pointer",
              CheckingAssesmentTestStatus && "cursor-wait"
            )}
            onClick={handleChooseProfile}
          >
            <Avatar className="w-full  h-full">
              <AvatarImage
                src={
                  son.profileImage || "/assets/images/avatar-placeholder.jpg"
                }
                alt="Profile picture"
              />
              <AvatarFallback className="text-2xl">
                {getAvatarInitials(son.firstName + " " + son.lastName)}
              </AvatarFallback>
            </Avatar>
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      "absolute inset-0 flex items-center justify-center bg-black/40  transition-display",
                      isOpen ? "flex" : "hidden"
                    )}
                    onClick={() => onEditClick()}
                    type="button"
                  >
                    <PencilLineIcon className="size-[19px] text-white" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{t("edit")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <h1 className="text-center text-xl font-bold">{son.firstName}</h1>
        </div>
      </div>
    </>
  );
};

export default SonAvatar;
