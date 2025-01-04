"use client";

import { execUpdate } from "@/lib/actions/base.action";

import { redirect, RedirectType } from "next/navigation";
import { MovieForm } from "../../_components/movie-form";
import { toast } from "sonner";

type Props = {
  movie: Tables<"movies">;
};

export default function EditWrapper({ movie }: Readonly<Props>) {
  const saveMovie = async (movie: Tables<"movies">) => {
    const { error } = await execUpdate({
      table: "movies",
      data: movie,
      filters: { id: { value: movie.id, operator: "eq" } },
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Movie updated successfully");
    redirect(`/movies/${movie.id}/view`, RedirectType.replace);
  };
  return <MovieForm movie={movie} onSubmit={saveMovie} />;
}
