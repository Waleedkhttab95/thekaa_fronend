import { getAssessmentTest } from "@/services/assessmentTest";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const useTestMutations = (
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
