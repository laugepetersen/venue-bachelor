import Chat from "@/components/chat/Chat";
import ChatDetails from "@/components/chat/ChatDetails";
import Conversations from "@/components/chat/Conversations";
import { currentUser } from "@/lib/actions";
import prisma from "@/lib/prisma";
import { Conversation } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const revalidate = 0;

export default async function page({
  searchParams,
}: {
  searchParams: { id: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return redirect("/login");

  const conversations = await prisma.conversation.findMany({
    where: {
      users: {
        some: {
          id: user.id,
        },
      },
    },
    select: {
      id: true,
      users: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      messages: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
      venue: true,
    },
  });

  let currentConversation: any;
  const conversationId = searchParams.id;
  if (conversationId) {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: +conversationId,
      },
      include: {
        messages: true,
        users: true,
        venue: true,
      },
    });
    if (conversation) {
      const otherUser = conversation.users.find((u) => u.id !== user.id);
      if (otherUser) {
        currentConversation = {
          conversationId: conversation.id,
          currentUser: user,
          otherUser: otherUser,
          messages: conversation.messages,
          venue: conversation.venue,
        };
      }
    }
  }

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] h-[calc(100vh-71px)]">
      <Conversations currentUser={user} conversations={conversations} />
      <Chat conversation={currentConversation} />
      <div>
        {currentConversation && (
          <ChatDetails venue={currentConversation.venue} />
        )}
      </div>
    </div>
  );
}
