import type { ReactNode } from "react";
import { z } from "zod";

export type ISortOption = {
  label: string;
  value: string;
};

export type IBaseFilterSchema<T> = {
  key: Extract<keyof T, string>;
  label: ReactNode;
};

export type IFilterSchemaItemInput<T> = IBaseFilterSchema<T> & {
  type: "input";
};

export type IFilterSchemaItemCheckbox<T> = IBaseFilterSchema<T> & {
  type: "checkbox";
};

export type IFilterSchemaItemRadio<T> = IBaseFilterSchema<T> & {
  type: "radio";
  options: string[];
};
export type IFilterSchemaItemSelect<T> = IBaseFilterSchema<T> & {
  type: "select";
  options: string[];
};

export type IFilterSchemaItemRange<T> = IBaseFilterSchema<T> & {
  type: "range";
  min: number;
  max: number;
};

export type IFilterSchema<T> = (
  | IFilterSchemaItemInput<T>
  | IFilterSchemaItemCheckbox<T>
  | IFilterSchemaItemRadio<T>
  | IFilterSchemaItemSelect<T>
  | IFilterSchemaItemRange<T>
)[];

const filterStateSchema = z.record(z.union([z.string(), z.boolean(), z.number(), z.array(z.string())]));

export type IFilterState = z.infer<typeof filterStateSchema>;

export type IListHeaderProps<T> = {
  onSearch: (query: string) => void;
  onFilter: (filters: T) => void;
  onSort: (sortBy: string) => void;
  sortOptions: ISortOption[];
  filterSchema: IFilterSchema<T>;
};
