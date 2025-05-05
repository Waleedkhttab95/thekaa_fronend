import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GuestOnlyRoutes, ProtectedRoutes } from "./config/routes";

const protectedRoutes = Object.values(ProtectedRoutes);
const guestOnlyRoutes = Object.values(GuestOnlyRoutes);

const levelAssessmentCheckRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("Authentication");
  const currentUserCookie = request.cookies.get("current_user");

  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (guestOnlyRoutes.some((route) => pathname.startsWith(route))) {
    if (authCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (levelAssessmentCheckRoutes.some((route) => pathname.startsWith(route))) {
    if (currentUserCookie) {
      const studentId = currentUserCookie.value;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/student/student/${studentId}/level-assesment-status`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authCookie?.value}`,
            },
          }
        );

        const isAssessmentComplete = await response.json();

        if (!isAssessmentComplete) {
          return NextResponse.redirect(
            new URL(ProtectedRoutes.Test, request.url)
          );
        }
      } catch (error) {
        console.error("Failed to fetch level assessment status:", error);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
