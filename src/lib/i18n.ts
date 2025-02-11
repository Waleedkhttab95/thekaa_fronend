/* eslint-disable @typescript-eslint/no-explicit-any */
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

import nextI18NextConfig from "../../next-i18next.config";

export const initTranslations = async (
  locale: string,
  namespaces: string[]
) => {
  const i18nInstance = i18next.createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: any, namespace: any) =>
          import(`../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init({
      lng: locale,
      fallbackLng: nextI18NextConfig.i18n.defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
    });

  return i18nInstance;
};
