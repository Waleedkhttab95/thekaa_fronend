import { IBM_Plex_Sans_Arabic, Tajawal } from "next/font/google";
import localFont from "next/font/local";
export const pingAR = localFont({
  src: [
    {
      path: "../../public/fonts/ping-ar-lt/regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ping-ar-lt/medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ping-ar-lt/bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pingar",
});
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ["400", "500", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-ibm",
});

export const tajawal = Tajawal({
  weight: ["400", "500", "700"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-tajawal",
});
