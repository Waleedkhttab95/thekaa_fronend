import { API_BASE_URL } from "@/config/env.constant";
import { AxiosInstance } from "axios";

const QuizRoute = "/education_content/generate_lessons_questions";
const StartQuizRoute = "/education_plan/education_plan/quiz";

const getQuizBody = {
  question_type: "MC",
  number_of_questions: 10,
};

export const makeQuiz = async (
  axiosClient: AxiosInstance,
  studentId: string
) => {
  const { data } = await axiosClient.post(
    `${API_BASE_URL}${QuizRoute}/${studentId}`,
    getQuizBody
  );
  return data;
};

export const startQuiz = async (axiosClient: AxiosInstance, quizId: string) => {
  const { data } = await axiosClient.post(
    `${API_BASE_URL}${StartQuizRoute}/${quizId}/start`
  );
  return data;
};

export const submitQuiz = async (
  axiosClient: AxiosInstance,
  quizId: string,
  answers: string[]
) => {
  const { data } = await axiosClient.post(
    `${API_BASE_URL}${StartQuizRoute}/${quizId}`,
    { answers }
  );
  return data;
};

export const getQuizResult = async (
  axiosClient: AxiosInstance,
  quizId: string
) => {
  const { data } = await axiosClient.get(
    `${API_BASE_URL}${StartQuizRoute}/results/${quizId}`
  );
  return data;
};
