import { API_BASE_URL } from "@/config/env.constant";
import { INextLesson, IStudentProgress } from "@/types/student.type";
import { AxiosInstance } from "axios";

const API_ROUTE = "education_plan/education_plan";

export const getStudentProgress = async (
  axiosClient: AxiosInstance,
  studentId: string
): Promise<IStudentProgress> => {
  const { data } = await axiosClient.get(
    `${API_BASE_URL}/${API_ROUTE}/student-dashboard/${studentId}`
  );
  return data;
};

export const getNextLessons = async (
  axiosClient: AxiosInstance,
  studentId: string,
  planId: string
): Promise<INextLesson[]> => {
  const { data } = await axiosClient.get(
    `${API_BASE_URL}/${API_ROUTE}/next-lessons/${studentId}/${planId}`
  );
  return data;
};
