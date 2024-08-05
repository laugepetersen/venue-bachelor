import Button from "@/components/Button";
import VenueListItem from "@/components/VenueListItem";
import withRole from "@/components/withRole";
import { currentUser, getUserVenues } from "@/lib/actions";
import { Role } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  // const user = await currentUser();
  // if (!user || user.role !== "LANDLORD") return redirect("/account/profile");
  const venues = await getUserVenues();
  return (
    <div className="p-12">
      <h1 className="h2">Lokaler</h1>
      <div className="grid grid-cols-1 gap-4 my-6">
        {venues.map((venue) => (
          <VenueListItem
            disablePadding
            disableSaveButton
            edit
            venue={venue}
            key={venue.id}
          />
        ))}
      </div>
      <Button title="Opret lokale" href="/account/venues/new" />
    </div>
  );
}
