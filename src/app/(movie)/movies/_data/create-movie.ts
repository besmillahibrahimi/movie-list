import { z } from "zod";

export const MovieFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  year: z
    .string()
    .min(1, "Publishing year is required")
    .regex(/^\d{4}$/, "Must be a valid year (YYYY)"),
  thumbnail: z.string().optional(),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
  rating: z.string().min(1, "Rating is required"),
  is_for_children: z.boolean().optional(),
});
