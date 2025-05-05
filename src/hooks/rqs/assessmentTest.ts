import {
  getAssessmentTest,
  submitAssessmentResult,
} from "@/services/assessmentTest";
import { checkStudentLevelAssesmentStatus } from "@/services/students";
import { AssessmentResult } from "@/types/assessmentTest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const useTestMutation = (
  axiosClient: AxiosInstance,
  studentId: string
) => {
  const query = useQuery({
    queryKey: ["assessmentTest", studentId],
    queryFn: () => getAssessmentTest(axiosClient, studentId),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return query;
};

export const useAssessmentSubmitMutation = (axiosClient: AxiosInstance) => {
  const submitMutation = useMutation({
    mutationFn: ({
      studentId,
      data,
    }: {
      studentId: string;
      data: AssessmentResult;
    }) => submitAssessmentResult(axiosClient, studentId, data),
  });

  return submitMutation;
};

export const useCheckStudentAssesmentStatus = (
  axiosClient: AxiosInstance,
  studentId: string
) => {
  return useQuery({
    queryKey: ["assessmentStatus", studentId],
    queryFn: () => checkStudentLevelAssesmentStatus(axiosClient, studentId),
  });
};
