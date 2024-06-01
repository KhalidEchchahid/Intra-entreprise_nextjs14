export { default } from "next-auth/middleware";

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request : any) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  // Check the role and redirect based on the role
  switch (token.role) {
    case "CLIENT":
      if (
        !request.nextUrl.pathname.startsWith("/") &&
        !request.nextUrl.pathname.startsWith("/question") &&
        !request.nextUrl.pathname.startsWith("/profile") &&
        !request.nextUrl.pathname.startsWith("/ask-question") &&
        !request.nextUrl.pathname.startsWith("/community") &&
        !request.nextUrl.pathname.startsWith("/tags") &&
        !request.nextUrl.pathname.startsWith("/community") 
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      break;
    case "ADMIN":
      // Add the paths that the ADMIN can access here
      if (!request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      break;
    default:
      return NextResponse.redirect(new URL("/login", request.url));
  }
}



export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};