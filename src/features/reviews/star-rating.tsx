import { assets } from "@/assets";
import Image from "next/image";

interface StarRatingProps {
  rating: number;
  setRating: (ratingNumber: number) => void;
}

export default function StarRating({ rating, setRating }: StarRatingProps) {
  const handleRating = (starIndex: number) => {
    setRating(starIndex);
  };

  return (
    <div className="flex flex-row">
      {Array.from({ length: 5 }, (_, index) => {
        const starIndex = index + 1;
        return (
          <Image
            src={starIndex <= rating ? assets.star_icon : assets.star_dull_icon}
            height={10}
            width={15}
            alt="star"
            onClick={() => handleRating(starIndex)}
            key={starIndex}
            className="mr-0.5"
          />
        );
      })}
    </div>
  );
}
