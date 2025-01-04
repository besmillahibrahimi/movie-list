"use server";

import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LoginType, SignupType } from "../_utils/auth-schema";

export const signUpAction = async (formData: SignupType) => {
  const { email, password, name } = formData;
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  return await supabase.auth.signUp({
    email,
    password,

    options: {
      data: {
        name,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
};

export const signInAction = async (data: LoginType) => {
  const { email, password } = data;

  const supabase = await createClient();

  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/auth/login");
};

export const resendEmailConfirmation = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: "/auth/callback",
    },
  });

  if (error) {
    return redirect(encodedRedirect("error", "/auth/login", error.message));
  }

  return redirect(encodedRedirect("success", "/auth/login", "Email sent!"));
};
