import { z } from "zod";
import { EnvSchema } from "./env-schema";

export const envVars = EnvSchema.parse({
  supabase: {
    projectUrl: process.env.NEXT_PUBLIC_SB_PROJECT_URL,
    anonKey: process.env.NEXT_PUBLIC_SB_PROJECT_ANON,
  },
});
