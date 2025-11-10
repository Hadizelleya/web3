import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchHook } from "../hooks/useFetchHook";
import Button from "../components/Button";
import { FaBackward } from "react-icons/fa6";
import { IoArrowUndoSharp } from "react-icons/io5";
import { HashLoader } from "react-spinners";
import { MovieCard } from "../components/export";
const apiKey = import.meta.env.VITE_API_KEY;
export default function ActorDetails() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const {
    data: actorDetails,
    isLoading,
    error,
  } = useFetchHook(
    `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`
  );

  const {
    data: actorMovies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useFetchHook(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_cast=${id}`
  );

  if (isLoading && moviesLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <HashLoader size={100} color="red" />
      </div>
    );

  if (error)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-2xl text-center text-(color-error)">
          {error.message}
        </h2>
      </div>
    );

  if (moviesError)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-2xl text-center text-(color-error)">
          {error.message}
        </h2>
      </div>
    );

  console.log(actorMovies);

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center p-4 px-20 gap-20">
        <div>
          <img
            src={`${import.meta.env.VITE_IMAGES_URL}/${
              actorDetails?.profile_path
            }`}
            className=" w-full h-full object-cover max-h-[750px] rounded-2xl shadow-2xl shadow-black "
            alt={actorDetails?.name}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="flex flex-col items-start justify-center gap-4">
            <h2 className="text-6xl font-light text-(--color-primary)">
              {actorDetails?.name}
            </h2>
            <h4 className="flex items-center gap-2 text-2xl">
              <span className="font-black text-3xl">Born:</span>
              {actorDetails?.birthday}
            </h4>
            {actorDetails?.biography ? (
              <p className="text-(--color-muted-dark)">
                {actorDetails?.biography}
              </p>
            ) : (
              <p>No Biography for this {actorDetails?.name}...</p>
            )}
          </div>

          <div className="flex items-center justify-evenly mt-8">
            {actorDetails?.imdb_id && (
              <Button
                text={"IMDB"}
                isLink
                url={`https://www.imdb.com/name/${actorDetails?.imdb_id}`}
              />
            )}
            <Button
              text={"Back"}
              icon={<IoArrowUndoSharp />}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-10 gap-10 ">
        {actorMovies?.results?.slice(0, 10).map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}
