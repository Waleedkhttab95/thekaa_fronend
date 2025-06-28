"use client";
import { useAssessmentTest } from "@/hooks/rqs/assessmentTest";
import TestClient from "./TestClient";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";

import { mapAPIQuestionsToComponentFormat } from "@/utils/questionsMapper";
import { getCookie } from "cookies-next/client";
import { useTranslations } from "next-intl";
import Loading from "../atoms/loading";
import { useEffect, useRef } from "react";
import { toast } from "../atoms/sooner";
import Router from "next/router";
import { ProtectedRoutes } from "@/config/routes";
import { useTest } from "@/hooks/useTest";

export default function TestPage() {
  const t = useTranslations("testPage");
  const { currentQuestion, isLoading, isCompleted, isAnalyzing, report, error, methods, handleNext } = useTest();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return <TestClient currentQuestion={currentQuestion} isCompleted={isCompleted} isAnalyzing={isAnalyzing} report={report} methods={methods} handleNext={handleNext} />;
}
