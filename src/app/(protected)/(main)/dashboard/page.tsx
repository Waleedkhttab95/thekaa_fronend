import ThemeSwitcher from "@/components/atoms/ThemeSwitcher";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function Home() {
  // server components 
  // 1- prefetch data from server 
  // 2- pass the data to the client
  // 3- hydrate the client with the data

  const queryClient = new QueryClient();


  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <ThemeSwitcher />
    </HydrationBoundary>
  );
}
