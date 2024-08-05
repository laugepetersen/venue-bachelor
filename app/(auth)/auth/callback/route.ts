import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import prisma from "@/lib//prisma";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    console.log("code");
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);

    // if (data.user) {
    //   if (data.user.app_metadata?.provider === "google") {
    //     const user = await prisma.user.findFirst({
    //       where: {
    //         id: data.user.id,
    //       },
    //     });
    //   }
    // }
  } else {
    return NextResponse.redirect(`${origin}/login`);
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/account/profile`);
}
