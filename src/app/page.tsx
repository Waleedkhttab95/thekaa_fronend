import StudentsList from "@/components/molecules/student";
import { Suspense } from "react";

export default async function Home() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudentsList />
    </Suspense>
  );
}
