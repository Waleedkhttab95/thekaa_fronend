'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';

export default function ProvidersLayout({
  children,
  messages,
  locale
}: {
  children: React.ReactNode,
  messages: AbstractIntlMessages,
  locale: string
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        retryOnMount: false,
      }
    }
  }));

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider >
    </ThemeProvider>
  );
}
