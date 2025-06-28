import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import { interviewStudent, submitAssessmentResult } from "@/services/assessmentTest";
import { getStudentById } from "@/services/students";
import { getCookie } from "cookies-next/client";
import { toast } from "@/components/atoms/sooner";
import { useTranslations } from "next-intl";
import { ProtectedRoutes } from "@/config/routes";
import Router from "next/router";

export const useTest = () => {
  const axiosAuth = useAxiosAuth();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
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

  // Start interview on mount
  useEffect(() => {
    const startInterview = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await interviewStudent(axiosAuth, [], "en", "math", "10");
        setCurrentQuestion(data.response);
        setMessages([{ role: "interviewer", content: data.response }]);
        setReport(data.report);
        if (data.report) setIsCompleted(true);
      } catch (err) {
        setError("Failed to start interview");
      } finally {
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
      const newMessages = [
        ...messages,
        { role: "student", content: answer },
      ];
      const data = await interviewStudent(axiosAuth, newMessages, "en", "math", "10");
      // If report is present, end the conversation and show the report only
      if (data.report) {
        setReport(data.report);
        setIsCompleted(true);
        setIsAnalyzing(false);
        methods.reset({ answer: "" });
        // Submit assessment result to backend
        try {
          const studentId = getCookie("current_user") as string;
          const student = await getStudentById(axiosAuth, studentId);
          const subjectId = student.subject;
          // Minimal AssessmentResult payload
          const assessmentResult = {
            student_id: studentId,
            subject_id: subjectId,
            report: data.report,
          };
          const res =  await submitAssessmentResult(axiosAuth, studentId, assessmentResult);
          setIsAnalyzing(true);

          toast({
            title: t("success"),
            description: t("successDescription"),
            variant: "success",
          });
    
          setIsCompleted(true);
          if(res){
            window.location.href = ProtectedRoutes.Dashboard;
          }
          
        } catch (e) {
          console.error("Submit error:", error);
          toast({
            title: t("failed"),
            description: t("failedDescription"),
            variant: "destructive",
          });
          setIsAnalyzing(false);
    
          setTimeout(() => {
            Router.push(ProtectedRoutes.SonsFiles);
          }, 1500);
        }
        return;
      }
      setMessages([
        ...newMessages,
        { role: "interviewer", content: data.response },
      ]);
      setCurrentQuestion(data.response);
      setReport(data.report);
      methods.reset({ answer: "" });
    } catch (err) {
      setError("Failed to continue interview");
    } finally {
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
