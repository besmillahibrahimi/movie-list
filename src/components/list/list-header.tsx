"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FilterDialog } from "./filter-dialog";
import { SortDropdown } from "./sort";
import { IListHeaderProps } from "@/types/list.types";

export function ListHeader<T>({
  onSearch,
  onFilter,
  onSort,
  sortOptions,
  filterSchema,
}: Readonly<IListHeaderProps<T>>) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <Input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} className="flex-grow" />
      {filterSchema && <FilterDialog filterSchema={filterSchema} onFilter={onFilter} />}
      {sortOptions && <SortDropdown sortOptions={sortOptions} onSort={onSort} />}
    </div>
  );
}
