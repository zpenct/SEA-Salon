import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
// import { auth } from "@/auth"
import { auth } from "../auth";

const secret = process.env.AUTH_SECRET;

export async function middleware(request: NextRequest) {
  console.log("middleware");
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  switch (session?.user?.role) {
    case "CUSTOMER":
      if (
        !request.nextUrl.pathname.startsWith("/services") &&
        !request.nextUrl.pathname.startsWith("/feedback") &&
        !request.nextUrl.pathname.startsWith("/me")
      ) {
        console.log("Anda tidak punya akses ke halaman ini - customer");
        return NextResponse.redirect(new URL("/me", request.url));
      }
      break;
    case "ADMIN":
      if (!request.nextUrl.pathname.startsWith("/dashboard")) {
        console.log("Anda tidak punya akses ke halaman ini - ADMIN");
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      break;
    default:
      return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/me/:path*", "/services/:path*"],
};
