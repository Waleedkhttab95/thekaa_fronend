"use client";
import { useTestMutation } from "@/hooks/rqs/assessmentTest";
import TestClient from "./TestClient";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";

import { mapAPIQuestionsToComponentFormat } from "@/utils/questionsMapper";

export default function TestPage() {
  const studentId = "6803b7e59531f759f7622dea";
  const axiosAuth = useAxiosAuth();

  const { data, isLoading, isError, error } = useTestMutation(
    axiosAuth,
    studentId
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
