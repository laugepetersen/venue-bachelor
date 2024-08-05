import BookingForm from "@/components/BookingForm";
import Button from "@/components/Button";
import Gallery from "@/components/Gallery";
import Rating from "@/components/Rating";
import SaveButton from "@/components/SaveButton";
import Input from "@/components/form/Input";
import { currentUser, getVenue } from "@/lib/actions";
import { Building, MapPin, Users } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default async function page(props: Props) {
  const venue = await getVenue(parseInt(props.params.id));
  if (!venue) notFound();

  const user = await currentUser();

  return (
    <>
      <Gallery className="my-8" />
      <div className="container">
        <div className="flex items-start relative gap-20 my-8">
          <div className="flex-grow">
            <div className="relative">
              {/* <Rating ratingScore={4.3} ratingCount={12} /> */}
              {user && (
                <div className="absolute top-0 right-0">
                  <SaveButton userId={user.id} venueId={venue.id} text={true} />
                </div>
              )}
              <h1 className="text-3xl font-semibold mt-1">
                {venue.name} af {venue.user.name}
              </h1>
              <div className="flex items-center gap-4 mt-4 text-secondary">
                <div className="flex items-center gap-x-1.5">
                  <Building strokeWidth={1.5} size={18} />
                  <span>{venue.propertyType}</span>
                </div>
                <div className="flex items-center gap-x-1.5">
                  <Users strokeWidth={1.5} size={18} />
                  <span>{venue.minCapacity + "-" + venue.maxCapacity}</span>
                </div>
                <div className="flex items-center gap-x-1.5">
                  <MapPin strokeWidth={1.5} size={18} />
                  <span>{venue.address}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 mt-8">
              {Array(80)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-3 rounded-xl bg-secondary/15"
                    style={{
                      width: 100 - Math.floor(Math.random() * 11) * 3 + "%",
                    }}
                  ></div>
                ))}
            </div>
          </div>
          <BookingForm venue={venue} user={user ?? undefined} />
        </div>
      </div>
    </>
  );
}
