import { axiosAuthServer } from "@/lib/serverAxios";
import { getUser } from "@/services/auth";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["profile"],
    queryFn: () => getUser(axiosAuthServer),
  })
  return <HydrationBoundary state={dehydrate(queryClient)} >{children}</HydrationBoundary>;
}
