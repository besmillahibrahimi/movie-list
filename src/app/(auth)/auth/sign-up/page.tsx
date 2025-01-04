"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/input-field";
import { SubmitButton } from "@/components/submit-button";
import { toast } from "sonner";
import { signUpAction } from "../_actions/auth.actions";
import { SignupSchema, SignupType } from "../_utils/auth-schema";
import Link from "next/link";
import { redirect } from "next/navigation";

function SignupPage() {
  const form = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const signup = async (values: SignupType) => {
    const { error } = await signUpAction(values);
    if (error) {
      toast(error.message);
      return;
    }

    toast("Signed up successfully! Redirecting...");
    redirect("/");
  };

  return (
    <div>
      <div className="flex flex-col items-center space-y-5">
        <h1>Sign Up</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(signup, console.warn)}
            className="sm:min-w-72 flex flex-col items-center space-y-5"
          >
            <InputField
              className="w-full"
              type="input"
              name="name"
              control={form.control}
              inputProps={{ type: "text", placeholder: "Name" }}
            />
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
            <SubmitButton className="w-full" type="submit">
              Get Started
            </SubmitButton>

            <div className="flex items-center space-x-2">
              <p>
                <em>Have an account?</em>
              </p>
              <Link className="underline" href={"/auth/login"}>
                Login here.
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignupPage;
