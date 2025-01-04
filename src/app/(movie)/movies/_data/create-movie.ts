import { z } from "zod";

export const MovieFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  year: z
    .number()
    .min(1970, "Publishing year must be >= 1970")
    .max(new Date().getFullYear(), "Publishing year can't be greater than this year."),

  thumbnail: z.string().nullable().optional(),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
  rating: z.number().min(1).max(5).nullable().optional(),
  is_for_children: z.boolean().optional(),
});
