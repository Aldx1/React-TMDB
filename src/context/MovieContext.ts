import React from "react";

export interface IMovieContext {
  movieUrl: string;
  setMovieUrl: (movieUrl: string) => void;
  query: string | null;
  setQuery: (query: string | null) => void;
  sortBy: string | null;
  setSortBy: (sortBy: string | null) => void;
  genre: number | null;
  setGenre: (genre: number | null) => void;
  page: number;
  setPage: (page: number) => void;
  resetSearch: () => void;
}

const InitialMovieContext: IMovieContext = {
  movieUrl: "",
  setMovieUrl: () => {},
  query: null,
  setQuery: () => {},
  sortBy: null,
  setSortBy: () => {},
  genre: null,
  setGenre: () => {},
  page: 1,
  setPage: () => {},
  resetSearch: () => {},
};

export const MovieContext =
  React.createContext<IMovieContext>(InitialMovieContext);
