"use client";
import { redirect, RedirectType } from "next/navigation";
import { MovieForm } from "../_components/movie-form";
import { execCreate } from "@/lib/actions/base.action";
import { toast } from "sonner";

function NewMoviePage() {
  const saveMovie = async (movie: Tables<"movies">) => {
    const { error } = await execCreate({
      table: "movies",
      data: movie,
    });
    if (error) {
      toast(error.message);
      return;
    }
    toast("Movie created successfully");
    redirect("/", RedirectType.replace);
  };
  return (
    <div className="container py-8">
      <MovieForm backUrl="/" onSubmit={saveMovie} />
    </div>
  );
}

export default NewMoviePage;
