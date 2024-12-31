import { getAssetUrl } from "@/lib/utils";
import { Film } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

type Props = {
  movie: IMovie;
  backUrl?: string;
};

const FieldView: FC<{ data: any }> = ({ data }) => {
  return (
    <p className="flex h-11 w-full rounded-md border border-input bg-input px-3 py-1 text-base md:col-span-5">{data}</p>
  );
};

export const MovieDetails: FC<Props> = ({ movie, backUrl }) => {
  return (
    <div className="flex flex-col space-y-5">
      <h1 className="text-3xl font-bold text-white">{movie.title}</h1>

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
          <FieldView data={movie.title} />

          <FieldView data={movie.year} />

          <FieldView data={movie.genres} />
        </div>
      </div>
    </div>
  );
};
