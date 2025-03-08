import { Choice, ImageChoice } from "@/types/question.types";
import Image from "next/image";

interface Props {
  question: ImageChoice;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
}

export function ImageChoiceQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
}: Props) {
  return (
    <div className="flex justify-center items-center w-full h-full text-start">
      <div className="flex flex-col flex-wrap w-full h-auto">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-pingar font-bold">
            {question.question}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-center items-start gap-10 mt-8">
          {question.choices.map((choice: Choice) => (
            <div
              key={choice.id}
              onClick={() => onSelectAnswer(choice.id)}
              className={`flex w-[250px] h-[355] md:w-[456px] flex-col md:flex-row cursor-pointer rounded-[20px] overflow-hidden border-[8px] self-center transition-all ${
                selectedAnswer === choice.id
                  ? "border-[#23F6F0] bg-gray-400-900 opacity-75 cursor-default"
                  : "border-transparent"
              }`}
            >
              <Image
                src={choice.imageUrl || ""}
                alt={choice.text || ""}
                width={456}
                height={355}
                className="object-cover"
              />
              {selectedAnswer === choice.id && <div className=""></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
