"use client";

import { useState, useEffect } from "react";
import { ListHeader } from "./list-header";
import { ListFooter } from "./list-footer";
import { IFilterSchema, IFilterState, ISortOption } from "@/types/list.types";
import { cn } from "@/lib/utils";

type ListProps<T> = {
  className?: string;
  items: T[];
  loading?: boolean;
  renderItem: (item: T) => React.ReactNode;
  filterSchema?: IFilterSchema<Partial<T>>;
  sortOptions?: ISortOption[];
  itemsPerPage?: number;
  totalItems?: number;
  onSearch?: (query: string) => void;
  onFilter?: (filters: Partial<IFilterState<T>>) => void;
  onSort?: (sortBy: string) => void;
  onPageChange?: (page: number) => void;
};

export function List<T extends { id: string | number }>({
  className,
  items,
  renderItem,
  filterSchema,
  sortOptions,
  itemsPerPage = 20,
  totalItems,
  onSearch,
  onFilter,
  onSort,
  onPageChange,
  loading,
}: Readonly<ListProps<T>>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedItems(items.slice(startIndex, endIndex));
  }, [currentPage, items, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  return (
    <div className="space-y-12">
      <div>
        <ListHeader
          onSearch={onSearch}
          onFilter={onFilter}
          onSort={onSort}
          sortOptions={sortOptions}
          filterSchema={filterSchema}
        />
        <hr />
      </div>
      <ul className={cn("flex flex-wrap ", className)}>
        {displayedItems.map((item) => (
          <li key={item.id}>{renderItem(item)}</li>
        ))}
      </ul>
      <ListFooter
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems ?? 0 / itemsPerPage)}
        onPageChange={handlePageChange}
        totalItems={totalItems ?? 0}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
