import AccountSidebar from "@/components/AccountSidebar";
import LogOutButton from "@/components/LogOutButton";
import SideBarLink from "@/components/SideBarLink";
import { currentUser } from "@/lib/actions";
import { User } from "@prisma/client";
import { Building2, CreditCard, Heart, Mail, UserRound } from "lucide-react";
import { headers } from "next/headers";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-start relative">
      <AccountSidebar />
      <div>{props.children}</div>
    </div>
  );
}
