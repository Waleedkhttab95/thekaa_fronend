"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { Sonner } from "../atoms/sooner";

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            retryOnMount: false,
          },
        },
      })
  );

  return (
    <ThemeProvider
      attribute="class"
      // defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange
      forcedTheme="light"
    >
      <Sonner />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
