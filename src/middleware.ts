// import { NextResponse, NextRequest } from "next/server";
// import { auth } from "../auth";

// export async function middleware(request: NextRequest) {
//   console.log("middleware");
//   const session = await auth();

//   if (!session) {
//     return NextResponse.redirect(new URL("/signin", request.url));
//   }

//   switch (session?.user?.role) {
//     case "CUSTOMER":
//       if (
//         !request.nextUrl.pathname.startsWith("/services") &&
//         !request.nextUrl.pathname.startsWith("/feedback") &&
//         !request.nextUrl.pathname.startsWith("/me")
//       ) {
//         console.log("Anda tidak punya akses ke halaman ini - customer");
//         return NextResponse.redirect(new URL("/me", request.url));
//       }
//       break;
//     case "ADMIN":
//       if (!request.nextUrl.pathname.startsWith("/dashboard")) {
//         console.log("Anda tidak punya akses ke halaman ini - ADMIN");
//         return NextResponse.redirect(new URL("/dashboard", request.url));
//       }
//       break;
//     default:
//       return NextResponse.redirect(new URL("/signin", request.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/me/:path*", "/services/:path*"],
// };

import { NextResponse, NextRequest } from "next/server";
import { auth } from "../auth";

export default auth((request) => {
  console.log(request.auth?.user.role);
  const user = request.auth?.user;
  const role = user.role;

  console.log("middleware");
  // const user = await auth();

  if (!user) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl.origin));
  }

  switch (role) {
    case "CUSTOMER":
      if (
        !request.nextUrl.pathname.startsWith("/services") &&
        !request.nextUrl.pathname.startsWith("/feedback") &&
        !request.nextUrl.pathname.startsWith("/me")
      ) {
        console.log("Anda tidak punya akses ke halaman ini - customer");
        return NextResponse.redirect(new URL("/me", request.nextUrl.origin));
      }
      break;
    case "ADMIN":
      if (!request.nextUrl.pathname.startsWith("/dashboard")) {
        console.log("Anda tidak punya akses ke halaman ini - ADMIN");
        return NextResponse.redirect(
          new URL("/dashboard", request.nextUrl.origin),
        );
      }
      break;
    default:
      return NextResponse.redirect(new URL("/signin", request.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/me/:path*", "/services/:path*"],
};
