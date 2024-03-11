interface MoviesLoadingProps {
  displayValue: string;
}

export const MoviesInfo = ({ displayValue }: MoviesLoadingProps) => {
  return (
    <div className="movieInfo">
      <span>{displayValue}</span>
    </div>
  );
};
