"use client";

import { sendMessage } from "@/lib/actions";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Message, Prisma, User, Venue } from "@prisma/client";
import { Payload } from "@prisma/client/runtime/library";
import {
  REALTIME_CHANNEL_STATES,
  RealtimeChannel,
} from "@supabase/supabase-js";
import { Paperclip, Plane, SendHorizonal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import Typing from "../Typing";

interface ChatProps {
  conversation:
    | {
        currentUser: User;
        otherUser: User;
        conversationId: number;
        messages: Message[];
        venue: Venue;
      }
    | null
    | undefined;
}

export default function Chat(props: ChatProps) {
  const { conversation } = props;
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [typingChannel, setTypingChannel] = React.useState<RealtimeChannel>();
  const canSend = currentMessage.trim().length > 0;

  useEffect(() => {
    if (!conversation) return;
    setMessages(conversation.messages);
    const supabase = createClient();
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload: any) => {
          if (!conversation) return;
          const msg = payload.new;
          if (
            msg.conversationId === conversation.conversationId &&
            (msg.createdById === conversation?.otherUser.id ||
              msg.createdById === conversation?.currentUser.id)
          ) {
            setMessages((prev) => [...prev, msg]);
          }
        }
      )
      .subscribe();

    const typingChannel = supabase.channel("typing").subscribe((status) => {
      if (status === "SUBSCRIBED") {
        setTypingChannel(typingChannel);
      }
    });

    typingChannel.on("broadcast", { event: "typing" }, (payload: any) => {
      const isTyping = payload.payload.typing;
      const userTyping = payload.payload.userId;
      if (userTyping === conversation.otherUser.id) {
        setIsTyping(isTyping);
      }
    });

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(typingChannel);
    };
  }, [conversation]);

  const handleSendMessage = async () => {
    if (!canSend || !conversation) return;

    try {
      await sendMessage({
        recipientId: conversation.otherUser.id,
        message: currentMessage.trim(),
        venueId: conversation.venue.id,
      });

      setCurrentMessage("");
    } catch (e) {
      alert("Der skete en fejl, kig i consollen");
      console.log(e);
    }
  };

  if (!conversation)
    return <div className="border-x border-x-color-border-subtle p-6"></div>;

  return (
    <div className="border-x border-x-color-border-subtle overflow-y-scroll relative">
      <div className="p-6 min-h-full">
        <div className="grid grid-cols-1 gap-2">
          {messages.map((message, i) => {
            const isMyMessage =
              message.createdById === conversation.currentUser.id;
            const createdAt = new Date(message.createdAt);
            const showDate = (() => {
              if (i <= 0) return true;
              const previousMessageDate = new Date(messages[i - 1].createdAt);
              if (previousMessageDate.getDate() !== createdAt.getDate())
                return true;
              return false;
            })();
            return (
              <div key={i}>
                {showDate && (
                  <div className="text-center opacity-40">
                    <p>
                      {createdAt.getDate()}/
                      {createdAt.getMonth().toString().padStart(2, "0")}/
                      {createdAt.getFullYear()}
                    </p>
                  </div>
                )}
                <div
                  className={cn(
                    "flex gap-2",
                    isMyMessage && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "w-[40px] h-[40px] bg-secondary rounded-full mt-1 relative"
                    )}
                  >
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
                  <div>
                    <div
                      className={cn(
                        "p-3 rounded-lg",
                        isMyMessage ? "bg-[#4161ff]" : "bg-secondary/10"
                      )}
                    >
                      <p className={cn(isMyMessage && "text-white")}>
                        {message.text}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "text-xs mt-0.5",
                        isMyMessage && "text-right"
                      )}
                    >
                      {createdAt.getHours()}:
                      {createdAt.getMinutes().toString().padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div className={cn("flex gap-2")}>
              <div
                className={cn(
                  "w-[40px] h-[40px] bg-secondary rounded-full mt-1 relative"
                )}
              >
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
              <div>
                <div className={cn("p-3 rounded-lg", "bg-secondary/10")}>
                  <Typing />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/90 p-6 border-t border-solid border-color-border-subtle sticky z-10 bottom-0 w-full flex items-center gap-3 backdrop-blur-md">
        <div className=" shirnk-0">
          <Paperclip size={24} />
        </div>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => {
            const currVal = e.target.value.trim();
            setCurrentMessage((prev) => {
              if (currVal.length > 0 && prev.length === 0) {
                typingChannel?.send({
                  type: "broadcast",
                  event: "typing",
                  payload: {
                    typing: true,
                    userId: conversation.currentUser.id,
                    conversationId: conversation.conversationId,
                  },
                });
              } else if (currVal.length === 0 && prev.length > 0) {
                typingChannel?.send({
                  type: "broadcast",
                  event: "typing",
                  payload: {
                    typing: false,
                    userId: conversation.currentUser.id,
                    conversationId: conversation.conversationId,
                  },
                });
              }
              return currVal;
            });
          }}
          placeholder="Skriv en besked"
          className="rounded-md bg-secondary/10 p-3 grow outline-none"
        />
        <button
          className={cn(
            "p-3 text-white rounded-md",
            canSend ? "cursor-pointer bg-[#4161ff]" : "bg-secondary"
          )}
          disabled={!canSend}
          onClick={handleSendMessage}
        >
          <SendHorizonal size={24} />
        </button>
      </div>
    </div>
  );
}
