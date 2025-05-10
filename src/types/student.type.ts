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

export interface IEducationPlan {
  _id: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  subjectId: string;
  level: string;
  startDate: string;
  endDate: string;
  status: string;
  userId: string;
  studentId: string;
  currentLesson: {
    lessonId: string;
    lessonName: string;
    unitName: string;
    unitNumber: number;
  };
  nextLesson: {
    lessonId: string;
    lessonName: string;
    unitName: string;
    unitNumber: number;
  };
  lastLesson: {
    lessonId: string;
    lessonName: string;
    unitName: string;
    unitNumber: number;
  };
  numberOfLessons: number;
  completedLessons: [];
  classPerWeek: number;
  listOfLessons: {
    lessonId: string;
    lessonName: string;
    unitName: string;
    unitNumber: number;
  }[];
  quizzes: [];
  totalQuizzes: number;
  nextQuiz: string;
}

export interface INextLesson {
  lessonId: string;
  lessonName: string;
  unitName: string;
  unitNumber: number;
  date: string;
}
