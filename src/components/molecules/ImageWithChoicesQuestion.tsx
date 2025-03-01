import Image from "next/image";
import { ImageWithTextChoices } from "@/types/question.types";
import { QuestionOption } from "./questionOption";

interface Props {
  question: ImageWithTextChoices;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
  img: any;
}

export function ImageWithChoicesQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
  img,
}: Props) {
  return (
    <div className="w-full h-full flex flex-col gap-8 text-start justify-center items-start">
      <h2 className="text-xl font-pingar font-bold">{question.question}</h2>

      <div className="w-full h-full flex flex-col md:flex-row-reverse justify-center gap-12 items-center">
        <Image
          src={img}
          alt="Main Question Image"
          width={456}
          height={355}
          className="rounded-[20px] object-cover"
        />

        <div className="w-[541px] max-w-full h-full flex flex-col">
          {question.choices.map((choice) => (
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
