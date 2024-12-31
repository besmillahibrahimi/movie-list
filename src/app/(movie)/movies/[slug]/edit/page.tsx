import { execRead } from "@/lib/actions/base.action";
import { notFound } from "next/navigation";
import EditWrapper from "./edit-wrapper";

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

  return (
    <div className="container py-8">
      <EditWrapper movie={movie} />
    </div>
  );
}
