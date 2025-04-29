export interface UnitQuestion {
  question?: string;
  statement?: string;
  options?: {
    key: string;
    value: string;
  };
  correct_answer: string | boolean;
}

export interface Unit {
  unit_Questions: UnitQuestion[];
  unit_Number: number;
}

export interface levelAssessment {
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

export interface AssessmentResult {
  student_id: string;
  subject_id: string;
  questions: {
    question_text: string;
    student_answer: string;
    correct_answer: string;
    unit_number: number;
  }[];
}

export type TestSubmissionData = {
  answers: Record<string, string>;
  answerTexts?: Record<string, string>;
  studentId?: string;
};
