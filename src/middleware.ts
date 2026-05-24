import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/hr/:path*",
    "/backoffice/:path*",
    "/settings/:path*"
  ],
};
