import VenueListItem from "@/components/VenueListItem";
import { currentUser, getVenues } from "@/lib/actions";
import { Venue } from "@prisma/client";
import { Heart, MapPin, Star, Users } from "lucide-react";
import { M_PLUS_1 } from "next/font/google";
import Link from "next/link";
import React from "react";

export default async function page() {
  const venues = await getVenues();
  const user = await currentUser();

  return (
    <div className="h-[calc(100vh-71px)] flex">
      <div className="w-[60%] border-r border-color-border-subtle overflow-y-scroll relative">
        <div className="border-b border-color-border-subtle bg-color-background-subtle z-10 h-12 grid place-items-center text-secondary sticky top-0 left-0">
          &lt;Filter&gt;
        </div>
        <div className="grid grid-cols-1 p-4">
          {venues.map((venue) => {
            return (
              <VenueListItem
                key={venue.id}
                user={user ?? undefined}
                venue={venue}
              />
            );
          })}
        </div>
      </div>
      <div className="w-[40%] bg-color-background-subtle grid place-items-center">
        <span className="text-secondary">&lt;GoogleMaps&gt;</span>
      </div>
    </div>
  );
}
