"use client";

import { Pagination } from "./pagination";

type ListFooterProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  showDetails?: boolean;
};

export function ListFooter({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showDetails = false,
}: Readonly<ListFooterProps>) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-4 space-y-4 sm:space-y-0">
      {showDetails && (
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </div>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
