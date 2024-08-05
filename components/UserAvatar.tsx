"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  CreditCard,
  Heart,
  LogOut,
  Mail,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import LogOutButton from "./LogOutButton";
import { User } from "@prisma/client";

interface UserAvatarProps {
  user: User;
}

export default function UserAvatar(props: UserAvatarProps) {
  const { user } = props;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const avatarRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.document.addEventListener(
      "click",
      (e) => {
        if (!menuOpen) return;
        if (avatarRef.current && avatarRef.current.contains(e.target as Node))
          return;
        setMenuOpen(false);
      },
      { capture: true }
    );
    return () => {
      window.document.removeEventListener("click", () => {});
    };
  }, [menuOpen]);

  const menuItemStyles =
    "flex items-center gap-3 p-3 hover:bg-color-background-subtle rounded-xl font-medium transition-all text-secondary";
  const activeStyles = "text-primary";

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer items-center gap-3 border border-solid border-primary rounded-full p-0.5"
        onClick={() => setMenuOpen((prev) => !prev)}
        ref={avatarRef}
      >
        {user.name && (
          <p className="font-medium pl-3 select-none">{user.name}</p>
        )}
        <div className="w-10 h-10 rounded-full bg-primary overflow-hidden relative">
          <div className="box-border absolute top-0 z-10 left-0 w-full h-full rounded-full"></div>
          <svg
            className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-8 h-8"
            width="36"
            height="35"
            viewBox="0 0 36 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 21C22.8325 21 26.75 16.299 26.75 10.5C26.75 4.70101 22.8325 0 18 0C13.1675 0 9.25 4.70101 9.25 10.5C9.25 16.299 13.1675 21 18 21Z"
              fill="white"
            />
            <path
              d="M35.1499 29.925C33.5749 26.775 30.5999 24.15 26.7499 22.575C25.6999 22.225 24.4749 22.225 23.5999 22.75C21.8499 23.8 20.0999 24.325 17.9999 24.325C15.8999 24.325 14.1499 23.8 12.3999 22.75C11.5249 22.4 10.2999 22.225 9.24989 22.75C5.39989 24.325 2.42489 26.95 0.849891 30.1C-0.375109 32.375 1.54989 35 4.17489 35H31.8249C34.4499 35 36.3749 32.375 35.1499 29.925Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, originX: "100%", originY: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-[calc(100%+8px)] grid grid-cols-1 right-0 w-[250px] rounded-xl rounded-tr-none p-2 bg-white border border-color-border-subtle shadow-lg"
          >
            <Link
              href="/account/profile"
              className={cn(
                menuItemStyles,
                pathname.startsWith("/account/profile") && activeStyles
              )}
            >
              <UserRound strokeWidth={1.5} size={20} />
              <span>Min konto</span>
            </Link>
            <Link
              href="/account/venues"
              className={cn(
                menuItemStyles,
                pathname.startsWith("/account/venues") && activeStyles
              )}
            >
              <Building2 strokeWidth={1.5} size={20} />
              <span>Lokaler</span>
            </Link>
            <Link
              href="/account/messages"
              className={cn(
                menuItemStyles,
                pathname.startsWith("/account/messages") && activeStyles
              )}
            >
              <Mail strokeWidth={1.5} size={20} />
              <div className="flex justify-between flex-grow">
                <span>Beskeder</span>
                <span className="text-sm text-secondary">• 4 nye</span>
              </div>
            </Link>
            <Link
              href="/account/saved"
              className={cn(
                menuItemStyles,
                pathname.startsWith("/account/saved") && activeStyles
              )}
            >
              <Heart strokeWidth={1.5} size={20} />
              <span>Gemte</span>
            </Link>
            <Link
              href="/account/billing-and-history"
              className={cn(
                menuItemStyles,
                pathname.startsWith("/account/billing-and-history") &&
                  activeStyles
              )}
            >
              <CreditCard strokeWidth={1.5} size={20} />
              <span>Betaling & historik</span>
            </Link>
            <LogOutButton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
