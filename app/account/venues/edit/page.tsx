"use client";

import Button from "@/components/Button";
import {
  createVenue,
  currentUser,
  deleteVenue,
  getUserVenues,
  updateVenue,
} from "@/lib/actions";
import { User, Venue } from "@prisma/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [venue, setVenue] = useState<Venue>();

  useEffect(() => {
    const fetchVenue = async () => {
      const venueId = searchParams.get("id");
      const venues = await getUserVenues();
      if (!venues || !venueId) {
        return router.replace("/account/venues");
      }
      const venue = venues.find((venue) => venue.id === +venueId);
      if (!venue) {
        return router.replace("/account/venues");
      }
      setVenue(venue);
    };
    fetchVenue();
  }, [router, searchParams]);

  return (
    <div className="p-12">
      <div className="mb-6">
        <h1 className="h2 mb-2">
          <Link href="/account/venues" className="opacity-50">
            Lokaler /
          </Link>{" "}
          Redigér
        </h1>
        <Link
          target="_blank"
          href={`/venues/${venue?.id}`}
          className="opacity-50 underline"
        >{`http:/localhost:3000/venues/${venue?.id}`}</Link>
      </div>
      <form className="max-w-[450px] grid grid-cols-1 gap-4">
        {venue && <input type="hidden" name="id" value={venue.id} />}
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="name">Lokalets navn</label>
          <input
            type="text"
            name="name"
            defaultValue={venue?.name}
            placeholder="Lokale Navn"
            className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
          />
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="propertyType">Lokaletype</label>
          <input
            type="text"
            name="propertyType"
            defaultValue={venue?.propertyType}
            placeholder="Lokaletype"
            className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
          />
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="minCapacity">Minimum kapacitet</label>
          <input
            type="number"
            name="minCapacity"
            defaultValue={venue?.minCapacity}
            placeholder="Minimum kapacitet"
            className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
          />
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="maxCapacity">Maximum kapacitet</label>
          <input
            type="number"
            name="maxCapacity"
            defaultValue={venue?.maxCapacity}
            placeholder="Maximum kapacitet"
            className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
          />
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="minPrice">Minimum pris</label>
          <input
            type="number"
            name="minPrice"
            defaultValue={venue?.minPrice}
            placeholder="Minimum pris"
            className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
          />
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            name="address"
            defaultValue={venue?.address}
            placeholder="Adresse"
            className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button
            formAction={updateVenue}
            variant="success"
            title="Gem ændringer"
            type="submit"
            className="mt-4"
          />
          <Button
            formAction={() => venue && deleteVenue(venue.id)}
            variant="danger"
            title="Slet"
            type="submit"
            className="mt-4"
          />
        </div>
      </form>
    </div>
  );
}
