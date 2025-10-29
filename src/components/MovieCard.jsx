import React from "react";
import { RatingStars } from "./export";
export default function MovieCard({ movie, featured = false, styles }) {
  return (
    <div
      className={`relative flex flex-col items-center transition-all duration-300 ease-in-out justify-center gap-4 cursor-pointer ${styles}`}
    >
      <div className="relative w-full h-full">
        {featured ? (
          <img
            src={`https://media.themoviedb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded-2xl "
          />
        ) : (
          <img
            src={`https://media.themoviedb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded-2xl "
          />
        )}
        {featured && (
          <div className="absolute inset-0 bg-(--color-black)/40 rounded-2xl"></div>
        )}
      </div>

      {featured ? (
        <div className="absolute bottom-5 left-15 text-(--color-white) flex-col items-center justify-center z-20 gap-2">
          <h2 className="text-xl lg:text-2xl xl:text-4xl capitalize font-bold">
            {movie.title}
          </h2>
          <p className="text-sm opacity-90 w-full  text-ellipsis overflow-hidden text-nowrap lg:text-wrap max-w-[200px] sm:max-w-[250px] lg:max-w-7xl text-(--color-text)  text-justify">
            {movie.overview}
          </p>
          <RatingStars
            rating={movie?.vote_average?.toFixed(2)}
            styles="md:text-lg text-sm text-(--color-white)"
            showNumeric={true}
            iconStyles="md:text-lg text-sm text-(--color-white)/50"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center h-full gap-2 p-2">
          <h2 className="text-xl font-bold text-(--color-primary)">
            {movie.title}
          </h2>
          <RatingStars
            rating={movie.vote_average}
            showNumeric={false}
            iconStyles="text-xl"
          />
        </div>
      )}
    </div>
  );
}
