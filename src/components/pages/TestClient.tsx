"use client";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/atoms/button";
import { Question } from "@/types/question.types";
import { Questions } from "@/components/organisms/Questions";
import { ExamCompletion } from "@/components/molecules/ExamCompletion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTest } from "@/hooks/useTest";
import { levelAssessment } from "@/types/assessmentTest";
import { toast } from "../atoms/sooner";
import { useRouter } from "next/navigation";
import Loading from "../atoms/loading";
import { ProtectedRoutes } from "@/config/routes";
import { useEffect, useRef } from "react";

interface TestClientProps {
  questions: Question[];
  data: levelAssessment;
}

export default function TestClient({ questions, data }: TestClientProps) {
  const t = useTranslations("testPage");
  const router = useRouter();
  const hasShownErrorToast = useRef(false);

  const {
    methods,
    currentQuestionIndex,
    currentQuestion,
    isLastQuestion,
    isCompleted,
    isAnalyzing,
    currentAnswer,
    handleAnswerSelect,
    handleFillAnswer,
    handleNext,
  } = useTest(questions, data);

  useEffect(() => {
    if (questions.length === 0 && !hasShownErrorToast.current) {
      hasShownErrorToast.current = true;
      toast({
        title: t("failed"),
        description: t("errorLoading"),
        variant: "destructive",
      });
      setTimeout(() => {
        router.push(ProtectedRoutes.SonsFiles);
      }, 1500);
    }
  }, [questions.length, t, router]);

  const isAnswerRequired =
    currentQuestion?.type === "fill" ? !currentAnswer.trim() : !currentAnswer;

  if (questions.length === 0) {
    return <Loading />;
  }

  const checkAnswer = () => {
    if (isAnswerRequired) {
      toast({
        title:
          currentQuestion?.type === "fill"
            ? t("missingFill")
            : t("missingSelect"),
        variant: "destructive",
      });
      return;
    }
    handleNext();
  };

  if (isAnalyzing || isCompleted) {
    return (
      <ExamCompletion initialState={isCompleted ? "completed" : "analyzing"} />
    );
  }

  return (
    <FormProvider {...methods}>
      <Card
        variant="default"
        className="relative xl:w-[1141px] md:w-[75%] w-[95%] max-h-[770] max-w-full p-8 flex flex-col justify-center self-center mx-auto"
      >
        <CardHeader>
          <CardDescription>
            {t("question")} {currentQuestionIndex + 1} {t("of")}{" "}
            {questions.length}
          </CardDescription>
          <CardTitle className="font-pingar font-bold text-2xl">
            {t("placementTest")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Questions
            question={currentQuestion}
            selectedAnswer={currentAnswer}
            onSelectAnswer={handleAnswerSelect}
            answer={currentAnswer}
            setAnswer={handleFillAnswer}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            form={`question-form-${currentQuestion.id}`}
            onClick={checkAnswer}
            className="text-[16px] font-pingar font-bold w-[193px] h-[56px] flex flex-row justify-center items-center text-start select-none"
          >
            {isLastQuestion ? <>{t("finishExam")}</> : <>{t("next")}</>}
            <Image
              src={"/arrow.svg"}
              width={24}
              height={24}
              alt="next"
              className="ms-2 ltr:scale-x-[-1]"
            />
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
