"use client";
import { redirect, RedirectType } from "next/navigation";
import { MovieForm } from "../_components/movie-form";
import { execCreate } from "@/lib/actions/base.action";

function NewMoviePage() {
  const saveMovie = async (movie: IMovie) => {
    await execCreate<IMovie>({
      table: "movies",
      data: movie,
      single: true,
    });
    redirect(`/movies/${movie.id}/view`, RedirectType.replace);
  };
  return (
    <div className="container py-8">
      <MovieForm onSubmit={saveMovie} />
    </div>
  );
}

export default NewMoviePage;
