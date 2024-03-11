import MovieCard from "./MovieCard";
import useMovieFetch from "../customHooks/useMovieFetch";
import { useCallback, useContext, useRef } from "react";
import { MovieContext } from "../context/MovieContext";
import { MoviesInfo } from "./MoviesInfo";

const MoviesContainer = () => {
  const { page, setPage, movieUrl, query, sortBy, genre } =
    useContext(MovieContext);

  const {
    data: movies,
    hasMore,
    loading,
    error,
  } = useMovieFetch(movieUrl, {
    query,
    sortBy,
    genre,
    page: page,
  });

  // Add an Intersection Observer to last film card current page to fetch another if more are available.
  const observer = useRef<IntersectionObserver>();
  const lastMovieElement = useCallback(
    (node: HTMLInputElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className="movieCardContainer">
        {movies.map((movie, index) => {
          if (index + 1 === movies.length) {
            return (
              <div key={index} ref={lastMovieElement}>
                <MovieCard movie={movie} />
              </div>
            );
          } else {
            return <MovieCard key={index} movie={movie} />;
          }
        })}
        {loading && <MoviesInfo displayValue="Loading..." />}
        {error && <MoviesInfo displayValue="Error" />}
        {!loading && !error && movies.length === 0 && (
          <MoviesInfo displayValue="Nothing found" />
        )}
      </div>
    </>
  );
};

export default MoviesContainer;
