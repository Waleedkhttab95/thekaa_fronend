import { Question } from "@/types/question.types";

interface UnitQuestion {
  question?: string;
  statement?: string;
  options?: {
    key: string;
    value: string;
  };
  correct_answer: string | boolean;
}

interface Unit {
  unit_Questions: UnitQuestion[];
  unit_Number: number;
}

interface levelAssessment {
  _id: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  subjectId: string;
  questions: Unit[];
  totalQuestions: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  studentId: string;
}

export function mapAPIQuestionsToComponentFormat(
  apiData: levelAssessment
): Question[] {
  if (!apiData || !apiData.questions) {
    return [];
  }

  const mappedQuestions: Question[] = [];
  let questionCounter = 0;

  apiData.questions.forEach((unit) => {
    unit.unit_Questions.forEach((apiQuestion) => {
      questionCounter++;

      //todo: recheck the optios for true/false questions
      if (apiQuestion.statement) {
        const options = [
          { id: "true", text: "صحيح" },
          { id: "false", text: "خطأ" },
        ];

        mappedQuestions.push({
          id: `question-${questionCounter}`,
          type: "text-choice",
          question: apiQuestion.statement,
          questionNumber: questionCounter,
          totalQuestions: apiData.totalQuestions,
          options: options,
        } as Question);
      } else if (apiQuestion.question && apiQuestion.options) {
        const options = Object.entries(apiQuestion.options).map(
          ([key, value]) => ({
            id: key,
            text: value,
          })
        );

        mappedQuestions.push({
          id: `question-${questionCounter}`,
          type: "text-choice",
          question: apiQuestion.question,
          questionNumber: questionCounter,
          totalQuestions: apiData.totalQuestions,
          options: options,
        } as Question);
      }
    });
  });

  return mappedQuestions;
}
