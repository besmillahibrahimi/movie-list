"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/input-field";
import { SubmitButton } from "@/components/submit-button";

import Link from "next/link";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { signInAction } from "../_actions/auth.actions";
import { LoginSchema, LoginType } from "../_utils/auth-schema";

function LoginPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ error?: string; error_code?: string; error_description?: string; success?: string }>;
}>) {
  const query = use(searchParams);

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const login = async (values: LoginType) => {
    setLoading(true);
    const { error } = await signInAction(values);
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logged in successfully! Redirecting...", {});
    redirect("/");
  };

  useEffect(() => {
    if (query.error) {
      setTimeout(() => {
        toast.error(query.error_description, {
          action: query.error_code === "otp_expired" && (
            <Link className={"bg-primary rounded-lg p-2"} href={"/auth/email-confirmation/resend"}>
              Resend
            </Link>
          ),
        });
      }, 500);
    } else if (query.success) {
      toast.success(query.success);
    }
  }, [query]);

  return (
    <div>
      <div className="flex flex-col items-center space-y-5">
        <h1>Sign In</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(login, console.warn)}
            className="sm:min-w-72 flex flex-col items-center space-y-5"
          >
            <InputField
              type="input"
              className="w-full"
              inputProps={{ type: "email", placeholder: "Email" }}
              name={"email"}
              control={form.control}
            />
            <InputField
              className="w-full"
              type="input"
              inputProps={{ type: "password", placeholder: "Password" }}
              name={"password"}
              control={form.control}
            />
            <InputField
              className="flex gap-x-3 items-center flex-row-reverse space-y-0"
              type="checkbox"
              name="rememberMe"
              control={form.control}
              label="Remember Me"
            />
            <SubmitButton disabled={loading} className="w-full" type="submit">
              {loading ? "logging in..." : "Login"}
            </SubmitButton>

            <div className="flex items-center space-x-2">
              <p>
                <em>Don't have an account?</em>
              </p>
              <Link className="underline" href={"/auth/sign-up"}>
                Create one!
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
