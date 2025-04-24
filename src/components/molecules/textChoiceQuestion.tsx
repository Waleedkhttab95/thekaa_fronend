import { Choice, TextChoice } from "@/types/question.types";
import { QuestionOption } from "./questionOption";
import { ReactNode } from "react";

interface Props {
  question: TextChoice;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
  background?: "transparent" | "white" | string;
  className?: string;
  children?: ReactNode;
  titleStyle?: string;
}

export function TextChoiceQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
  background = "transparent",
  className = "",
  children,
  titleStyle = "",
}: Props) {
  return (
    <div
      className={`
        flex flex-col max-w-full w-[541px] text-start
        ${className}
      `}
    >
      <h2 className={`text-lg font-tajawal font-bold mb-4 ${titleStyle}`}>
        {question.question}
      </h2>
      {question.choices.map((choice: Choice) => (
        <QuestionOption
          key={choice.id}
          id={choice.id}
          text={choice.text}
          isSelected={selectedAnswer === choice.id}
          onSelect={() => onSelectAnswer(choice.id)}
          background={background}
          className={`${background === "white" ? "bg-white" : ""}`}
        />
      ))}
      {children}
    </div>
  );
}
