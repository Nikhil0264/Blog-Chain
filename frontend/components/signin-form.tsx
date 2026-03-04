"use client";

import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

import { authClient } from "@/lib/auth-client";

const signInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters"
  })
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: SignInFormValues) => {
    try {
      setIsLoading(true);

      const res = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: "/"
      });

      if (res?.error) {
        toast.error(res.error.message);
        return;
      }

      router.push("/");
    } catch (error: any) {
      toast.error(error?.message || "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGithub = async () => {
    if (isLoading) return;

    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/"
    });
  };

  const signInWithGoogle = async () => {
    if (isLoading) return;

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/"
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isLoading}
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-blue-900">
                Sign up
              </Link>
            </p>

            <Separator />

            <Button
              type="button"
              disabled={isLoading}
              onClick={signInWithGithub}
              className="text-[13px]"
            >
              Continue with GitHub
            </Button>

            <Button
              type="button"
              disabled={isLoading}
              onClick={signInWithGoogle}
              className="text-[13px]"
            >
              Continue with Google
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}