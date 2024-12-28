import type { ReactNode } from "react";
import MovieItem from "./movie-item";

type Props = {
  movies: IMovie[];
  emptyMessage?: ReactNode;
  isLoading?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
};

export const MovieList: React.FC<Props> = ({ movies, isLoading, header, footer, emptyMessage = "No movies found" }) => {
  if (!isLoading && movies.length === 0) {
    return <div className="text-center text-white text-heading-3">{emptyMessage}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {header && <div className="col-span-full">{header}</div>}
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div className="animate-pulse rounded-md bg-muted" key={`item-${index + 1}`} />
          ))
        : movies.map((movie) => {
            return <MovieItem movie={movie} key={movie.id} />;
          })}
      {footer && <div className="col-span-full">{footer}</div>}
    </div>
  );
};
