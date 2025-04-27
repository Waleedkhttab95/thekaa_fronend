import Image from "next/image";
import { ImagesAndText } from "@/types/question.types";
import { cn } from "@/lib/utils";

interface Props {
  question: ImagesAndText;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
}

export function ImagesAndChoicesQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
}: Props) {
  return (
    <div>
      <div className="w-full h-full flex flex-col gap-6 text-start justify-center items-center">
        <h2 className="text-xl font-pingar font-bold self-start">
          {question.question}
        </h2>

        <div className="w-full max-w-lg flex flex-col gap-4">
          {question.options.map((choice) => (
            <div
              key={choice.id}
              onClick={() =>
                selectedAnswer === choice.id || onSelectAnswer(choice.id)
              }
              className={`flex items-center w-full h-full xl:w-[541px] xl:h-[108px] gap-4 p-3 border-2 rounded-[20px] transition-all select-none ${
                selectedAnswer === choice.id
                  ? "border-[#23F6F0] bg-[#23F6F0]/10 ring-1 ring-[#23F6F0] cursor-default"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              }`}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full border bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700",
                  selectedAnswer === choice.id
                    ? "bg-[#23F6F0]"
                    : "border-gray-300"
                )}
              >
                {choice.id}
              </div>
              <Image
                src={"/oil.png"}
                alt={choice.text}
                width={113}
                height={88}
                className="rounded-[20px] object-cover md:w-[113px] md:h-[88px] w-20 h-20"
              />

              <span className="text-lg font-semibold">{choice.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
