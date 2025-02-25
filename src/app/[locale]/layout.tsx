import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Locales } from '@/types/locales.enum';
import ProvidersLayout from '@/components/layouts/ProvidersLayout';
import '../global.css'
import { NextIntlClientProvider } from 'next-intl';
import { ibmPlexSansArabic, pingAR, tajawal } from '@/config/fonts';
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
      <body
        className={`${pingAR.className} ${ibmPlexSansArabic.className} ${tajawal.className}`}

      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ProvidersLayout>
            {children}
            <h1 className="font-tajawal font-bold">بيزووو</h1>
            <h1 className="font-pingar font-medium">بيزووو</h1>
            <h1 className="font-ibm font-regular">بيزووو</h1>
          </ProvidersLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}