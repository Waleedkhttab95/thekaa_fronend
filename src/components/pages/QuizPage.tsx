"use client";

import { useState } from "react";
import mockQuestions from "../../app/(protected)/(main)/test/mockQuestions.json";
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
import Timer from "../molecules/timer";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();

  const t = useTranslations("testPage");
  const t2 = useTranslations("quizPage");
  const questions = mockQuestions as Question[];
  const [answer, setAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (questions.length === 0) {
    return <p className="text-center mt-10 text-red-500">Error Loading...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex] as Question;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerId,
    }));
  };

  const startTime = Date.now();
  let timeTaken = 0;

  const handleNext = () => {
    if (currentQuestion.type === "fill" && !answer.trim()) return;
    if (!selectedAnswers[currentQuestion.id] && currentQuestion.type !== "fill")
      return;

    if (isLastQuestion) {
      setIsCompleted(true);
      timeTaken = Math.floor((Date.now() - startTime) / 1000);
      console.log("Time taken:", timeTaken);
      router.push("/dashboard");
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setAnswer("");
  };
  const handleTimerComplete = () => {
    alert("Timer finished!");
    router.push("/dashboard");
  };

  const subject = "الكيمياء";

  return (
    <>
      {isCompleted ? (
        <ExamCompletion />
      ) : (
        <Card
          variant="default"
          className="bg-[url('/student-profile-bg.png')] bg-cover rounded-[40px] sapce-y-5 relative min-h-[744px] flex flex-col"
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
            <Timer minutes={1} onComplete={handleTimerComplete} />
          </CardHeader>
          <CardContent className="flex justify-center self-center font-xl mb-4">
            <Questions
              question={currentQuestion}
              selectedAnswer={selectedAnswers[currentQuestion.id]}
              onSelectAnswer={handleAnswerSelect}
              answer={answer}
              background={"white"}
              setAnswer={setAnswer}
              className="text-xl font-medium font-pingar"
              titleStyle="self-center text-[22px] mb-9"
            />
          </CardContent>
          <CardFooter className="flex flex-row justify-end w-[90%]">
            <Button
              onClick={handleNext}
              disabled={
                currentQuestion.type === "fill"
                  ? !answer.trim()
                  : !selectedAnswers[currentQuestion.id]
              }
              className="text-[16px] font-pingar font-bold w-[193px] h-[56px] flex flex-row justify-center items-center text-start select-none self-end"
            >
              {isLastQuestion ? <>{t("finishExam")}</> : <>{t("next")}</>}
              <Image
                src={"/arrow.svg"}
                alt="arrow"
                width={17.5}
                height={11.5}
                color="white"
                className={"ltr:scale-x-[-1]"}
              ></Image>
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
