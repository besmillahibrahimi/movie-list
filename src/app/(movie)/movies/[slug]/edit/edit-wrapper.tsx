"use client";

import { execCreate } from "@/lib/actions/base.action";

import { redirect, RedirectType } from "next/navigation";
import { MovieForm } from "../../_components/movie-form";

type Props = {
  movie: IMovie;
};

export default function EditWrapper({ movie }: Readonly<Props>) {
  const saveMovie = async (movie: IMovie) => {
    await execCreate<IMovie>({
      table: "movies",
      data: movie,
      single: true,
    });
    redirect(`/movies/${movie.id}/view`, RedirectType.replace);
  };
  return <MovieForm movie={movie} onSubmit={saveMovie} />;
}
