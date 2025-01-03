import { execRead } from "@/lib/actions/base.action";
import { notFound } from "next/navigation";
import { MovieDetails } from "../../_components/movie-details";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ViewPage({ params }: Readonly<Props>) {
  const { slug } = await params;
  let movie: Tables<"movies"> | null = null;

  const { data } = await execRead({
    table: "movies",
    filters: { id: { value: Number.parseInt(slug), operator: "eq" } },
    select: "*",
  });

  if (data) movie = data[0] as unknown as Tables<"movies">;

  if (!movie) return notFound();
  return (
    <div className="container py-8">
      <MovieDetails movie={movie} />
    </div>
  );
}
