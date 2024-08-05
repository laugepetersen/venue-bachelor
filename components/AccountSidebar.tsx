import React, { useLayoutEffect, useState } from "react";
import SideBarLink from "./SideBarLink";

import { usePathname, useRouter } from "next/navigation";
import { User } from "@prisma/client";
import {
  Building2,
  CreditCard,
  Heart,
  Mail,
  MailPlus,
  UserRound,
} from "lucide-react";
import { currentUser } from "@/lib/actions";
import LogOutButton from "./LogOutButton";
import { headers } from "next/headers";

export default async function AccountSidebar() {
  const user = await currentUser();
  const menuSlim = false;

  return (
    <div className="border-r border-color-border-subtle p-4 flex flex-col gap-1 sticky top-[71px] h-[calc(100vh-71px)]">
      <SideBarLink
        href="/account/profile"
        title="Min konto"
        icon={<UserRound strokeWidth={1.5} size={20} />}
      />
      {user?.role === "LANDLORD" && (
        <SideBarLink
          title="Lokaler"
          href="/account/venues"
          icon={<Building2 strokeWidth={1.5} size={20} />}
        />
      )}
      <SideBarLink
        href="/account/messages-sdk"
        title="Beskeder SDK"
        icon={<MailPlus strokeWidth={1.5} size={20} />}
      />
      <SideBarLink
        href="/account/messages"
        title="Beskeder"
        icon={<Mail strokeWidth={1.5} size={20} />}
      />
      <SideBarLink
        href="/account/saved"
        title="Gemte"
        icon={<Heart strokeWidth={1.5} size={20} />}
      />
      <SideBarLink
        href="/account/billing-and-history"
        title="Betaling & historik"
        icon={<CreditCard strokeWidth={1.5} size={20} />}
      />
      <LogOutButton />
    </div>
  );
}
