import { API_BASE_URL } from "@/config/env.constant";
import { AssessmentResult, EducationPlanDetails } from "@/types/assessmentTest";
import { AxiosInstance } from "axios";

const AssessmentRoute = "/education_plan/education_plan";

const GET_ROUTE = `${AssessmentRoute}/create_level_assesment`;
const SUBMIT_ROUTE = `${AssessmentRoute}/post_assessment_result`;
const PLAN_DETAILS = `${AssessmentRoute}/student/plan-details`;

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

export const getStudentEducationDetails = async (
  axiosClient: AxiosInstance,
  studentId: string,
  educationPlanId: string
): Promise<EducationPlanDetails> => {
  const { data } = await axiosClient.get(
    `${PLAN_DETAILS}/${studentId}/${educationPlanId}`
  );
  return data;
};
