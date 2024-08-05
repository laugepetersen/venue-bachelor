"use client";
import { signOut } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import React from "react";

interface LogOutButtonProps {
  onlyIcon?: boolean;
}
export default function LogOutButton(props: LogOutButtonProps) {
  const menuItemStyles =
    "flex items-center gap-3 p-3 rounded-xl font-medium transition-all";

  return (
    <button
      onClick={async () => await signOut()}
      className={cn(
        "text-[#f16a6a] hover:bg-[#f16a6a]/5 w-full",
        menuItemStyles
      )}
    >
      <LogOut strokeWidth={1.5} size={20} />
      {props.onlyIcon !== true && <span>Log ud</span>}
    </button>
  );
}
