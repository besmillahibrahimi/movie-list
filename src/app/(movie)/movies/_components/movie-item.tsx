import { Card } from "@/components/ui/card";
import { getAssetUrl } from "@/lib/utils";
import { Film } from "lucide-react";
import Image from "next/image";

type Props = {
  movie: IMovie;
};
export default function MovieItem({ movie }: Readonly<Props>) {
  return (
    <Card className="group relative w-full max-w-[300px] border-0 overflow-hidden rounded-xl p-2">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
        {movie.thumbnail ? (
          <Image
            src={getAssetUrl(movie.thumbnail)}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 300px) 100vw, 300px"
            priority
          />
        ) : (
          <Film size={400} />
        )}
      </div>
      {/* Content */}
      <div className=" w-full p-4">
        <h3 className="text-lg font-semibold text-white line-clamp-2">{movie.title}</h3>
        <p className="text-sm text-gray-300">{movie.year}</p>
      </div>
    </Card>
  );
}
