import { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import { GenreResponse } from "../models/Genre";
import { useFetch } from "../customHooks/useFetch";
import tmdbLogo from "../assets/TMDB-logo.png";

const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?language=en";

const MovieNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const genres = useFetch<GenreResponse>(genreUrl).data?.genres ?? [];
  const { setQuery, query, setGenre, genre, resetSearch } =
    useContext(MovieContext);

  const handleSearch = () => {
    if (searchQuery && searchQuery.trim() !== "") {
      setQuery(searchQuery);
    } else {
      handleLogoClick();
    }
  };

  const handleLogoClick = () => {
    if (query || genre) {
      setSearchQuery("");
      // Only reset the search if query or genre is not null
      resetSearch();
    }
  };

  const handleGenreChange = (genre: number) => {
    setSearchQuery("");
    setGenre(genre);
    setQuery(null);
  };

  return (
    <div className="header">
      <img src={tmdbLogo} className="tmdbLogo" onClick={handleLogoClick}></img>
      <nav>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>
              <a href="#" onClick={() => handleGenreChange(genre.id)}>
                {genre.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <div className="searchBox">
          <input
            type="text"
            placeholder="Enter Movie Name"
            className="searchText"
            value={searchQuery}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          ></input>
          <button onClick={handleSearch}>
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieNavbar;
