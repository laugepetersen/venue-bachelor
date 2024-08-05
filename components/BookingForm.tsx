"use client";

import React, { ButtonHTMLAttributes } from "react";
import Button from "./Button";
import { User, Venue } from "@prisma/client";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { sendMessage } from "@/lib/actions";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

interface BookingFormProps {
  venue: Venue;
  user?: User;
}

export default function BookingForm(props: BookingFormProps) {
  const { venue, user } = props;
  const [message, setMessage] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await sendMessage({
        recipientId: venue.userId,
        message: message,
        venueId: venue.id,
      });
      setMessage("");
      router.push(`/account/messages/?id=${res.conversationId}`);
    } catch (e) {
      alert("Der skete en fejl, kig i consollen");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="sticky top-[105px] w-[440px] rounded-2xl shadow-xl bg-white border border-color-border-subtle p-6"
      action={() => {}}
    >
      <div className="text-center mb-6">
        <p className="text-sm font-medium text-secondary">{venue.name}</p>
        <p className="text-lg">Lej dette lokale</p>
      </div>
      <textarea
        className="rounded-xl resize-none w-full h-[250px] p-4 border border-color-border outline-none"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Beskriv dit arrangement..."
      ></textarea>
      <Button
        title={"Send forespørgsel"}
        renderRight={isLoading && <LoadingSpinner />}
        onClick={handleSubmit}
        disabled={
          message.length === 0 || venue.userId === user?.id || isLoading
        }
        className={cn(
          "mt-4 w-full",
          message.length === 0 || isLoading ? "opacity-50" : "cursor-pointer"
        )}
      />
      {venue.userId === user?.id && (
        <p className="text-center text-xs text-secondary mt-2">
          Du kan ikke sende en forespørgsel til dit eget lokale.
        </p>
      )}
    </form>
  );
}
