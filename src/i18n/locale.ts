"use server";

import { Locales } from "@/types/locales.enum";
import { cookies } from "next/headers";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || Locales.ar;
}

export async function setUserLocale(locale: Locales) {
  (await cookies()).set(COOKIE_NAME, locale);
}
