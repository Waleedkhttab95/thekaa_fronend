import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { GuestOnlyRoutes, ProtectedRoutes } from "./config/routes";

const protectedRoutes = Object.values(ProtectedRoutes);
const guestOnlyRoutes = Object.values(GuestOnlyRoutes);

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("Authentication");

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
