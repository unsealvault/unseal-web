import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "./graphql/auth/auth.server";

const AuthRoutes = ["/login", "/register", "/forgot-password"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  USER: [/^\/dashboard/], 
  ADMIN: [/^\/admin/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip expensive API calls for public auth routes if unauthenticated, 
  // or handle them cleanly.
  const isAuthRoute = AuthRoutes.includes(pathname);

  try {
    // Pass request headers/cookies so the backend can read the JWT token
    const user = await getCurrentUser(request);
    
    console.log("Middleware user:", user?.email, user?.role || "No User");

    if (user && isAuthRoute) {
      const redirectPath = user.role === "ADMIN" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    if (isAuthRoute) {
      return NextResponse.next();
    }
    
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (user?.role && roleBasedRoutes[user.role as Role]) {
      const routes = roleBasedRoutes[user.role as Role];

      if (routes.some((route) => pathname.match(route))) {
        return NextResponse.next();
      }
    }

    return NextResponse.redirect(new URL("/", request.url));

  } catch (error) {
    console.error("Middleware Auth Error:", error);
    
    // If it's already an auth route, let them stay on login/register
    if (isAuthRoute) {
      return NextResponse.next();
    }

    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};