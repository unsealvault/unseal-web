import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "./graphql/auth/auth.server";

const AuthRoutes = ["/login", "/register", "/forgot-password"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  USER: [/^\/dashboard/,], 
  ADMIN: [/^\/admin/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Grant immediate access if the user is visiting an Auth Page (login, register, etc.)
  // This prevents the "Unauthorized" GraphQL error from triggering before the page loads.
  if (AuthRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  try {
    // 2. Fetch user data for protected routes
    const user = await getCurrentUser();
    
    // Debugging (optional)
    console.log("Middleware user:", user?.email, user?.role || "No User");

    // 3. If no user is found, redirect to login with the original destination as a query param
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 4. Handle Role-based access control
    if (user?.role && roleBasedRoutes[user.role as Role]) {
      const routes = roleBasedRoutes[user.role as Role];

      // If the current path matches the allowed routes for the user's role
      if (routes.some((route) => pathname.match(route))) {
        return NextResponse.next();
      }
    }

    // 5. Default fallback: redirect to home if role permissions don't match
    return NextResponse.redirect(new URL("/", request.url));

  } catch (error) {
    // 6. Handle potential GraphQL/Network errors (e.g., Token expired or Invalid)
    // Catching the error here prevents the "Unauthorized" runtime crash.
    console.error("Middleware Auth Error:", error);
    
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Configuration to define which paths this middleware should run on
export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};