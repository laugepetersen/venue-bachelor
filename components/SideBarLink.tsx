"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface SideBarLinkProps {
  className?: string;
  title: string;
  href: string;
  icon: React.ReactNode;
  onlyIcon?: boolean;
}

export default function SideBarLink(props: SideBarLinkProps) {
  const activeStyles = "text-primary";
  const menuItemStyles =
    "flex items-center gap-3 p-3 hover:bg-color-background-subtle rounded-xl font-medium transition-all text-secondary";
  const pathname = usePathname();

  return (
    <Link
      href={props.href}
      className={cn(
        menuItemStyles,
        pathname.startsWith(props.href) && activeStyles,
        props.className
      )}
    >
      <>{props.icon}</>
      {props.onlyIcon !== true && <span>{props.title}</span>}
    </Link>
  );
}
