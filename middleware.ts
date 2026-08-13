export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: ["/dashboard/:path*", "/practice/:path*", "/api/profile/:path*"],
};
