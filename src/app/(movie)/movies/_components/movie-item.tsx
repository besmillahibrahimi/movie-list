import { Card } from "@/components/ui/card";
import { cn, getAssetUrl } from "@/lib/utils";
import { Film, MoreVertical } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type Props = {
  movie: Tables<"movies">;
  className?: string;
};
export default function MovieItem({ movie, className }: Readonly<Props>) {
  return (
    <Card
      className={cn("group relative w-full min-w-40 max-w-[300px] border-0 overflow-hidden rounded-xl p-2", className)}
    >
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
          <Film size={250} />
        )}
      </div>
      {/* Content */}
      <div className="flex justify-between items-start w-full p-4">
        <div>
          <h3 className="text-lg font-semibold text-white line-clamp-1">{movie.title}</h3>
          <p className="text-sm text-gray-300">{movie.year}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link className="w-full" href={`/movies/${movie.id}/edit`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
