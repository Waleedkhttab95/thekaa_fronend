"use client";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/atoms/button";
import { ExamCompletion } from "@/components/molecules/ExamCompletion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { useTranslations } from "next-intl";
import Loading from "../atoms/loading";
import Image from "next/image";

interface TestClientProps {
  currentQuestion: string;
  isCompleted: boolean;
  isAnalyzing: boolean;
  report: string | null;
  methods: any;
  handleNext: () => void;
}

export default function TestClient({
  currentQuestion,
  isCompleted,
  isAnalyzing,
  report,
  methods,
  handleNext,
}: TestClientProps) {
  const t = useTranslations("testPage");

  if (isAnalyzing) {
    return <ExamCompletion initialState="analyzing" />;
  }
  if (isCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-10 p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">{t("interviewReport")}</CardTitle>
        </CardHeader>
        <CardContent>
         
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestion) {
    return <Loading />;
  }

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-w-2xl mx-auto mt-10 p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">{t("placementTest")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="mb-2 text-lg font-semibold bg-black text-white rounded-[12px] p-4 border border-[#222] shadow-sm flex items-center gap-3">
              <Image src="/assets/images/icons/robot.svg" alt="AI" width={32} height={32} />
              <span>{currentQuestion}</span>
            </div>
            <textarea
              {...methods.register("answer", { required: true })}
              className="w-full h-[120px] p-4 border rounded-[20px] resize-none text-base font-normal bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#23F6F0]"
              placeholder={t("typeYourAnswer")}
              maxLength={1000}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end mt-4">
          <Button
            type="button"
            onClick={handleNext}
            className="text-[16px] font-pingar font-bold w-[193px] h-[56px] flex flex-row justify-center items-center text-start select-none"
          >
            {t("next")}
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
