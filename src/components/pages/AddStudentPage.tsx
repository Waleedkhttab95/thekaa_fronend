/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../molecules/card";
import Image from "next/image";
import AddStudentForm from "../organisms/AddStudentForm";
import { useMemo, useState } from "react";
import { Button } from "../atoms/button";
import Link from "next/link";
import { TFunctionType } from "@/types/common.type";
import { cn } from "@/lib/utils";
import { useStudentMutations } from "@/hooks/rqs/students";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import { IStudentData } from "@/types/student.type";
import { toast } from "../atoms/sooner";
import { useQueryClient } from "@tanstack/react-query";
import { STUDENTS_QUERY } from "@/config/qr.constants";
import { ProtectedRoutes } from "@/config/routes";
import { setCookie } from "cookies-next/client";

type getOuterStepsProps = {
  t: TFunctionType;
  onSubmit: (data: Partial<IStudentData>) => void;
  isPending: boolean;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  createdStudentId: string | null;
};
const getOuterSteps = ({
  t,
  setCurrentStep,
  onSubmit,
  isPending,
  createdStudentId,
}: getOuterStepsProps) => [
  {
    id: "initial_add_Student",
    title: t("addStudentInfoToThekaa"),
    description: t("addStudentInfoToThekaaDescription"),
    icon: "/assets/images/student.svg",
    content: (
      <Button
        className="w-full md:w-[55%] flex font-bold mx-auto "
        onClick={() => setCurrentStep((curr: number) => curr + 1)}
      >
        <Image
          src="/assets/images/icons/plus.svg"
          width={19}
          height={19}
          alt={t("startAddNewStudent")}
        />
        <span>{t("startAddNewStudent")}</span>
      </Button>
    ),
  },
  {
    id: "add_student_info",
    title: t("studentInfo"),
    description: t("addStudentInfo"),
    icon: "/assets/images/student.svg",
    content: <AddStudentForm onSubmit={onSubmit} isPending={isPending} />,
  },
  {
    id: "success_student_added",
    title: t("studentAddedSuccessfully"),
    description: t("StartLevelExam"),
    icon: "/assets/images/icons/complete.svg",
    content: (
      <div className="w-full flex  flex-col md:flex-row justify-between items-center gap-2 md:gap-5">
        <Link href={ProtectedRoutes.Test} className="block w-full">
          <Button
            className="w-full"
            onClick={() => {
              setCookie("current_user", createdStudentId, {
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
              });

              setCookie("assesment_test_status", false, {
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
              });
            }}
          >
            {t("start")}
          </Button>
        </Link>
        <Link href={ProtectedRoutes.SonsFiles} className=" block w-full">
          <Button className="w-full" variant="outline">
            {t("skip")}
          </Button>
        </Link>
      </div>
    ),
  },
];

export default function AddStudentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [createdStudentId, setCreatedStudentId] = useState<string | null>(null);
  const t = useTranslations("addStudentPage");
  const axiosAuth = useAxiosAuth();
  const { isPending, mutateAsync } = useStudentMutations(axiosAuth).create;
  const finish = () => setCurrentStep(2);
  const queryClient = useQueryClient();
  const submitFormData = async (data: Partial<IStudentData>) => {
    try {
      // data api
      const res = await mutateAsync(data);
      await queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY] });
      setCreatedStudentId(res._id);

      finish();
    } catch (error: any) {
      // toast
      toast({
        title: t("error.title"),
        description: t("error.description"),
        variant: "destructive",
      });
    }
  };
  const outerSteps = useMemo(
    () =>
      getOuterSteps({
        t,
        setCurrentStep,
        onSubmit: submitFormData,
        isPending,
        createdStudentId,
      }),
    [t, isPending]
  );
  const currentStepData = outerSteps[currentStep];

  return (
    <Card
      className={cn(
        "px-2 md:px-12 flex flex-col justify-center min-h-[440px] lg:px-24 xl:w-fit xl:min-w-[50%] md:w-[75%] w-[95%] mx-auto",
        currentStep === 0 ? "xl:w-[50%]" : ""
      )}
    >
      <CardHeader className="text-center mb-1 py-8">
        <Image
          src={currentStepData.icon}
          className="mx-auto mb-3"
          width={48}
          height={67}
          alt={t("studentInfo")}
        />
        <CardTitle className="text-2xl font-bold mb-4">
          {currentStepData.title}
        </CardTitle>
        <CardDescription className="text-gray-500 text-lg">
          {currentStepData.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="xl:min-w-max py-0">
        {currentStepData.content}
      </CardContent>
    </Card>
  );
}
