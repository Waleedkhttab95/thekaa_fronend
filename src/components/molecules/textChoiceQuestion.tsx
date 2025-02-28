import { Choice, TextChoice } from "@/types/question.types";
import { QuestionOption } from "./questionOption";

interface Props {
  question: TextChoice;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
}

export function TextChoiceQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
}: Props) {
  return (
    <div className="flex flex-col max-w-full w-[541px] text-start">
      <h2 className="text-lg font-tajawal font-medium mb-4">
        {question.question}
      </h2>
      {question.choices.map((choice: Choice) => (
        <QuestionOption
          key={choice.id}
          id={choice.id}
          text={choice.text}
          isSelected={selectedAnswer === choice.id}
          onSelect={() => onSelectAnswer(choice.id)}
        />
      ))}
    </div>
  );
}
