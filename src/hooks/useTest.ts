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
import { useLocale, useTranslations } from "next-intl";
import { ProtectedRoutes } from "@/config/routes";
import { Locales } from "@/types/locales.enum";
import { IStudentData } from "@/types/student.type";

export const useTest = () => {
  const locale = useLocale();

  const axiosAuth = useAxiosAuth();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([]);
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<IStudentData | null>(null);
  const [isLoadingStudentData, setIsLoadingStudentData] = useState(true);
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
      const subjectId = student.subjectId;

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
    newMessages: { role: string; content: string }[],
    responseChoices?: string[]
  ) => {
    let finalReportData = reportData;
    if (!finalReportData && containsReportKeyword(aiResponse)) {
      finalReportData = extractReportFromResponse(aiResponse);
    }

    // console.log(aiResponse);
    // console.log(finalReportData);

    setMessages([...newMessages, { role: "interviewer", content: aiResponse }]);
    setCurrentQuestion(aiResponse);
    setChoices(responseChoices || []);
    setReport(finalReportData ? JSON.stringify(finalReportData) : null);

    if (containsReportKeyword(aiResponse) && finalReportData) {
      setIsAnalyzing(true);
      setIsLoading(false);
      await submitAssessment(finalReportData);
      return true;
    }

    return false;
  };

  // Fetch student data on mount
  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoadingStudentData(true);
      setError(null);
      try {
        const studentId = getCookie("current_user") as string;
        if (!studentId) {
          throw new Error("No student ID found");
        }
        
        const student = await getStudentById(axiosAuth, studentId);
        setStudentData(student);
        setIsLoadingStudentData(false);
      } catch (err) {
        setError(err + " Failed to fetch student data");
        setIsLoadingStudentData(false);
      }
    };
    
    fetchStudentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start interview when student data is available
  useEffect(() => {
    if (!studentData || isLoadingStudentData) return;
    
    const startInterview = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await interviewStudent(
          axiosAuth, 
          [], 
          locale, 
          studentData.subject, 
          studentData.age.toString()
        );

        const autoSubmitted = await handleAIResponse(
          data.response,
          data.report,
          [],
          data.choices
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
  }, [studentData, isLoadingStudentData]);

  const handleNext = async (answer?: string) => {
    const studentAnswer = answer || methods.getValues("answer");
    if (!studentAnswer.trim()) return;

    if (!studentData) {
      setError("Student data not available");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newMessages = [...messages, { role: "student", content: studentAnswer }];
      // console.log(messages);
      const data = await interviewStudent(
        axiosAuth,
        newMessages,
        locale,
        studentData.subject,
        studentData.age.toString()
      );

      methods.reset({ answer: "" });

      const autoSubmitted = await handleAIResponse(
        data.response,
        data.report,
        newMessages,
        data.choices
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
    choices,
    isCompleted,
    isAnalyzing,
    report,
    isLoading: isLoading || isLoadingStudentData,
    error,
    handleNext,
    studentData,
  };
};
