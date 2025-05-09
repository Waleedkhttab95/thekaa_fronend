import {
  getAssessmentTest,
  submitAssessmentResult,
} from "@/services/assessmentTest";
import { checkStudentLevelAssesmentStatus } from "@/services/students";
import { AssessmentResult } from "@/types/assessmentTest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { getCookie, setCookie } from "cookies-next/client";

export const useAssessmentTest = (
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
  const queryClient = useQueryClient();
  const studentId = getCookie("current_user") as string;

  const submitMutation = useMutation({
    mutationFn: ({
      studentId,
      data,
    }: {
      studentId: string;
      data: AssessmentResult;
    }) => submitAssessmentResult(axiosClient, studentId, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["assessmentStatus", studentId],
      });

      setCookie("assesment_test_status", true, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    },
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
