import { useEffect, useState } from "react";
import { IMovieContext, MovieContext } from "./MovieContext";

export const MovieContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [movieUrl, setMovieUrl] = useState("discover/movie");
  const [query, setQuery] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>("popularity.desc");
  const [genre, setGenre] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  // Search for films in genre set from header nav bar.
  useEffect(() => {
    if (genre !== null) {
      setMovieUrl("discover/movie");
      setQuery(null);
      setSortBy("popularity.desc");
      setPage(1);
    }
  }, [genre]);

  // Search for film name set in header text field.
  useEffect(() => {
    if (query !== null) {
      setMovieUrl("search/movie");
      setSortBy(null);
      setGenre(null);
      setPage(1);
    }
  }, [query]);

  // Reset back to initial search - popular films.
  const resetSearch = () => {
    setMovieUrl("discover/movie");
    setQuery(null);
    setSortBy("popularity.desc");
    setGenre(null);
    setPage(1);
  };

  /* console.log("url: ", movieUrl, " query: ", query, " sortBy: ", sortBy, " genre: ", genre, " page: ", page); */

  const contextValue: IMovieContext = {
    movieUrl,
    setMovieUrl,
    query,
    setQuery,
    sortBy,
    setSortBy,
    genre,
    setGenre,
    page,
    setPage,
    resetSearch,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};
