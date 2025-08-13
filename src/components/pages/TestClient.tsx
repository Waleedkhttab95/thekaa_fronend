"use client";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/atoms/button";
import { ExamCompletion } from "@/components/molecules/ExamCompletion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { QuestionOption } from "@/components/molecules/questionOption";
import { useTranslations } from "next-intl";
import Loading from "../atoms/loading";
import Image from "next/image";
import { useState } from "react";

interface TestClientProps {
  currentQuestion: string;
  isCompleted: boolean;
  isAnalyzing: boolean;
  report: string | null;
  choices?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: any;
  // methods: UseFormReturn<{ answer: string }>;
  handleNext: (answer?: string) => void;
}

export default function TestClient({
  currentQuestion,
  isCompleted,
  isAnalyzing,
  choices,
  methods,
  handleNext,
}: TestClientProps) {
  const t = useTranslations("testPage");
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [textAnswer, setTextAnswer] = useState<string>("");
  
  if (isAnalyzing) {
    return <ExamCompletion initialState="analyzing" />;
  }
  if (isCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-10 p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">
            {t("interviewReport")}
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    );
  }

  if (!currentQuestion) {
    return <Loading />;
  }

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAnswer(e.target.value);
    methods.setValue("answer", e.target.value);
  };

  const handleSubmit = () => {
    if (choices && choices.length > 0) {
      // If choices exist, use the selected choice text
      if (selectedChoice !== "") {
        const selectedChoiceText = choices[parseInt(selectedChoice)];
        handleNext(selectedChoiceText);
        setSelectedChoice("");
      }
    } else {
      // If no choices, use the textarea value
      if (textAnswer && textAnswer.trim()) {
        handleNext(textAnswer);
        setTextAnswer("");
        methods.reset({ answer: "" });
      }
    }
  };

  const hasChoices = choices && choices.length > 0;
  
  // Determine if the button should be disabled
  const isButtonDisabled = hasChoices 
    ? selectedChoice === "" 
    : !textAnswer || !textAnswer.trim();

  // Debug logging
  console.log("Debug - hasChoices:", hasChoices);
  console.log("Debug - selectedChoice:", selectedChoice);
  console.log("Debug - textAnswer:", textAnswer);
  console.log("Debug - isButtonDisabled:", isButtonDisabled);

  return (
    <FormProvider {...methods}>
      <Card className="w-full max-w-2xl mx-auto mt-10 p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-4">
            {t("placementTest")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="mb-2 text-lg font-semibold bg-black text-white rounded-[12px] p-4 border border-[#222] shadow-sm flex items-center gap-3">
              <Image
                src="/assets/images/icons/robot.svg"
                alt="AI"
                width={32}
                height={32}
              />
              <span>{currentQuestion}</span>
            </div>
            
            {hasChoices ? (
              // Multiple choice options
              <div className="space-y-4">
                {choices.map((choice, index) => (
                  <QuestionOption
                    key={index + 1}
                    id={index.toString()}
                    text={choice}
                    isSelected={selectedChoice === index.toString()}
                    onSelect={handleChoiceSelect}
                    background="white"
                  />
                ))}
              </div>
            ) : (
              // Text input for free text answers
              <textarea
                value={textAnswer}
                onChange={handleTextChange}
                className="w-full h-[120px] p-4 border rounded-[20px] resize-none text-base font-normal bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#23F6F0]"
                placeholder={t("typeYourAnswer")}
                maxLength={1000}
              />
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end mt-4">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className="text-[16px] font-pingar font-bold w-[193px] h-[56px] flex flex-row justify-center items-center text-start select-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("next")}
          </Button>
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
