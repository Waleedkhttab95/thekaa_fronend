import { getLocale, getMessages } from "next-intl/server";
import { Locales } from "@/types/locales.enum";
import ProvidersLayout from "@/components/layouts/ProvidersLayout";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ibmPlexSansArabic, pingAR, tajawal } from "@/config/fonts";
import MainLayout from "@/components/layouts/MainLayout";
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      dir={locale === Locales.ar ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`${pingAR.className} ${ibmPlexSansArabic.className} ${tajawal.className} `}
      >
        <NextIntlClientProvider messages={messages}>
          <ProvidersLayout>
            <MainLayout>
              {children}
            </MainLayout>
          </ProvidersLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
