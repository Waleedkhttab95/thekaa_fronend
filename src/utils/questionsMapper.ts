import {
  AssessmentResult,
  levelAssessment,
  TestSubmissionData,
  Unit,
} from "@/types/assessmentTest";
import { Question } from "@/types/question.types";

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

export const transformSubmission = (
  submission: TestSubmissionData,
  apiData: levelAssessment,
  studentId: string
): AssessmentResult => {
  const questions = apiData.questions;
  const subjectId = apiData.subjectId;

  const questionMap = new Map();
  let counter = 0;

  questions.forEach((unit: Unit) => {
    unit.unit_Questions.forEach((q) => {
      counter++;
      const questionId = `question-${counter}`;
      questionMap.set(questionId, {
        text: q.question || q.statement,
        correct_answer:
          typeof q.correct_answer === "boolean"
            ? q.correct_answer
              ? "true"
              : "false"
            : q.correct_answer,
        unit_number: unit.unit_Number,
      });
    });
  });

  const transformedQuestions = Object.entries(submission.answers).map(
    ([questionId, answerId]) => {
      const questionDetails = questionMap.get(questionId);
      return {
        question_text: questionDetails.text,
        student_answer: answerId,
        correct_answer: questionDetails.correct_answer,
        unit_number: questionDetails.unit_number,
      };
    }
  );

  return {
    student_id: studentId,
    subject_id: subjectId,
    questions: transformedQuestions,
  };
};
