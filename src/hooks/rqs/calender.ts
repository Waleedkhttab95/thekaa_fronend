import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { getNextLessons, getStudentProgress } from "@/services/calender";
import { INextLesson, IStudentProgress } from "@/types/student.type";

const NEXT_LESSONS_QUERY = "next-lessons";
const STUDENT_PROGRESS_QUERY = "student-dashboard";

export const useNextLessons = (
  axiosClient: AxiosInstance,
  studentId: string,
  planId: string
) => {
  return useQuery<INextLesson[]>({
    queryKey: [NEXT_LESSONS_QUERY, studentId, planId],
    queryFn: () => getNextLessons(axiosClient, studentId, planId),
    staleTime: 12000,
    enabled: !!studentId && !!planId,
  });
};

export const useStudentProgress = (
  axiosClient: AxiosInstance,
  studentId: string
) => {
  return useQuery<IStudentProgress>({
    queryKey: [STUDENT_PROGRESS_QUERY, studentId],
    queryFn: () => getStudentProgress(axiosClient, studentId),
    staleTime: 120000,
    enabled: !!studentId,
  });
};
