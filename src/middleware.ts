import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/settings",
  "/user-management",
  "/chat-history",
  "/create-new-admin",
];

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("next-auth.accessToken")?.value; // ✅ Get access token from cookies
  const currentPath = request.nextUrl.pathname;

  console.log("AccessToken:", accessToken); // Debugging: Log the access token value

  if (accessToken && authRoutes.includes(currentPath)) {
    console.log("Redirecting authenticated user to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is NOT logged in and trying to visit protected routes (dashboard, settings, etc.), redirect to login
  if (
    !accessToken &&
    protectedRoutes.some((route) => currentPath.startsWith(route))
  ) {
    console.log("Redirecting unauthenticated user to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to continue if no conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/settings",
    "/user-management",
    "/chat-history",
    "/create-new-admin",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
