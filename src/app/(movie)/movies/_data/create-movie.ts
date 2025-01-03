import { z } from "zod";

export const MovieFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  year: z
    .number()
    .min(1970, "Publishing year is required")
    .max(new Date().getFullYear(), "Publishing year is required"),

  thumbnail: z.string().nullable().optional(),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
  rating: z.number().min(1, "Rating is required").max(5),
  is_for_children: z.boolean().optional(),
});
