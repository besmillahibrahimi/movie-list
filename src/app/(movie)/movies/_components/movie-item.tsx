import { Card } from "@/components/ui/card";
import { getAssetUrl } from "@/lib/utils";
import Image from "next/image";

type Props = {
  movie: IMovie;
};
export default function MovieItem({ movie }: Readonly<Props>) {
  return (
    <Card className="group relative w-full max-w-[300px] overflow-hidden rounded-xl bg-black">
      <div className="relative aspect-[3/4]">
        <Image
          src={getAssetUrl(movie.thumbnail)}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 300px) 100vw, 300px"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 w-full p-4">
          <h3 className="text-lg font-semibold text-white line-clamp-2">{movie.title}</h3>
          <p className="text-sm text-gray-300">{movie.year}</p>
        </div>
      </div>
    </Card>
  );
}
