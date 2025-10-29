import React, { useState } from "react";
import { MovieCard, Pagination } from "../components/export";

import { useFetchHook } from "../hooks/useFetchHook";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";

// const localMovies = [
//   {
//     id: crypto.randomUUID(),
//     title: "Sonic the hedgehog",
//     rating: 10,
//     image: movieImage,
//   },
//   {
//     id: crypto.randomUUID(),
//     title: "Sonic the hedgehog",
//     rating: 5,
//     image: movieImage,
//   },
//   {
//     id: crypto.randomUUID(),
//     title: "Sonic the hedgehog",
//     rating: 8,
//     image: movieImage,
//   },
//   {
//     id: crypto.randomUUID(),
//     title: "Sonic the hedgehog",
//     rating: 9,
//     image: movieImage,
//   },
//   {
//     id: crypto.randomUUID(),
//     title: "Sonic the hedgehog",
//     rating: 4,
//     image: movieImage,
//   },
// ];

const baseUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Movies() {
  const [currentPage, setCurrentPage] = useState(1);
  const testedTotalPages = 500;
  const {
    data: movies,
    isLoading: isMoviesLoading,
    error: MoviesError,
  } = useFetchHook(
    `${baseUrl}/movie/popular?api_key=${apiKey}&page=${currentPage}`
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isMoviesLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <HashLoader size={80} color="red" />
      </div>
    );

  if (MoviesError)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-2xl text-center text-(color-error)">
          {MoviesError.message}
        </h2>
      </div>
    );
  console.log(movies);
  return (
    <div>
      <Link to={`/movies/${movies?.results[0]?.id}`}>
        <MovieCard
          movie={movies?.results[0]}
          featured
          styles={"h-96 px-10 mt-4"}
        />
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 h-full p-10 items-center justify-center">
        {movies?.results?.slice(1)?.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="h-full">
            <MovieCard movie={movie} styles={"hover:scale-105"} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div>
        {movies !== null && movies !== undefined && (
          <Pagination
            currentPage={currentPage}
            maxVisiblePages={7}
            totalPages={testedTotalPages}
            styles="bg-(--color-white) p-4 rounded-lg shadow-lg "
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
