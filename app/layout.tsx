import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderNav from "@/components/HeaderNav";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { Session } from "@talkjs/react";
import { currentUser } from "@/lib/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VenueBnB",
  description: "Bachelor project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  return (
    <html lang="da">
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background font-sans antialiased text-primary"
        )}
      >
        <HeaderNav />
        <Session appId="tm2MXkLG" userId={user?.id ?? "nothing"}>
          <main className=" min-h-[calc(100vh-71px)]">{children}</main>
        </Session>
      </body>
    </html>
  );
}
