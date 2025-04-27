import { API_BASE_URL } from "@/config/env.constant";
import { AxiosInstance } from "axios";
const API_ROUTE = "/education_plan/education_plan/create_level_assesment";

export const getAssessmentTest = async (
  axiosClient: AxiosInstance,
  studentId: string
) => {
  const { data } = await axiosClient.post(`${API_BASE_URL}/${API_ROUTE}`, {
    studentId,
  });
  return data;
};
