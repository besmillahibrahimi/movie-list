import { z } from "zod";

export const EnvSchema = z.object({
  supabase: z.object({
    projectUrl: z.string(),
    anonKey: z.string(),
  }),
});
