import { Movie } from "../models/Movie";
const img_baseUrl = "https://image.tmdb.org/t/p/w500";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <>
      <div className="movieCard">
        <img
          src={`${img_baseUrl}${movie.poster_path}`}
          className="movieImage"
          alt={movie.title}
        ></img>
        <div className="movieDetails">
          <div className="movieTRBox">
            <p className="movieTitle">{movie.title}</p>
            <p className="movieRating">{movie.vote_average.toPrecision(2)}</p>
          </div>
          <div className="movieOverview">{movie.overview}</div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
