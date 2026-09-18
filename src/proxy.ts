import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "./actions/auth";

const AuthRoutes = ["/login", "/register", "/forgot-password"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  USER: [/^\/dashboard/], 
  ADMIN: [/^\/admin/],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthRoute = AuthRoutes.includes(pathname);

  const token = request.cookies.get("token")?.value || request.cookies.get("accessToken")?.value;

  if (!token) {
    if (isAuthRoute) {
      return NextResponse.next();
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const user = await getCurrentUser(request);

    if (!user) {
      if (isAuthRoute) return NextResponse.next();
      
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete("token");
      res.cookies.delete("accessToken");
      return res;
    }

    if (isAuthRoute) {
      const redirectPath = user.role === "ADMIN" ? "/admin" : "/dashboard";
      return NextResponse.redirect(new URL(redirectPath, request.url));
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

    if (isAuthRoute) {
      return NextResponse.next();
    }

    const loginUrl = new URL("/login", request.url);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("token");
    res.cookies.delete("accessToken");
    return res;
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