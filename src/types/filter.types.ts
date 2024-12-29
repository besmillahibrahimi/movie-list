type FilterOperator =
  | "eq"
  | "neq"
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "like"
  | "ilike"
  | "is"
  | "in"
  | "cs"
  | "cd"
  | "fts"
  | "plfts"
  | "phfts"
  | "wfts";

type FilterField<T> = {
  value: T;
  operator: FilterOperator;
};

type Filter<T> = {
  [K in keyof T]: FilterField<T[K]>;
};
