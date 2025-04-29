import { API_BASE_URL } from "@/config/env.constant";
import { AssessmentResult } from "@/types/assessmentTest";
import { AxiosInstance } from "axios";

const AssessmentRoute = "/education_plan/education_plan";

const GET_ROUTE = `${AssessmentRoute}/create_level_assesment`;
const SUBMIT_ROUTE = `${AssessmentRoute}/post_assessment_result`;

export const getAssessmentTest = async (
  axiosClient: AxiosInstance,
  studentId: string
) => {
  const { data } = await axiosClient.post(`${API_BASE_URL}/${GET_ROUTE}`, {
    studentId,
  });
  return data;
};

export const submitAssessmentResult = async (
  axiosClient: AxiosInstance,
  studentId: string,
  resultData: AssessmentResult
) => {
  const { data } = await axiosClient.post(
    `${API_BASE_URL}/${SUBMIT_ROUTE}/${studentId}`,
    resultData
  );
  return data;
};
