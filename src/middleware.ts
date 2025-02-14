import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except ones starting with /dashboard
    "/((?!dashboard|api|_next|.*\\..*).*)",

    // Also match root
    "/",
  ],
};
