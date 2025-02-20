import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Locales } from '@/types/locales.enum';
import ProvidersLayout from '@/components/layouts/ProvidersLayout';
import '../global.css'
import { NextIntlClientProvider } from 'next-intl';
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
export default async function RootLayout({
  children,
  params
}: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locales)) {
    notFound();
  }
  setRequestLocale(locale);
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}
      dir={locale === Locales.ar ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <body >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ProvidersLayout>
            {children}
          </ProvidersLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}