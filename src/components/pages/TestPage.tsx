"use client";
import TestClient from "./TestClient";
import Loading from "../atoms/loading";
import { useTest } from "@/hooks/useTest";

export default function TestPage() {
  const {
    currentQuestion,
    choices,
    isLoading,
    isCompleted,
    isAnalyzing,
    report,
    error,
    methods,
    handleNext,
  } = useTest();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <TestClient
      currentQuestion={currentQuestion}
      isCompleted={isCompleted}
      isAnalyzing={isAnalyzing}
      report={report}
      choices={choices}
      methods={methods}
      handleNext={handleNext}
    />
  );
}
