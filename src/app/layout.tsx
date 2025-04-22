import { getLocale, getMessages } from "next-intl/server";
import { Locales } from "@/types/locales.enum";
import ProvidersLayout from "@/components/layouts/ProvidersLayout";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ibmPlexSansArabic, pingAR, tajawal } from "@/config/fonts";
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  const locale = (await getLocale()) as keyof typeof metadataTranslations;
  const metadataTranslations = {
    en: {
      title: {
        template: "%s | Thekaa",
        default: "Home",
      },
    },
    ar: {
      title: {
        default: "ذكاء | الصفحة الرئيسية",
        template: "%s | ذكاء",
      },
    },
  };
  return metadataTranslations[locale];
}
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
        className={` ${pingAR.variable} ${ibmPlexSansArabic.variable} ${tajawal.variable} `}
      >
        <NextIntlClientProvider messages={messages}>
          <ProvidersLayout>{children}</ProvidersLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
