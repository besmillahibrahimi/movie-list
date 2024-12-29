import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(process.env.NEXT_PUBLIC_SB_PROJECT_URL!, process.env.NEXT_PUBLIC_SB_PROJECT_ANON!);
