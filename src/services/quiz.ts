import { API_BASE_URL } from "@/config/env.constant";
import { AxiosInstance } from "axios";

const QuizRoute = "/education_plan/education_plan/quiz";

// education_plan/quiz/:studentId/:educationPlanId

export const getQuiz = async (
  axiosClient: AxiosInstance,
  studentId: string,
  educationPlanId: string
) => {
  const { data } = await axiosClient.get(
    `${API_BASE_URL}${QuizRoute}/${studentId}/${educationPlanId}`
  );
  return data;
};

// export const submitQuizResult = async (
//   axiosClient: AxiosInstance,
//   studentId: string,
//   resultData: AssessmentResult
// ) => {
//   const { data } = await axiosClient.post(
//     `${API_BASE_URL}/${SUBMIT_ROUTE}/${studentId}`,
//     resultData
//   );
//   return data;
// };
