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

export interface Options {
  id: string;
  value?: string;
  text: string;
  imageUrl?: string;
}

export interface TextChoice extends BaseQuestion {
  type: "text-choice";
  options: Options[];
  correctAnswer: string;
}

export interface ImageChoice extends BaseQuestion {
  type: "image-choice";
  options: Options[];
  correctAnswer: string;
  mainImage: string;
}

export interface ImageWithTextChoices extends BaseQuestion {
  type: "image-text-choices";
  mainImage: string;
  options: Options[];
  correctAnswer: string;
}

export interface Fill extends BaseQuestion {
  type: "fill";
  correctAnswer: string;
}

export interface ImagesAndText extends BaseQuestion {
  type: "images-with-text-choices";
  options: Options[];
  correctAnswer: string;
}

export type Question =
  | TextChoice
  | ImageChoice
  | ImageWithTextChoices
  | Fill
  | ImagesAndText;
