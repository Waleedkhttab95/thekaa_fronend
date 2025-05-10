"use client";
import { useAssessmentTest } from "@/hooks/rqs/assessmentTest";
import TestClient from "./TestClient";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";

import { mapAPIQuestionsToComponentFormat } from "@/utils/questionsMapper";
import { getCookie } from "cookies-next/client";
import { useTranslations } from "next-intl";

export default function TestPage() {
  const t = useTranslations("testPage");
  const studentId = getCookie("current_user");
  const axiosAuth = useAxiosAuth();

  const { data, isLoading, isError } = useAssessmentTest(
    axiosAuth,
    studentId as string
  );

  console.log("level assessment data: ", data);

  if (isLoading) {
    return (
      <p className="w-full flex justify-center self-center">
        {t("questionsLoading")}
      </p>
    );
  }

  if (isError) {
    return <p>{t("errorLoading")}</p>;
  }

  const mappedQuestions = mapAPIQuestionsToComponentFormat(data);

  return <TestClient questions={mappedQuestions} data={data} />;
}
