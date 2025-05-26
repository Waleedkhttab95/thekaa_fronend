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

export default function TestPage() {
  const t = useTranslations("testPage");
  const studentId = getCookie("current_user");
  const axiosAuth = useAxiosAuth();
  const hasShownErrorToast = useRef(false);

  const { data, isLoading, isError } = useAssessmentTest(
    axiosAuth,
    studentId as string
  );

  useEffect(() => {
    if (isError && !hasShownErrorToast.current) {
      hasShownErrorToast.current = true;
      toast({
        title: t("failed"),
        description: t("errorLoading"),
        variant: "destructive",
      });

      setTimeout(() => {
        Router.push(`${ProtectedRoutes.SonsFiles}`);
      }, 1500);
    }
  }, [isError, t]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Loading />;
  }

  const mappedQuestions = mapAPIQuestionsToComponentFormat(data);

  return <TestClient questions={mappedQuestions} data={data} />;
}
