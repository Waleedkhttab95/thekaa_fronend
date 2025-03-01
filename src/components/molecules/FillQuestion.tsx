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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setAnswer(newValue);
    if (setUserAnswer) {
      setUserAnswer(newValue);
    }
  };

  return (
    <div className="w-full space-y-4 my-[48px]">
      <h2 className="text-xl font-bold">{question.question}</h2>
      <input
        type="text"
        value={setUserAnswer ? userAnswer : answer}
        onChange={handleChange}
        className="w-full flex justify-start h-[89px] p-2 border rounded-[20px]  pb-14 ps-3"
        placeholder="أدخل الإجابة"
      />
    </div>
  );
}
