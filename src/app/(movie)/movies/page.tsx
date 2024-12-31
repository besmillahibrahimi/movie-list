"use client";
import { List } from "@/components/list/list";
import { execRead } from "@/lib/actions/base.action";
import { IFilterState } from "@/types/list.types";
import { useCallback, useEffect, useState } from "react";
import MovieItem from "./_components/movie-item";
import { filterSchema, SortOptions } from "./_data/list-data";
import Link from "next/link";

function MoviesPage() {
  const [filter, setFilter] = useState<IFilterState<Partial<IMovie>>>({});
  const [list, setList] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<string | undefined>();
  const [total, setTotal] = useState<number>(0);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    const { count, data, error } = await execRead<IMovie>({
      table: "movies",
      filters: filter,
      select: "*",
      currentPage,
      sort,
    });
    if (error) {
      console.error("sb ---", error);
      return;
    }
    console.info("sb ---", count);
    setList(data as any);
    setTotal(count ?? 0);
    setLoading(false);
  }, [filter, sort, currentPage]);

  useEffect(() => {
    fetchMovies();
  }, [filter]);

  return (
    <div className="container pt-12 pb-28">
      <List<IMovie>
        loading={loading}
        sortOptions={SortOptions}
        filterSchema={filterSchema}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
        items={list}
        totalItems={total}
        renderItem={(movie) => (
          <Link href={`/movies/${movie.id}/view`}>
            <MovieItem movie={movie} />
          </Link>
        )}
        onFilter={(fil) => {
          console.log(fil);
          setFilter(fil);
        }}
        onSearch={(value) => setFilter((p) => ({ ...p, title: { value, operator: "ilike" } }))}
        itemsPerPage={10}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
        onSort={(sort) => {
          setSort(sort);
        }}
      />
    </div>
  );
}

export default MoviesPage;
