import { createBrowserClient } from "@supabase/ssr";
import { envVars } from "../env/env-vars";

export const createClient = () =>
  createBrowserClient<Database>(
    envVars.supabase.projectUrl,
    envVars.supabase.anonKey
  );
