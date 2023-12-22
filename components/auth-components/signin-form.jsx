"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { SignInFormSchema } from "@/schema";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";

// import icons
import LoadingIcons from "../icons/loading-icons";
import LogoIcons from "../icons/logo-icons";

const SignInForm = () => {
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const form = useForm({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [sessionStatus, router, callbackUrl]);

  const onSubmit = async (values) => {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error === "CredentialsSignin") {
      if (res?.status === 401) {
        form.setError("password", {
          message: "No Account with your email or Invalid credentials",
        });
        toast.error("No Account with your email or Invalid credentials");
      } else {
        form.setError("password", { message: "Invalid credentials" });
        toast.error("Invalid credentials");
      }
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  if (sessionStatus === "loading" || sessionStatus === "authenticated") {
    return (
      <div className="grid place-items-center">
        <LoadingIcons />
      </div>
    );
  }

  return (
    sessionStatus === "unauthenticated" && (
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center mb-3">
          <LogoIcons />
        </div>
        <h1 className="text-2xl font-semibold">Log in to Dot Access</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} />
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="w-full mt-6 hover:bg-primary-hover"
              type="submit"
            >
              Continues
            </Button>
          </form>
        </Form>
        {/* <Button
          asChild
          variant={"link"}
          className="self-end px-0 pl-1 font-medium text-sky-600 w-min"
        >
          <Link href={"/auth/forgot-password"}>Forgot your password?</Link>
        </Button> */}
      </div>
    )
  );
};

export default SignInForm;
