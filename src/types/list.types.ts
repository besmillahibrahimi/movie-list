import type { ReactNode } from "react";
import { z } from "zod";

export type ISortOption = {
  label: string;
  value: string;
};

export type FieldSchema<T> = FilterField<T> & {
  label: ReactNode;
};

export type IFilterSchemaItemInput<T> = FieldSchema<T> & {
  type: "input";
};

export type IFilterSchemaItemCheckbox<T> = FieldSchema<T> & {
  type: "checkbox";
};

export type IFilterSchemaItemRadio<T> = FieldSchema<T> & {
  type: "radio";
  options: string[];
};
export type IFilterSchemaItemSelect<T> = FieldSchema<T> & {
  type: "select";
  options: string[];
};

export type IFilterSchemaItemRange<T> = FieldSchema<T> & {
  type: "range";
  min: number;
  max: number;
};

export type IFilterSchema<T> = {
  [K in keyof T]:
    | IFilterSchemaItemInput<T[K]>
    | IFilterSchemaItemCheckbox<T[K]>
    | IFilterSchemaItemRadio<T[K]>
    | IFilterSchemaItemSelect<T[K]>
    | IFilterSchemaItemRange<T[K]>;
};

const filterStateSchema = z.record(z.union([z.string(), z.boolean(), z.number(), z.array(z.string())]));

export type IFilterState<T> = Filter<T>;

export type IListHeaderProps<T> = {
  onSearch?: (query: string) => void;
  onFilter?: (filters: Partial<IFilterState<T>>) => void;
  onSort?: (sortBy: string) => void;
  sortOptions?: ISortOption[];
  filterSchema?: IFilterSchema<Partial<T>>;
};
