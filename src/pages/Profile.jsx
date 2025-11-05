import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { FaStar } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { moviesApi } from "../services/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
export default function Profile() {
  const { user, loading, logout } = useAuth();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  console.log(user);

  const sessionId = localStorage.getItem("session_id");

  useEffect(() => {
    const getFavoritedMovies = async () => {
      try {
        if (!user) return;

        const { data } = await moviesApi.get(
          `account/${user?.id}/favorite/movies
`,
          { params: { session_id: sessionId } }
        );

        setFavoriteMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getFavoritedMovies();
  }, [user, sessionId]);

  const imageURl = import.meta.env.VITE_IMAGES_URL;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex p-10 items-center justify-between gap-5 w-full">
        <div className="flex p-10 items-center justify-start gap-5 w-full">
          {/* image */}
          <div>
            <img
              src={`${imageURl}/${user?.avatar?.tmdb?.avatar_path}`}
              alt={user?.name}
              className="w-[300px] rounded-full aspect-square object-cover object-top shadow-2xl shadow-black/40 hover:scale-105 transition-all duration-300 ease-in"
            />
          </div>
          {/* name */}
          <div className="flex flex-col items-start justify-center gap-4">
            <h2 className="text-3xl ">
              Welcome Back{" "}
              <span className="text-(--color-primary) text-4xl">
                {user?.name}
              </span>
            </h2>
          </div>
        </div>

        <Button text={"Logout"} onClick={logout} icon={<CiLogout />} />
      </div>
      {/* favorite movies */}
      <div>
        <h2 className="text-3xl text-(--color-surface) flex gap-2 items-center">
          <FaStar className="text-4xl text-(--color-secondary)" />
          Favorite Movies
        </h2>
        <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 items-center justify-center gap-6">
          {favoriteMovies.map((movie) => (
            <Link to={`/movies/${movie.id}`} className="h-full">
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      </div>

      {/* watchlist */}
      <div>
        <h2 className="text-3xl text-(--color-surface) flex gap-2 items-center">
          <FaStar className="text-4xl text-(--color-secondary)" />
          My Watchlist
        </h2>
        <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 items-center justify-center gap-6">
          {favoriteMovies.map((movie) => (
            <Link to={`/movies/${movie.id}`} className="h-full">
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
