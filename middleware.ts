import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { currentUser } from "./lib/actions";
import { Role } from "@prisma/client";

export async function middleware(request: NextRequest) {
  const { user, res, localUser } = await updateSession(request);

  // if page is /account/* and user is not logged in, redirect to /login
  if (request.nextUrl.pathname.startsWith("/account") && !user) {
    return NextResponse.redirect("/login");
  }

  // if page is /account/venues/* and user role is not "landlord" redirect to /account
  if (request.nextUrl.pathname.startsWith("/account/venues")) {
    if (localUser?.role !== Role.LANDLORD) {
      return NextResponse.redirect("/account");
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */

    /**
     * TODO: Add a matcher so the middleware doesn't run on routes that don't access Supabase
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
