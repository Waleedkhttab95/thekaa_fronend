export type QuestionType =
  | "text-choice"
  | "image-choice"
  | "image-text-choices"
  | "fill"
  | "images-with-text-choices";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  questionNumber: number;
  totalQuestions: number;
}

export interface Choice {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface TextChoice extends BaseQuestion {
  type: "text-choice";
  choices: Choice[];
  correctAnswer: string;
}

export interface ImageChoice extends BaseQuestion {
  type: "image-choice";
  choices: Choice[];
  correctAnswer: string;
  mainImage: string;
}

export interface ImageWithTextChoices extends BaseQuestion {
  type: "image-text-choices";
  mainImage: string;
  choices: Choice[];
  correctAnswer: string;
}

export interface Fill extends BaseQuestion {
  type: "fill";
  correctAnswer: string;
}

export interface ImagesAndText extends BaseQuestion {
  type: "images-with-text-choices";
  choices: Choice[];
  correctAnswer: string;
}

export type Question =
  | TextChoice
  | ImageChoice
  | ImageWithTextChoices
  | Fill
  | ImagesAndText;
