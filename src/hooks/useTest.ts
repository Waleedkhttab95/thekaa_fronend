import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import {
  interviewStudent,
  submitAssessmentResult,
} from "@/services/assessmentTest";
import { getStudentById } from "@/services/students";
import { getCookie, setCookie } from "cookies-next/client";
import { toast } from "@/components/atoms/sooner";
import { useTranslations } from "next-intl";
import { ProtectedRoutes } from "@/config/routes";

export const useTest = () => {
  const axiosAuth = useAxiosAuth();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("testPage");

  const methods = useForm<{ answer: string }>({
    defaultValues: { answer: "" },
  });

  const containsReportKeyword = (text: string): boolean => {
    const reportKeywords = ["REPORT", "تقرير"];
    return reportKeywords.some((keyword) =>
      text.toLowerCase().includes(keyword.toLocaleLowerCase())
    );
  };

  const extractReportFromResponse = (aiResponse: string): object | null => {
    const match = aiResponse.match(/REPORT:\s*({[\s\S]*})/i);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    }
    return null;
  };

  const submitAssessment = async (reportData: object) => {
    try {
      const studentId = getCookie("current_user") as string;
      const student = await getStudentById(axiosAuth, studentId);
      const subjectId = student.subject;

      // Minimal AssessmentResult payload
      const assessmentResult = {
        student_id: studentId,
        subject_id: subjectId,
        report: reportData,
      };

      await submitAssessmentResult(axiosAuth, studentId, assessmentResult);

      toast({
        title: t("success"),
        description: t("successDescription"),
        variant: "success",
      });

      setIsCompleted(true);
      setIsAnalyzing(false);

      setCookie("assesment_test_status", "true");
      window.location.href = ProtectedRoutes.Dashboard;
    } catch (e) {
      console.error("Submit error:", e);
      toast({
        title: t("failed"),
        description: t("failedDescription"),
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  };

  const handleAIResponse = async (
    aiResponse: string,
    reportData: object | null,
    newMessages: { role: string; content: string }[]
  ) => {
    let finalReportData = reportData;
    if (!finalReportData && containsReportKeyword(aiResponse)) {
      finalReportData = extractReportFromResponse(aiResponse);
    }

    // console.log(aiResponse);
    // console.log(finalReportData);

    setMessages([...newMessages, { role: "interviewer", content: aiResponse }]);
    setCurrentQuestion(aiResponse);
    setReport(finalReportData ? JSON.stringify(finalReportData) : null);

    if (containsReportKeyword(aiResponse) && finalReportData) {
      setIsAnalyzing(true);
      setIsLoading(false);
      await submitAssessment(finalReportData);
      return true;
    }

    return false;
  };

  // Start interview on mount
  useEffect(() => {
    const startInterview = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await interviewStudent(axiosAuth, [], "en", "math", "10");

        const autoSubmitted = await handleAIResponse(
          data.response,
          data.report,
          []
        );

        if (!autoSubmitted) {
          setIsLoading(false);
        }
      } catch (err) {
        setError(err + " Failed to start interview");
        setIsLoading(false);
      }
    };
    startInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = async () => {
    const answer = methods.getValues("answer");
    if (!answer.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const newMessages = [...messages, { role: "student", content: answer }];
      // console.log(messages);
      const data = await interviewStudent(
        axiosAuth,
        newMessages,
        "en",
        "math",
        "10"
      );

      methods.reset({ answer: "" });

      const autoSubmitted = await handleAIResponse(
        data.response,
        data.report,
        newMessages
      );

      if (!autoSubmitted) {
        setIsLoading(false);
      }
    } catch (err) {
      setError(err + " Failed to continue interview");
      setIsLoading(false);
    }
  };

  return {
    methods,
    currentQuestion,
    isCompleted,
    isAnalyzing,
    report,
    isLoading,
    error,
    handleNext,
  };
};
