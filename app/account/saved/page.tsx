import VenueListItem from "@/components/VenueListItem";
import { currentUser, getSaved, getVenues } from "@/lib/actions";
import React from "react";

export default async function page() {
  const savedVenues = await getSaved();
  const user = await currentUser();
  const venues = (await getVenues()).filter((venue) =>
    savedVenues.some((savedVenue) => savedVenue.venueId === venue.id)
  );
  return (
    <div className="p-12">
      <h1 className="h2 mb-6">Gemt</h1>
      <div className="max-w-[800px] grid grid-cols-1 gap-4">
        {venues.map((venue) => (
          <VenueListItem
            disablePadding
            venue={venue}
            user={user ?? undefined}
            key={venue.id}
          />
        ))}
      </div>
    </div>
  );
}
