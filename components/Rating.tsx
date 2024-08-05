import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React from "react";

interface RatingProps {
  ratingScore: number;
  ratingCount: number;
  className?: string;
}

export default function Rating(props: RatingProps) {
  const { ratingScore, ratingCount, className } = props;
  return (
    <div className={cn(className, "flex items-center gap-x-1")}>
      <Star fill="#FECE26" stroke="#FECE26" size={18} />
      <p className="font-medium">
        {ratingScore}
        <span className="ml-0.5 font-normal text-secondary">
          ({ratingCount})
        </span>
      </p>
    </div>
  );
}
