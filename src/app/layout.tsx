import { getLocale, getMessages } from "next-intl/server";
import { Locales } from "@/types/locales.enum";
import ProvidersLayout from "@/app/components/layouts/ProvidersLayout";
import "./global.css";
import { NextIntlClientProvider } from "next-intl";
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
      <body>
        <NextIntlClientProvider messages={messages}>
          <ProvidersLayout>{children}</ProvidersLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
