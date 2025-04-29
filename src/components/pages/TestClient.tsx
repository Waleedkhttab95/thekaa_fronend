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
import { useState } from "react";

interface TestClientProps {
  questions: Question[];
  data: levelAssessment;
}

export default function TestClient({ questions, data }: TestClientProps) {
  const t = useTranslations("testPage");
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const {
    methods,
    currentQuestionIndex,
    currentQuestion,
    isLastQuestion,
    isCompleted,
    isSubmitting,
    currentAnswer,
    handleAnswerSelect,
    handleFillAnswer,
    handleNext,
  } = useTest(questions, data);

  const isAnswerRequired =
    currentQuestion?.type === "fill" ? !currentAnswer.trim() : !currentAnswer;

  if (questions.length === 0) {
    return <p className="text-center mt-10 text-red-500">Error Loading...</p>;
  }

  const checkAnswer = () => {
    if (isAnswerRequired) {
      setShowValidationMessage(true);
      setTimeout(() => setShowValidationMessage(false), 1000);
      return;
    }
  };

  return (
    <FormProvider {...methods}>
      {isCompleted ? (
        <ExamCompletion />
      ) : (
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
              onSubmitQuestion={handleNext}
            />

            {showValidationMessage && (
              <div className="absolute top-[50%] mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center mb-4">
                <span>
                  {currentQuestion.type === "fill"
                    ? "Please enter your answer before continuing"
                    : "Please select an answer before continuing"}
                </span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              form={`question-form-${currentQuestion.id}`}
              onClick={checkAnswer}
              className="text-[16px] font-pingar font-bold w-[193px] h-[56px] flex flex-row justify-center items-center text-start select-none"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : isLastQuestion ? (
                <>{t("finishExam")}</>
              ) : (
                <>{t("next")}</>
              )}
              <Image
                src={"/arrow.svg"}
                width={24}
                height={24}
                alt="next"
                className="ms-2"
              />
            </Button>
          </CardFooter>
        </Card>
      )}
    </FormProvider>
  );
}
