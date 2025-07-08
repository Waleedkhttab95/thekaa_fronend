import { useState, useEffect, useCallback } from "react";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import { getCookie } from "cookies-next/client";
import {
  useQuizMutation,
  useQuizResult,
  useStartQuizMutation,
  useSubmitQuizMutation,
} from "@/hooks/rqs/quiz";
import { mapQuizDataToTextChoices, isValidQuizData } from "@/utils/quizMapper";
import { TextChoice } from "@/types/question.types";
import { useTranslations } from "next-intl";
import { toast } from "@/components/atoms/sooner";
import { redirect, useRouter } from "next/navigation";
import { ProtectedRoutes } from "@/config/routes";

interface UseQuizState {
  questions: TextChoice[];
  timeLimit: number;
  totalMarks: number;
  passMarks: number;
  quizId: string | null;
  currentQuestionIndex: number;
  selectedAnswers: Record<string, string>;
  isCompleted: boolean;
  startTime: number;
  isCreatingQuiz: boolean;
  isLoadingQuestions: boolean;
  isSubmitting: boolean;
  error: string | null;
  result: string;
}

interface UseQuizActions {
  handleAnswerSelect: (answerId: string) => void;
  handleNext: () => void;
  handleTimerComplete: () => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
}

export function useQuiz(): UseQuizState & UseQuizActions {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const t = useTranslations("quiz");
  const studentId = getCookie("current_user") as string;

  const [questions, setQuestions] = useState<TextChoice[]>([]);
  const [timeLimit, setTimeLimit] = useState<number>(30);
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [passMarks, setPassMarks] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    data: quizResponse,
    isLoading: isCreatingQuiz,
    error: quizCreationError,
  } = useQuizMutation(axiosAuth, studentId);

  const quizId = quizResponse?.quizId || null;

  const {
    data: quizData,
    isLoading: isLoadingQuizData,
    error: quizDataError,
  } = useStartQuizMutation(axiosAuth, quizId!);

  const submitQuizMutation = useSubmitQuizMutation(axiosAuth, quizId!);

  const { data: result } = useQuizResult(
    axiosAuth,
    quizId!,
    isCompleted && !!quizId
  );

  useEffect(() => {
    if (!studentId) {
      redirect(ProtectedRoutes.SonsFiles);
    }
    if (quizData && !isLoadingQuizData && quizId) {
      try {
        if (isValidQuizData(quizData)) {
          const mappedData = mapQuizDataToTextChoices(quizData);
          setQuestions(mappedData.questions);
          setTimeLimit(mappedData.timeLimit);
          setTotalMarks(mappedData.totalMarks);
          setPassMarks(mappedData.passMarks);
          setIsLoadingQuestions(false);
          setError(null);
        } else {
          setError(t("invalidData"));
          setIsLoadingQuestions(false);
        }
      } catch (err) {
        setError(t("processError"));
        console.log(err);
        setIsLoadingQuestions(false);
      }
    }
  }, [quizData, isLoadingQuizData, quizId, t, studentId]);

  useEffect(() => {
    if (quizCreationError) {
      setError(t("createFailed"));
      setIsLoadingQuestions(false);
      setTimeout(() => {
        router.push(ProtectedRoutes.SonsFiles);
      }, 1000);
    }
    if (quizDataError) {
      setError(t("loadFailed"));
      setIsLoadingQuestions(false);
    }
  }, [quizCreationError, quizDataError, t, router]);

  const handleAnswerSelect = useCallback(
    (answerId: string) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) return;
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answerId,
      }));
    },
    [questions, currentQuestionIndex]
  );

  const formatAnswersForSubmission = useCallback((): string[] => {
    return questions.map((question) => selectedAnswers[question.id] || "");
  }, [questions, selectedAnswers]);

  const submitQuiz = useCallback(() => {
    if (!quizId || questions.length === 0) return;
    const formattedAnswers = formatAnswersForSubmission();
    submitQuizMutation.mutate(formattedAnswers, {
      onSuccess: () => {
        setIsCompleted(true);
        toast({
          title: t("success"),
          description: t("successDescription"),
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: t("failed"),
          description: t("failedDescription"),
          variant: "destructive",
        });
        setTimeout(() => {
          router.push(ProtectedRoutes.Dashboard);
        }, 1000);
        setError(t("failedDescription"));
      },
    });
  }, [
    quizId,
    questions,
    formatAnswersForSubmission,
    submitQuizMutation,
    t,
    router,
  ]);

  const handleNext = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion || !selectedAnswers[currentQuestion.id]) {
      return;
    }
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    if (isLastQuestion) {
      submitQuiz();
      return;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  }, [questions, currentQuestionIndex, selectedAnswers, submitQuiz]);

  const handleTimerComplete = useCallback(() => {
    submitQuiz();
  }, [submitQuiz]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setError(null);
  }, []);

  return {
    questions,
    timeLimit,
    totalMarks,
    passMarks,
    quizId,
    currentQuestionIndex,
    selectedAnswers,
    isCompleted,
    startTime,
    isCreatingQuiz,
    isLoadingQuestions: isLoadingQuestions || isLoadingQuizData,
    isSubmitting: submitQuizMutation.isPending,
    error,
    handleAnswerSelect,
    handleNext,
    handleTimerComplete,
    submitQuiz,
    resetQuiz,
    result,
  };
}
