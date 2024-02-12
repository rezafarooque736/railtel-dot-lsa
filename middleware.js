import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { role } = req.nextauth.token;
    const { dotLsaLocation: state } = req.nextauth.token;

    // Check if the user has the "admin" role
    if (state === "railtel" && role !== "admin") {
      // Check if the user is trying to access the railtel view route
      if (req.nextUrl.pathname !== `/lsa/${state}/view`) {
        // Redirect railtel users to the railtel view route
        return NextResponse.redirect(new URL(`/lsa/${state}/view`, req.url));
      }
    }

    if (state !== "railtel") {
      // Check if the user is trying to access the railtel view route
      if (req.nextUrl.pathname !== `/lsa/${state}/view`) {
        // Redirect railtel users to the railtel view route
        return NextResponse.redirect(new URL(`/lsa/${state}/view`, req.url));
      }
    }
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/auth/sign-in",
    },
    callbacks: {
      // authorized: ({ token }) => token?.role === "admin",
      authorized: ({ token }) => !!token,
    },
    // Matches the pages config in `auth.ts => authOptions`
  }
);

// If you only want to secure certain pages, export a config object with a matcher
// export const config = { matcher: ["/protected", "/admin"] };
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|auth|favicon.ico).*)",
  ],
};
