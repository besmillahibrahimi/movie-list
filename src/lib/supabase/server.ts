"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { envVars } from "../env/env-vars";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    envVars.supabase.projectUrl,
    envVars.supabase.anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch (error) {}
        },
      },
    }
  );
};
