import Button from "@/components/Button";
import { createVenue, currentUser } from "@/lib/actions";
import { User } from "@prisma/client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default async function Page() {
  // const user = await currentUser();
  // if (!user || user.role !== "LANDLORD") return redirect("/account/profile");
  return (
    <div className="p-12">
      <h1 className="h2 mb-6">
        <Link href="/account/venues" className="opacity-50">
          Lokaler /
        </Link>{" "}
        Opret
      </h1>
      <form
        action={createVenue}
        className="max-w-[450px] grid grid-cols-1 gap-4"
      >
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="name">Lokalets navn</label>
          <input
            type="text"
            name="name"
            placeholder="Lokale Navn"
            className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
          />
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="propertyType">Lokaletype</label>
          <input
            type="text"
            name="propertyType"
            placeholder="Lokaletype"
            className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
          />
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="minCapacity">Minimum kapacitet</label>
          <input
            type="number"
            name="minCapacity"
            placeholder="Minimum kapacitet"
            className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
          />
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="maxCapacity">Maximum kapacitet</label>
          <input
            type="number"
            name="maxCapacity"
            placeholder="Maximum kapacitet"
            className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
          />
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="minPrice">Minimum pris</label>
          <input
            type="number"
            name="minPrice"
            placeholder="Minimum pris"
            className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
          />
        </div>
        <div className="grid grid-cols-1 gap-1">
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
          />
        </div>
        <Button title="Opret" type="submit" className="mt-4" />
      </form>
    </div>
  );
}
