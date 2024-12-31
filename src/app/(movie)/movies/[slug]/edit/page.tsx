import { execCreate, execRead } from "@/lib/actions/base.action";
import { notFound, redirect, RedirectType } from "next/navigation";
import { MovieForm } from "../../_components/movie-form";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EditPage({ params }: Readonly<Props>) {
  const { slug } = await params;
  let movie: IMovie | null = null;

  const { data } = await execRead<IMovie>({
    table: "movies",
    filters: { id: { value: parseInt(slug), operator: "eq" } },
    select: "*",
  });

  if (data) movie = data[0] as unknown as IMovie;
  if (!movie) return notFound();

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
      <MovieForm movie={movie} onSubmit={saveMovie} />
    </div>
  );
}
