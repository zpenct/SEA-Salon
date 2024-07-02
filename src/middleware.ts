import { NextResponse, NextRequest } from "next/server";
import { auth } from "../auth";

const unauthenticatedRoutes = ["/signin", "/signup"];

export default auth((request) => {
  console.log("middleware");
  const user = request.auth?.user;

  if (!user) {
    console.log("Anda harus login dulu");
    if (unauthenticatedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/signin", request.nextUrl.origin));
  } else {
    console.log("Anda sudah login");
    if (request.nextUrl.pathname === "/api/auth/signout") {
      return NextResponse.next();
    }
  }

  const role = user?.role;

  switch (role) {
    case "CUSTOMER":
      if (
        !request.nextUrl.pathname.startsWith("/services") &&
        !request.nextUrl.pathname.startsWith("/me")
      ) {
        console.log("Anda tidak punya akses ke halaman ini - customer");

        if (unauthenticatedRoutes.includes(request.nextUrl.pathname)) {
          return NextResponse.redirect(new URL("/me", request.nextUrl.origin));
        } else {
          console.log("unauthenticatedRoutes else - customer");
        }
        return NextResponse.redirect(new URL("/me", request.nextUrl.origin));
      } else {
        console.log("Customer else");
      }
      break;
    case "ADMIN":
      if (!request.nextUrl.pathname.startsWith("/dashboard")) {
        console.log("Anda tidak punya akses ke halaman ini - ADMIN");
        if (unauthenticatedRoutes.includes(request.nextUrl.pathname)) {
          return NextResponse.redirect(
            new URL("/dashboard", request.nextUrl.origin),
          );
        } else {
          console.log("unauthenticatedRoutes else - ADMIN");
        }

        return NextResponse.redirect(
          new URL("/dashboard", request.nextUrl.origin),
        );
      } else {
        console.log("Admin else");
      }
      break;
    default:
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/me/:path*",
    "/services/:path*",
    "/signin",
    "/signup",
    "/api/auth/signout",
  ],
};
