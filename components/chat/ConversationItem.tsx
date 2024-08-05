"use client";

import { currentUser } from "@/lib/actions";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface ConversationItemProps {
  otherUserOnline: boolean;
  currentUserId: string;
  otherUserId: string;
  conversation: Prisma.ConversationGetPayload<{
    select: {
      id: true;
      users: {
        select: {
          id: true;
          name: true;
          email: true;
        };
      };
      messages: {
        take: 1;
        orderBy: {
          createdAt: "desc";
        };
      };
    };
  }>;
}

export default function ConversationItem(props: ConversationItemProps) {
  const { conversation, currentUserId, otherUserId, otherUserOnline } = props;
  const lastMessage = conversation.messages[0];
  const otherUser = conversation.users.find((u) => u.id === otherUserId);
  const params = useSearchParams();
  const active = params.get("id") === conversation.id.toString();

  return (
    <>
      <div
        className={cn(
          "flex gap-3 overflow-hidden px-6 py-3 cursor-pointer hover:bg-color-background-subtle relative",
          active && "bg-color-background-subtle"
        )}
      >
        <Link
          href={`/account/messages?id=${conversation.id}`}
          className="w-full h-full absolute top-0 left-0 z-10"
        />
        <div className="shrink-0 w-12 h-12 rounded-full bg-secondary relative">
          <svg
            className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-10 h-10"
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
        <div className="flex flex-col min-w-0 flex-grow">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-medium overflow-hidden min-w-0 whitespace-nowrap text-ellipsis">
                {otherUser?.name || otherUser?.email}
              </p>
              {otherUserOnline && (
                <span className="inline-block w-2 h-2 rounded-full bg-[#54de54]"></span>
              )}
            </div>
            <p className="text-sm opacity-50 shrink whitespace-nowrap break-keep">
              {lastMessage.createdAt.toLocaleDateString("da-DK", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex gap-2 items-center justify-between">
            <p className="text-sm overflow-hidden min-w-0 whitespace-nowrap text-ellipsis">
              {lastMessage.text}
            </p>
            {/* <p className="text-sm font-semibold shrink-0 whitespace-nowrap break-keep">
            2 ulæste
          </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
