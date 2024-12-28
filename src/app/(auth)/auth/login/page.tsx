"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { InputField } from "@/components/input-field";
import { Button } from "@/components/ui/button";

const Schema = z.object({
  username: z.string().email("Enter a valid email").max(50),
  password: z
    .string()
    .min(8, "Your password must be at least 8 characters")
    .max(50, "It's good to have password with max length 50 characters"),
  rememberMe: z.boolean().optional(),
});
type LoginType = z.infer<typeof Schema>;

function LoginPage() {
  const form = useForm<LoginType>({
    resolver: zodResolver(Schema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center space-y-5">
        <h1>Sign In</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(console.info, console.warn)}
            className="min-w-72 flex flex-col items-center space-y-5"
          >
            <InputField
              type="input"
              className="w-full"
              inputProps={{ type: "email", placeholder: "Email" }}
              name={"username"}
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
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
