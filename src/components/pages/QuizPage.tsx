"use client";

import { Button } from "@/components/atoms/button";
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
import Timer from "../molecules/timer";
import { useQuiz } from "@/hooks/useQuiz";
import { TextChoiceQuestion } from "../molecules/textChoiceQuestion";
import { ResultBox } from "../molecules/QuizResult";
import LoadingDots from "../atoms/loadingDots";

export default function TestPage() {
  const t = useTranslations("testPage");
  const t2 = useTranslations("quiz");

  const {
    questions,
    timeLimit,
    currentQuestionIndex,
    selectedAnswers,
    isCompleted,
    isCreatingQuiz,
    isLoadingQuestions,
    isSubmitting,
    error,
    handleAnswerSelect,
    handleNext,
    handleTimerComplete,
    result,
  } = useQuiz();

  if (isCreatingQuiz || isLoadingQuestions) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <p className="text-lg font-medium">{t2("loadingQuestions")}</p>
        <LoadingDots />
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <Card className="bg-[url('/student-profile-bg.png')] bg-cover rounded-[40px]">
        <div className="flex justify-center items-center min-h-[500px]">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">
              {error || "Failed to load quiz questions"}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const subject = "الرياضيات";

  return (
    <>
      {isCompleted ? (
        <ResultBox open={isCompleted} score={Number(result)} />
      ) : (
        <Card
          variant="default"
          className="bg-[url('/student-profile-bg.png')] bg-cover rounded-[40px] space-y-5 relative min-h-[744px] flex flex-col"
        >
          <CardHeader className="flex flex-row align-top mt-8 max-w-[1030px] justify-between w-full items-center px-4 py-4 self-center mb-7">
            <div className="flex flex-col gap-4">
              <CardDescription>
                {t("question")} {currentQuestionIndex + 1} {t("of")}{" "}
                {questions.length}
              </CardDescription>
              <CardTitle className="font-pingar font-bold text-2xl">
                {t2("subject", { subject })}
              </CardTitle>
            </div>
            <Timer minutes={timeLimit} onComplete={handleTimerComplete} />
          </CardHeader>

          <CardContent className="flex justify-center self-center font-xl mb-4">
            <TextChoiceQuestion
              question={currentQuestion}
              selectedAnswer={selectedAnswers[currentQuestion.id] || null}
              onSelectAnswer={handleAnswerSelect}
              background="white"
              className="text-xl font-medium font-pingar"
              titleStyle="self-center text-[22px] mb-9"
            />
          </CardContent>

          <CardFooter className="flex flex-row justify-end w-[90%]">
            <Button
              onClick={handleNext}
              type="submit"
              disabled={!selectedAnswers[currentQuestion.id] || isSubmitting}
              className="text-[16px] font-pingar font-bold w-[193px] h-[56px] flex flex-row justify-center items-center text-start select-none self-end"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <>
                  {isLastQuestion ? <>{t("finishExam")}</> : <>{t("next")}</>}
                  <Image
                    src="/arrow.svg"
                    alt="arrow"
                    width={17.5}
                    height={11.5}
                    className="ltr:scale-x-[-1] ml-2"
                  />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
