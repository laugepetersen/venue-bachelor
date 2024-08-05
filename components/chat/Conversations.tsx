"use client";

import React, { useEffect } from "react";
import ConversationItem from "./ConversationItem";
import { Conversation, Prisma, User } from "@prisma/client";
import { redirect, useSearchParams } from "next/navigation";
import { currentUser } from "@/lib/actions";
import { createClient } from "@/lib/supabase/client";

interface ConversationProps {
  currentUser: User;
  conversations: Prisma.ConversationGetPayload<{
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
  }>[];
}

export default function Conversations(props: ConversationProps) {
  const { currentUser, conversations } = props;
  const [onlineUsers, setOnlineUsers] = React.useState<string[]>([]);

  useEffect(() => {
    const supabase = createClient();
    const messageRoom = supabase.channel("messages");
    const res = messageRoom
      .on("presence", { event: "sync" }, () => {
        const state = messageRoom.presenceState();
        let onlineUsers = [];
        for (const id in state) {
          const sesh: any = state[id][0];
          onlineUsers.push(sesh.user_id);
        }
        setOnlineUsers(onlineUsers);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await messageRoom.track({
            user_id: currentUser.id,
            online_at: new Date(),
          });
        }
      });

    return () => {
      supabase.removeChannel(res);
    };
  }, [currentUser.id]);

  return (
    <div className="overflow-y-scroll">
      <h1 className="h2 m-6 mb-3">Beskeder</h1>
      {conversations.map((conversation, i) => {
        const otherUserId = conversation.users.find(
          (u) => u.id !== currentUser.id
        )?.id;
        if (!otherUserId) return null;
        return (
          <ConversationItem
            otherUserOnline={onlineUsers.includes(otherUserId)}
            key={i}
            conversation={conversation}
            currentUserId={currentUser.id}
            otherUserId={otherUserId}
          />
        );
      })}
    </div>
  );
}
