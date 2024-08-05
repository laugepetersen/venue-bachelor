"use client";

import { Check, Heart, MapPin, Star, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import SaveButton from "./SaveButton";
import Rating from "./Rating";
import { User, Venue } from "@prisma/client";
import { cn } from "@/lib/utils";

interface VenueListItemProps {
  venue: Venue;
  user?: User;
  disablePadding?: boolean;
  disableSaveButton?: boolean;
  edit?: boolean;
}

export default function VenueListItem(props: VenueListItemProps) {
  const {
    id,
    name,
    propertyType,
    minCapacity,
    maxCapacity,
    minPrice,
    address,
  } = props.venue;
  const { disablePadding, disableSaveButton, edit, user } = props;

  const href = edit ? `/account/venues/edit?id=${id}` : `/venues/${id}`;

  return (
    <div className={cn("rounded-xl transition-all", !disablePadding && "p-4")}>
      <div className="flex gap-x-6 relative">
        {!disableSaveButton && user && (
          <div className="absolute top-1 right-0 z-10">
            <SaveButton venueId={id} userId={user.id} />
          </div>
        )}
        <div className="aspect-[3/2] rounded-xl bg-secondary w-[300px]"></div>
        <div className="flex flex-col py-2 items-start group cursor-pointer flex-grow relative">
          <Link
            href={href}
            className="absolute top-0 left-0 w-full h-full z-0"
          />
          <p className="text-sm text-secondary">{propertyType}</p>
          <h2 className="text-xl font-semibold mt-0.5 group-hover:underline">
            <Link href={href}>{name}</Link>
          </h2>
          <div className="flex items-center gap-4 mt-3 text-secondary">
            <div className="flex items-center gap-x-1.5">
              <MapPin strokeWidth={1.5} size={18} />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-x-1.5">
              <Users strokeWidth={1.5} size={18} />
              <span>
                {minCapacity}-{maxCapacity}
              </span>
            </div>
          </div>
          {/* <div className="flex items-center flex-wrap gap-x-1.5 gap-y-2 mt-3">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl shadow-item border border-color-border-subtle bg-white">
              <Check size={16} strokeWidth={1.5} />
              <p className="text-sm">Catering</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl shadow-item border border-color-border-subtle bg-white">
              <Check size={16} strokeWidth={1.5} />
              <p className="text-sm">Bar & Personale</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl shadow-item border border-color-border-subtle bg-white">
              <Check size={16} strokeWidth={1.5} />
              <p className="text-sm">AV-udstyr</p>
            </div>
          </div>
          <Rating className="mt-auto" ratingScore={4.2} ratingCount={12} /> */}
        </div>
      </div>
    </div>
  );
}
