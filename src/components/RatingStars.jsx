import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function RatingStars({
  rating,
  maxRating = 10,
  showNumeric = true,
  styles = "text-sm text-gray-600",
  iconStyles = " text-lg",
}) {
  const normalizedRating = (rating / maxRating) * 5;
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar
        key={`full-${i}`}
        className={`${iconStyles} text-yellow-400 transition-colors duration-200 ease-in`}
      />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FaStarHalfAlt
        key={`half`}
        className={`${iconStyles} text-yellow-400 transition-colors duration-200 ease-in`}
      />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar
        key={`empty-${i}`}
        className={`${iconStyles} text-gray-400 transition-colors duration-200 ease-in`}
      />
    );
  }

  return (
    <div
      className="flex items-center gap-2"
      role="img"
      aria-label={`${rating} our of ${maxRating}`}
      title="Rating"
    >
      <div className={`flex items-center gap-1 `}>{stars}</div>

      {showNumeric && (
        <span className={`${styles}  ml-1 font-medium`}>
          {rating} / {maxRating}
        </span>
      )}
    </div>
  );
}
