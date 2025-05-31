import { Locales } from "@/types/locales.enum";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function Loading() {
  const locale = useLocale();
  return (
    <div className="fixed inset-0 z-50 bg-background/80">
      <div className="w-full h-dvh grid place-content-center">
        {locale === Locales.en ? (
          <Image
            src={"/assets/images/en-logo.svg"}
            alt="Logo"
            width={150}
            height={150}
            className="h-20 w-96 animate-bounce text-foreground/20 px-8"
          />
        ) : (
          <Image
            src={"/assets/images/ar-logo.svg"}
            alt="Logo"
            width={150}
            height={150}
            className="h-20 w-96 animate-bounce text-foreground/20 px-8"
          />
        )}
      </div>
    </div>
  );
}
