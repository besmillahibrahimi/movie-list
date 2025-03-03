import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { envVars } from "../env/env-vars";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient<Database>(envVars.supabase.projectUrl, envVars.supabase.anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) request.cookies.set(name, value);

          response = NextResponse.next({
            request,
          });
          for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
        },
      },
    });

    const user = await supabase.auth.getUser();

    // if user exists, and the current path is on /auth/* routes, then redirect to home

    if (request.nextUrl.pathname.startsWith("/auth") && user.data.user) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!request.nextUrl.pathname.startsWith("/auth") && user.error) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return response;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
