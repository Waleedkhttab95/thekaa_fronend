import {
  getQuizResult,
  makeQuiz,
  startQuiz,
  submitQuiz,
} from "@/services/quiz";
import { Locales } from "@/types/locales.enum";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const useQuizMutation = (
  axiosClient: AxiosInstance,
  studentId: string,
  language: Locales
) => {
  const query = useQuery({
    queryKey: ["quiz", studentId],
    queryFn: () => makeQuiz(axiosClient, studentId, language),
  });

  return query;
};

export const useStartQuizMutation = (
  axiosClient: AxiosInstance,
  quizId: string
) => {
  const query = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => startQuiz(axiosClient, quizId),
    enabled: !!quizId,
  });

  return query;
};

export const useSubmitQuizMutation = (
  axiosClient: AxiosInstance,
  quizId: string
) =>
  useMutation({
    mutationFn: (answers: string[]) => submitQuiz(axiosClient, quizId, answers),
  });

export const useQuizResult = (
  axiosClient: AxiosInstance,
  quizId: string,
  enabled: boolean
) =>
  useQuery({
    queryKey: ["quizResult", quizId],
    queryFn: () => getQuizResult(axiosClient, quizId),
    enabled,
  });
