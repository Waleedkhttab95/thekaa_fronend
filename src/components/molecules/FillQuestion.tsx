import { useState } from "react";
import { Fill } from "@/types/question.types";

interface FillProps {
  question: Fill;
  userAnswer?: string;
  setUserAnswer?: (value: string) => void;
}

export function FillQuestion({
  question,
  userAnswer,
  setUserAnswer,
}: FillProps) {
  const [answer, setAnswer] = useState(userAnswer || "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setAnswer(newValue);
    if (setUserAnswer) {
      setUserAnswer(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full space-y-4 my-[48px]">
      <h2 className="text-xl font-bold">{question.question}</h2>
      <div className="relative rounded-[20px] overflow-hidden">
        <textarea
          value={setUserAnswer ? userAnswer : answer}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full flex justify-start h-[89px] p-2 border rounded-[20px] ps-3 resize-none overflow-auto
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
          placeholder="أدخل الإجابة"
          maxLength={500}
        />
      </div>
    </div>
  );
}
