import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Question } from "@/types/question.types";
import { toast } from "@/components/atoms/sooner";
import { useTranslations } from "next-intl";

export type TestSubmissionData = {
  answers: Record<string, string>;
  answerTexts?: Record<string, string>;
  studentId?: string;
};

export const useTest = (questions: Question[]) => {
  const t = useTranslations("testPage");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState<
    Record<string, boolean>
  >({});

  const formSchema = z.object({
    answers: z.record(
      z.string().min(1, "Answer is required").max(500, "Answer is too long")
    ),
    answerTexts: z.record(z.string().max(500, "Answer is too long")).optional(),
  });

  const methods = useForm<TestSubmissionData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answers: {},
      answerTexts: {},
    },
  });

  const { handleSubmit, setValue, watch } = methods;
  const answers = watch("answers");

  const currentQuestion = questions[currentQuestionIndex] as Question;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const currentAnswer = answers[currentQuestion?.id] || "";

  const handleAnswerSelect = (answerId: string) => {
    if (!currentQuestion) return;

    setValue(`answers.${currentQuestion.id}`, answerId, {
      shouldValidate: true,
    });

    if ("options" in currentQuestion) {
      const selectedChoice = currentQuestion.options.find(
        (choice) => choice.id === answerId
      );
      if (selectedChoice) {
        setValue(`answerTexts.${currentQuestion.id}`, selectedChoice.text, {
          shouldValidate: false,
        });
      }
    }
  };

  const handleFillAnswer = (value: string) => {
    if (!currentQuestion) return;

    const trimmedValue = value.slice(0, 500);

    setValue(`answers.${currentQuestion.id}`, trimmedValue, {
      shouldValidate: true,
    });

    setValue(`answerTexts.${currentQuestion.id}`, trimmedValue, {
      shouldValidate: false,
    });
  };

  const handleNext = async () => {
    if (!currentQuestion) return;

    if (currentQuestion.type === "fill" && !currentAnswer.trim()) return;
    if (!currentAnswer && currentQuestion.type !== "fill") return;

    setSubmittedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));

    if (isLastQuestion) {
      handleSubmit(onSubmit)();
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const onSubmit = async (data: TestSubmissionData) => {
    setIsSubmitting(true);
    try {
      const formattedAnswers = Object.entries(data.answers).reduce(
        (acc, [questionId, answerId]) => {
          const answerText = data.answerTexts?.[questionId] || answerId;

          return {
            ...acc,
            [questionId]: {
              id: answerId,
              value: answerText,
            },
          };
        },
        {}
      );

      const testSubmission = {
        answers: formattedAnswers,
        ...(data.studentId && { studentId: data.studentId }),
      };

      console.log("Test submission:", testSubmission);

      setIsCompleted(true);
    } catch {
      toast({
        title: t("error.title") || "Error",
        description: t("error.submitError") || "Failed to submit test",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    methods,
    currentQuestionIndex,
    currentQuestion,
    isLastQuestion,
    isCompleted,
    isSubmitting,
    currentAnswer,
    submittedAnswers,
    handleAnswerSelect,
    handleFillAnswer,
    handleNext,
    onSubmit,
  };
};
