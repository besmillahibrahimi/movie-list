import { cn, getAssetUrl } from "@/lib/utils";
import { ArrowLeft, Check, Film, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  movie: Tables<"movies">;
  backUrl?: string;
};

const FieldView: React.FC<{
  data: React.ReactNode;
  className?: string;
  field: React.ReactNode;
}> = ({ data, className, field }) => {
  return (
    <div className="grid grid-cols-12 md:col-span-5">
      <p className="col-span-3">{field}</p>
      <div
        className={cn(
          "col-span-9 flex h-11 items-center w-full rounded-md border border-input bg-input px-3 py-1 text-base ",
          className
        )}
      >
        {data}
      </div>
    </div>
  );
};

export const MovieDetails: React.FC<Props> = ({ movie, backUrl }) => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex gap-x-2 items-center">
        <Link href="/" target="_parent">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 md:gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          {movie.thumbnail ? (
            <Image
              className="w-full h-auto "
              src={getAssetUrl(movie?.thumbnail)}
              alt={movie?.title}
              width={500}
              height={700}
            />
          ) : (
            <Film size={400} />
          )}
        </div>

        <div className="h-max grid grid-cols-1 md:grid-cols-5 space-y-4 md:col-span-2">
          <FieldView data={movie.title} field={"Title"} />

          <FieldView data={movie.year} field={"Year"} className="col-span-3" />

          <FieldView data={movie.genres?.join(", ")} field={"Genres"} />

          <FieldView data={movie.rating} field={"Rating"} className="col-span-5" />

          <FieldView
            data={<div className="flex items-center gap-x-2">{movie.is_for_children ? <Check /> : <X />}</div>}
            field={"Is for children"}
          />
        </div>
      </div>
    </div>
  );
};
