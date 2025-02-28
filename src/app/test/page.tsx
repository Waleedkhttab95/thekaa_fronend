"use client";

import { useState } from "react";
import mockQuestions from "./mockQuestions.json";
import { Button } from "@/components/atoms/button";
import { Question } from "@/types/question.types";
import { Questions } from "@/components/organisms/Questions";
import { ExamCompletion } from "@/components/molecules/ExamCompletion";
import arrow from "../../../public/arrow.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import Image from "next/image";

export default function TestPage() {
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

  const handleNext = () => {
    if (currentQuestion.type === "fill" && !answer.trim()) return;
    if (!selectedAnswers[currentQuestion.id] && currentQuestion.type !== "fill")
      return;

    if (isLastQuestion) {
      setIsCompleted(true);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setAnswer("");
  };

  return (
    <div className="p-4 bg-blue-300">
      <div className="container mx-auto flex justify-center items-center min-h-screen">
        {isCompleted ? (
          <ExamCompletion />
        ) : (
          <Card
            variant="default"
            className="w-[1141px] max-h-[770] max-w-full p-8"
          >
            <CardHeader>
              <CardDescription>
                سؤال {currentQuestionIndex + 1} من {questions.length}
              </CardDescription>
              <CardTitle className="font-pingar font-bold text-2xl">
                إختبار تحديد المستوى
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Questions
                question={currentQuestion}
                selectedAnswer={selectedAnswers[currentQuestion.id]}
                onSelectAnswer={handleAnswerSelect}
                answer={answer}
                setAnswer={setAnswer}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={handleNext}
                disabled={
                  currentQuestion.type === "fill"
                    ? !answer.trim()
                    : !selectedAnswers[currentQuestion.id]
                }
                className="text-[16px] font-pingar font-bold w-[193px] h-[56px] flex flex-row justify-center items-center text-start"
              >
                {isLastQuestion ? "إنهاء الإختبار" : "التالي"}
                <Image
                  src={arrow}
                  alt="arrow"
                  width={17.5}
                  height={11.5}
                  color="white"
                ></Image>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
