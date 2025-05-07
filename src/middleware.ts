import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  GuestOnlyRoutes,
  ProtectedRoutes,
  RoutesNeedsAssessmentTest,
} from "./config/routes";

const protectedRoutes = Object.values(ProtectedRoutes);
const guestOnlyRoutes = Object.values(GuestOnlyRoutes);

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("Authentication");
  const currentUserCookie = request.cookies.get("current_user");
  const assessmentCookie = request.cookies.get("assesment_test_status");
  const assesmentStatus = assessmentCookie?.value;

  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!authCookie) {
      return NextResponse.redirect(new URL(GuestOnlyRoutes.Login, request.url));
    }
  }

  if (guestOnlyRoutes.some((route) => pathname.startsWith(route))) {
    if (authCookie) {
      return NextResponse.redirect(
        new URL(ProtectedRoutes.SonsFiles, request.url)
      );
    }
  }

  if (RoutesNeedsAssessmentTest.some((route) => pathname.startsWith(route))) {
    // if there is no current user (son), or no assesment status direct to sons files page.
    if (
      !currentUserCookie ||
      !assessmentCookie ||
      assesmentStatus === "undefined"
    ) {
      const response = NextResponse.redirect(
        new URL(ProtectedRoutes.SonsFiles, request.url)
      );

      response.cookies.set("current_user", "", { maxAge: 0 });
      response.cookies.set("assesment_test_status", "", { maxAge: 0 });
      return response;
    }

    // if the status of the assesment test is false direct the user to taking the test
    if (assesmentStatus === "false") {
      return NextResponse.redirect(new URL(ProtectedRoutes.Test, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
