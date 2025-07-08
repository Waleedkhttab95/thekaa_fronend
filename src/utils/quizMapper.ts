import { Options, TextChoice } from "@/types/question.types";

interface RawQuizQuestion {
  _id: string;
  question: string;
  options: Array<{
    A: string;
    B: string;
    C: string;
    D: string;
  }>;
  explanation: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

interface RawQuizData {
  _id: string;
  questions: RawQuizQuestion[];
  timeLimit: number;
  totalMarks: number;
  passMarks: number;
  status: string;
  isCompleted: boolean;
}

export function mapRawQuestionToTextChoice(
  rawQuestion: RawQuizQuestion,
  questionIndex: number,
  totalQuestions: number
): TextChoice {
  const optionsData = rawQuestion.options[0];

  const options: Options[] = Object.entries(optionsData).map(
    ([key, value]) => ({
      id: key,
      text: value,
    })
  );

  return {
    id: rawQuestion._id,
    type: "text-choice",
    question: rawQuestion.question,
    questionNumber: questionIndex + 1,
    totalQuestions,
    options,
    correctAnswer: "",
  };
}

export function mapQuizDataToTextChoices(rawQuizData: RawQuizData): {
  questions: TextChoice[];
  timeLimit: number;
  totalMarks: number;
  passMarks: number;
  quizId: string;
} {
  const questions = rawQuizData.questions.map((rawQuestion, index) =>
    mapRawQuestionToTextChoice(rawQuestion, index, rawQuizData.questions.length)
  );

  return {
    questions,
    timeLimit: rawQuizData.timeLimit,
    totalMarks: rawQuizData.totalMarks,
    passMarks: rawQuizData.passMarks,
    quizId: rawQuizData._id,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidQuizData(data: any): data is RawQuizData {
  return (
    data &&
    typeof data === "object" &&
    Array.isArray(data.questions) &&
    typeof data.timeLimit === "number" &&
    data.questions.length > 0 &&
    data.questions.every(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (q: any) =>
        q._id &&
        q.question &&
        Array.isArray(q.options) &&
        q.options.length > 0 &&
        q.options[0] &&
        typeof q.options[0] === "object"
    )
  );
}
