import oil from "../../../public/oil.png";
import { Question } from "@/types/question.types";
import { TextChoiceQuestion } from "../molecules/textChoiceQuestion";
import { ImageChoiceQuestion } from "../molecules/ImageChoiceQuestion";
import { ImageWithChoicesQuestion } from "../molecules/ImageWithChoicesQuestion";
import { FillQuestion } from "../molecules/FillQuestion";
import { ImagesAndChoicesQuestion } from "../molecules/ImagesAndChoicesQuestions";

interface QuestionsProps {
  question: Question;
  selectedAnswer: string;
  onSelectAnswer: (answerId: string) => void;
  answer: string;
  setAnswer: (value: string) => void;
}

export function Questions({
  question,
  selectedAnswer,
  onSelectAnswer,
  answer,
  setAnswer,
}: QuestionsProps) {
  switch (question.type) {
    case "text-choice":
      return (
        <TextChoiceQuestion
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
        />
      );
    case "image-choice":
      return (
        <ImageChoiceQuestion
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
        />
      );
    case "image-text-choices":
      return (
        <ImageWithChoicesQuestion
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
          img={oil}
        />
      );
    case "fill":
      return (
        <FillQuestion
          question={question}
          userAnswer={answer}
          setUserAnswer={setAnswer}
        />
      );
    case "images-with-text-choices":
      return (
        <ImagesAndChoicesQuestion
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
        />
      );
    default:
      return null;
  }
}
