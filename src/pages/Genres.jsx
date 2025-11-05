import React, { useRef, useState } from "react";
import genres from "../assets/genres";
import { useFetchHook } from "../hooks/useFetchHook";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HashLoader } from "react-spinners";
import { MovieCard, Pagination } from "../components/export";
import { Link } from "react-router-dom";

export default function Genres() {
  const baseApi = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState({
    id: 28,
    name: "Action",
  });

  const listRef = useRef(null);

  const {
    data: genresData,
    isLoading,
    error,
  } = useFetchHook(`${baseApi}/genre/movie/list?api_key=${apiKey}`);

  const {
    data: moviesByGenre,
    isLoading: isMoviesByGenreLoading,
    error: moviesByGenreError,
  } = useFetchHook(
    `${baseApi}/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre.id}&page=${currentPage}`
  );

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    console.log("Selected genre:", genre);
  };

  console.log(genresData);
  console.log(moviesByGenre);
  return (
    <div>
      <h2 className="text-5xl mt-4 mb-2 text-(--color-primary) text-center">
        Genres
      </h2>

      {isLoading ? (
        <div className="w-full  flex items-center justify-center">
          <HashLoader size={50} color="red" />
        </div>
      ) : (
        <div className="relative h-full">
          <button
            aria-label="Scroll left"
            onClick={() => {
              if (listRef.current)
                listRef.current.scrollBy({ left: -500, behavior: "smooth" });
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-(--color-text) p-2 rounded-full shadow-md hover:scale-105"
          >
            <FiChevronLeft className="text-2xl text-(--color-primary) cursor-pointer " />
          </button>

          <div
            ref={listRef}
            className="flex gap-5 items-center justify-start overflow-x-auto no-scrollbar w-full p-4 scroll-smooth"
          >
            {genresData?.genres?.map((genre) => {
              const key = genre.name.toLowerCase();
              const icon = genres[key];
              const isSelected = selectedGenre.id === genre.id;
              return (
                <div
                  onClick={() => handleGenreChange(genre)}
                  key={genre.id}
                  className={`flex flex-col items-center mb-4 rounded-md p-4 cursor-pointer min-w-max transition-all duration-300 ${
                    isSelected
                      ? "bg-(--color-primary) scale-110 shadow-lg"
                      : "hover:bg-(--color-secondary)/50"
                  }`}
                >
                  <img
                    src={icon}
                    alt={genre.name}
                    className="w-14 h-14 object-contain"
                  />
                  <h3 className={`text-xl ${isSelected ? "font-bold" : ""}`}>
                    {genre.name}
                  </h3>
                </div>
              );
            })}
          </div>

          <button
            aria-label="Scroll right"
            onClick={() => {
              if (listRef.current)
                listRef.current.scrollBy({ left: 500, behavior: "smooth" });
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-(--color-text) p-2 rounded-full shadow-md hover:scale-105"
          >
            <FiChevronRight className="text-2xl text-(--color-primary) cursor-pointer" />
          </button>
        </div>
      )}

      <div>
        {isMoviesByGenreLoading ? (
          <div className="w-full  flex items-center justify-center">
            <HashLoader size={50} color="red" />
          </div>
        ) : (
          <div className="p-5 lg:px-30 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10">
            {moviesByGenre?.results?.map((movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div>
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={500}
          maxVisiblePages={5}
        />
      </div>
    </div>
  );
}
