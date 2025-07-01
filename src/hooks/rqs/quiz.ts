import { getQuiz } from "@/services/quiz";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
// import { getCookie, setCookie } from "cookies-next/client";

export const useQuiz = (
  axiosClient: AxiosInstance,
  studentId: string,
  educationPlanId: string
) => {
  const query = useQuery({
    queryKey: ["quiz", studentId],
    queryFn: () => getQuiz(axiosClient, studentId, educationPlanId),
  });

  return query;
};
