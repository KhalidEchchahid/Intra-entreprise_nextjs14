export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/ask-question", "/dashboard/:path*", "/profile/:path*"],
};
