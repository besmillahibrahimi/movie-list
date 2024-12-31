import { IFilterSchema, ISortOption } from "@/types/list.types";
import { Genres } from "./genres.data";

export const SortOptions: ISortOption[] = [
  {
    label: "Name",
    value: "name",
  },

  {
    label: "Year",
    value: "year",
  },
];

export const filterSchema: IFilterSchema<Partial<IMovie>> = {
  title: {
    label: "Name",
    type: "input",
    operator: "ilike",
    value: "",
  },
  year: {
    label: "Year",
    type: "range",
    min: 1900,
    max: 2024,
    operator: "eq",
    value: 0,
  },
  genres: {
    label: "Genre",
    type: "select",
    options: Genres,
    operator: "cs",
    value: [],
  },
  rating: {
    label: "Rating",
    type: "radio",
    options: ["1", "2", "3", "4", "5"],
    operator: "eq",
    value: 0,
  },
  is_for_children: {
    label: "For Children",
    type: "checkbox",
    operator: "eq",
    value: false,
  },
};
