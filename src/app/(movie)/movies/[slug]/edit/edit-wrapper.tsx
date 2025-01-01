"use client";

import { execUpdate } from "@/lib/actions/base.action";

import { redirect, RedirectType } from "next/navigation";
import { MovieForm } from "../../_components/movie-form";

type Props = {
  movie: IMovie;
};

export default function EditWrapper({ movie }: Readonly<Props>) {
  const saveMovie = async (movie: IMovie) => {
    await execUpdate<IMovie>({
      table: "movies",
      data: movie,
      filters: { id: { value: movie.id, operator: "eq" } },
    });
    redirect(`/movies/${movie.id}/view`, RedirectType.replace);
  };
  return <MovieForm movie={movie} onSubmit={saveMovie} />;
}
