import { Chatbox, Inbox } from "@talkjs/react";
import React from "react";
import jwt from "jsonwebtoken";
import Chat from "@/components/chat/Chat";

export default async function page() {
  return (
    <div className="w-full h-[calc(100vh-71px)]">
      <Inbox style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
