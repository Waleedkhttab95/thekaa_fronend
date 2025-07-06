"use client";

import { Question } from "@/types/question.types";
import { TextChoiceQuestion } from "../molecules/textChoiceQuestion";
import { ImageChoiceQuestion } from "../molecules/ImageChoiceQuestion";
import { ImageWithChoicesQuestion } from "../molecules/ImageWithChoicesQuestion";
import { FillQuestion } from "../molecules/FillQuestion";
import { ImagesAndChoicesQuestion } from "../molecules/ImagesAndChoicesQuestions";

interface QuestionsProps {
  question: Question;
  answer: string;
  setAnswer: (value: string) => void;
  background?: "transparent" | string;
  className?: string;
  titleStyle?: string;
}

export function Questions({
  question,
  answer,
  setAnswer,
  background = "transparent",
  className = "",
  titleStyle = "",
}: QuestionsProps) {
  return (
    <form
      id={`question-form-${question?.id}`}
      onSubmit={(e) => e.preventDefault()}
      className="w-full flex flex-col items-center justify-center"
    >
      <h2 className={`text-lg font-tajawal font-bold mb-4 ${titleStyle}`}>{question?.question}</h2>
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        className="w-full max-w-2xl h-[120px] p-4 border rounded-[20px] resize-none text-base font-normal bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#23F6F0]"
        placeholder="أدخل إجابتك هنا..."
        maxLength={1000}
      />
    </form>
  );
}
