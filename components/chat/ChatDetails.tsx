import { Venue } from "@prisma/client";
import React from "react";
import VenueListItem from "../VenueListItem";

interface ChatDetailsProps {
  venue: Venue;
}
export default function ChatDetails(props: ChatDetailsProps) {
  const { venue } = props;

  return <VenueListItem venue={venue} />;
}
