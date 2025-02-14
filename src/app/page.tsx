import ThemeSwitcher from "@/components/atoms/ThemeSwitcher";
import StudentsList from "@/components/molecules/student";
import { STUDENTS_QUERY } from "@/config/qr.constants";
import { getStudents } from "@/services/students";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Home() {
  // server components 
  // 1- prefetch data from server 
  // 2- pass the data to the client
  // 3- hydrate the client with the data

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [STUDENTS_QUERY, 1, 10],
    queryFn: () => getStudents(1, 10)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <ThemeSwitcher />
      <StudentsList />
    </HydrationBoundary>
  );
}
