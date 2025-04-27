import Image from "next/image";
import { ImageWithTextChoices } from "@/types/question.types";
import { QuestionOption } from "./questionOption";

interface Props {
  question: ImageWithTextChoices;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
  img: string;
}

export function ImageWithChoicesQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
  img,
}: Props) {
  return (
    <div className="w-full h-full flex flex-col gap-8 text-start justify-center">
      <h2 className="text-xl font-pingar font-bold">{question.question}</h2>

      <div className="flex flex-col xl:flex-row-reverse justify-center gap-12 items-center">
        <Image
          src={img}
          alt="Main Question Image"
          width={456}
          height={355}
          className="rounded-[20px] object-cover"
        />

        <div className="xl:w-[541px] w-[75%] max-w-full h-full flex flex-col">
          {question.options.map((choice) => (
            <QuestionOption
              key={choice.id}
              id={choice.id}
              text={choice.text}
              isSelected={selectedAnswer === choice.id}
              onSelect={() => onSelectAnswer(choice.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
