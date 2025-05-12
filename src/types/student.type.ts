export interface IStudentData {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  grade: string;
  subject: string;
  profileImage?: string;
  country: string;
  phone: string;
  gender: string;
  educationPlanId: string;
  parentId: string;
}

export interface INextLesson {
  lessonId: string;
  lessonName: string;
  unitName: string;
  unitNumber: number;
  date: string;
}

export interface IStudentProgress {
  planPrecentage: number;
  quizDay: boolean;
  lessonDay: boolean;
}
