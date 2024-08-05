"use client";
import { Heart } from "lucide-react";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { getSavedVenueById, saveVenue, unsaveVenue } from "@/lib/actions";

interface SaveButtonProps {
  text?: boolean;
  userId: string;
  venueId: number;
}

export default function SaveButton(props: SaveButtonProps) {
  const { text, userId, venueId } = props;
  const [saved, setSaved] = React.useState(false);

  useEffect(() => {
    (async () => {
      const savedVenue = await getSavedVenueById(venueId);
      savedVenue && setSaved(true);
    })();
  }, [userId, venueId]);

  const handleClick = async () => {
    const prev = saved;
    setSaved((prev) => !prev);
    const res = prev ? await unsaveVenue(venueId) : await saveVenue(venueId);
    if (res.error) {
      alert(res.error);
      setSaved(prev);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-1.5 cursor-pointer"
    >
      {text && (
        <p className="mb-0.5 text-sm font-medium select-none">
          {!saved ? "Gem" : "Gemt"}
        </p>
      )}
      <motion.div whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.1 }}>
        {!saved ? (
          <Heart strokeWidth={1} size={24} />
        ) : (
          <Heart fill="#FF4E4E" stroke="#FF4E4E" strokeWidth={1} size={24} />
        )}
      </motion.div>
    </div>
  );
}
