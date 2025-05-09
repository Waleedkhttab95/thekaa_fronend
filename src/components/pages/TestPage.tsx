"use client";
import { useAssessmentTest } from "@/hooks/rqs/assessmentTest";
import TestClient from "./TestClient";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";

import { mapAPIQuestionsToComponentFormat } from "@/utils/questionsMapper";
import { getCookie } from "cookies-next/client";

export default function TestPage() {
  const studentId = getCookie("current_user");
  const axiosAuth = useAxiosAuth();

  const { data, isLoading, isError, error } = useAssessmentTest(
    axiosAuth,
    studentId as string
  );

  if (isLoading) {
    return <p className="w-full flex justify-center self-center">Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message || "Something went wrong"}</p>;
  }

  const mappedQuestions = mapAPIQuestionsToComponentFormat(data);

  return <TestClient questions={mappedQuestions} data={data} />;
}
