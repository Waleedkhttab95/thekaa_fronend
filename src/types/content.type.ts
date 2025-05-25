export interface ISubject {
  _id: string;
  name: string;
  icon: string;
}
export interface IGradeLevel {
  _id: string;
  name: string;
}
export interface ICountry {
  _id: string;
  name: string;
}

export enum LevelLabels {
  EXPERT = "Expert",
  ADVANCED = "Advanced",
  INTERMEDIATE = "Intermediate",
  BEGINNER = "Beginner",
  NOVICE = "Novice",
}
