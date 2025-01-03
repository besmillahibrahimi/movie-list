"use client";

import { List } from "@/components/list/list";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { execRead } from "@/lib/actions/base.action";
import { cn } from "@/lib/utils";
import { LogOut, PlusCircle } from "lucide-react";
import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";
import MovieItem from "./_components/movie-item";
import { filterSchema, SortOptions } from "./_data/list-data";
import BTooltip from "@/components/b-tooltip";

function MoviesPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<
    { page?: string; limit?: string } & Partial<Tables<"movies">>
  >;
}>) {
  const query = use(searchParams);
  const { page = "1", limit = "10", ...rest } = query;

  const itemsPerPage =
    Number.parseInt(limit) <= 50 ? Number.parseInt(limit) : 50;
  const currentPage = Number.parseInt(page) > 0 ? Number.parseInt(page) : 1;

  const [filter, setFilter] = useState<IFilterState<Partial<Tables<"movies">>>>(
    {}
  );
  const [list, setList] = useState<Tables<"movies">[]>([]);
  const [loading, setLoading] = useState(false);

  const [sort, setSort] = useState<ISort<Tables<"movies">>>({
    sortBy: "title",
    ascending: true,
  });
  const [total, setTotal] = useState<number>(0);

  const fetchMovies = useCallback(async () => {
    setLoading(true);

    const { count, data, error } = await execRead({
      table: "movies",
      filters: filter,
      select: "*",
      currentPage: currentPage,
      pageSize: itemsPerPage,
      sort,
    });
    if (error) {
      console.error(error);
      return;
    }

    setList(data as unknown as Tables<"movies">[]);
    setTotal(count ?? 0);
    setLoading(false);
  }, [filter, sort, currentPage, itemsPerPage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchMovies();
  }, [filter, sort, fetchMovies]);

  return (
    <div className="container pt-12 pb-28 ">
      <div className="flex justify-between mb-5 md:mb-12">
        <div className="flex space-x-5 items-center">
          <h1>My Movies</h1>
          <BTooltip tooltip={"Add a new movie"}>
            <Link href={"/movies/form"} className="h-auto mt-2">
              <PlusCircle />
            </Link>
          </BTooltip>
        </div>

        <button type="button" className="flex space-x-2 items-center">
          <span>Logout</span>
          <LogOut />
        </button>
      </div>

      <List<Tables<"movies">>
        emptyNode={
          <div className="flex flex-col items-center space-y-8 ">
            <h2>Your movie is empty</h2>

            <Link
              href={"/movies/form"}
              className={cn(
                buttonVariants({ variant: "default", className: "w-auto" })
              )}
            >
              Add a new movie
            </Link>
          </div>
        }
        skeleton={
          <Skeleton className="max-h-[500px] h-full w-full max-w-[300px]" />
        }
        loading={loading}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
        items={list}
        totalItems={total}
        currentPage={currentPage}
        renderItem={(movie) => (
          <Link href={`/movies/${movie.id}/view`}>
            <MovieItem movie={movie} />
          </Link>
        )}
        filterProps={{
          filterSchema,
          onFilter(filters) {
            setFilter(filters);
          },
        }}
        sortProps={{
          sort,
          sortOptions: SortOptions,
          onSort(sort, ascending) {
            setSort({ sortBy: sort, ascending });
          },
        }}
        onSearch={(value) =>
          setFilter((p) => ({ ...p, title: { value, operator: "ilike" } }))
        }
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default MoviesPage;
