import React, { useRef, useState } from "react";
import genresIcons from "../assets/genres/index";
import { useFetchHook } from "../hooks/useFetchHook";
import { HashLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MovieCard, Pagination } from "../components/export";

export default function Genres() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState({
    id: 28,
    name: "Action",
  });
  const listRef = useRef(null);

  const { data: genres, isLoading, error } = useFetchHook(`genre/movie/list`);

  const {
    data: moviesByGenre,
    isLoading: isMoviesLoading,
    error: isMoviesError,
  } = useFetchHook(
    `discover/movie`,
    [currentPage, selectedGenre],
    `with_genres=${selectedGenre.id}&page=${currentPage}`,
    true
  );

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  console.log(moviesByGenre);

  console.log(genres?.genres);
  return (
    <div>
      <h2>Genres</h2>
      {isLoading ? (
        <div className="w-full  flex items-center justify-center">
          <HashLoader size={50} color="red" />
        </div>
      ) : (
        <div className="relative h-full">
          <button
            aria-label="Scroll Left"
            onClick={() => {
              if (listRef.current)
                listRef.current.scrollBy({ left: -500, behavior: "smooth" });
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-(--color-text) p-2 rounded-full shadow-md cursor-pointer hover:scale-105"
          >
            <FiChevronLeft className="text-2xl text-(--color-primary) " />
          </button>

          <div
            ref={listRef}
            className="flex gap-5 items-center justify-start overflow-x-auto no-scrollbar w-full p-4 scroll-smooth"
          >
            {genres.genres.map((genre) => {
              const key = genre.name.toLowerCase();
              const icon = genresIcons[key];
              const isSelected = selectedGenre.id === genre.id;
              return (
                <div
                  onClick={() => handleGenreChange(genre)}
                  key={genre.id}
                  className={`flex flex-col items-center mb-4 rounded-md p-4 cursor-pointer min-w-max transition-all duration-300 ${
                    isSelected
                      ? "bg-(--color-primary) scale-105 shadow-lg"
                      : "hover:bg-(color-secondary)/50"
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
            aria-label="Scroll Right"
            onClick={() => {
              if (listRef.current)
                listRef.current.scrollBy({ left: 500, behavior: "smooth" });
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-(--color-text) p-2 rounded-full shadow-md cursor-pointer hover:scale-105"
          >
            <FiChevronRight className="text-2xl text-(--color-primary) " />
          </button>
        </div>
      )}

      <div>
        {isMoviesLoading ? (
          <div className="w-full  flex items-center justify-center">
            <HashLoader size={50} color="red" />
          </div>
        ) : (
          <div className="p-4 lg:px-30 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10">
            {moviesByGenre.results.map((movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
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
