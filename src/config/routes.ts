export enum ProtectedRoutes {
  AiChat = "/ai-chat",
  Plan = "/plan",
  Quiz = "/quiz",
  QuizIntro = "/quiz-intro",
  Reports = "/reports",
  StudentProfile = "/student-profile",
  About = "/about",
  AddStudent = "/add-student",
  Dashboard = "/dashboard",
  EditStudent = "/edit-student",
  SonsFiles = "/sons-files",
  Test = "/test",
  Lesson = "/next-lesson",
}

export enum GuestOnlyRoutes {
  Login = "/login",
  SignUp = "/sign-up",
  RecoverPassword = "/recover-password",
  RecoveryCode = "/recovery-code",
}

//todo: add the rest of the routes when we finish the other pages
export const RoutesNeedsAssessmentTest = ["/dashboard"];
