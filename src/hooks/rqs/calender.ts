import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { getStudentEducationPlan, getNextLessons } from "@/services/calender";
import { IEducationPlan, INextLesson } from "@/types/student.type";

const EDUCATION_PLAN_QUERY = "education-plan";
const NEXT_LESSONS_QUERY = "next-lessons";

export const useEducationPlan = (
  axiosClient: AxiosInstance,
  studentId: string
) => {
  return useQuery<IEducationPlan>({
    queryKey: [EDUCATION_PLAN_QUERY, studentId],
    queryFn: () => getStudentEducationPlan(axiosClient, studentId),
    enabled: !!studentId,
  });
};

export const useNextLessons = (
  axiosClient: AxiosInstance,
  studentId: string,
  planId: string
) => {
  return useQuery<INextLesson[]>({
    queryKey: [NEXT_LESSONS_QUERY, studentId, planId],
    queryFn: () => getNextLessons(axiosClient, studentId, planId),
    enabled: !!studentId && !!planId,
  });
};
