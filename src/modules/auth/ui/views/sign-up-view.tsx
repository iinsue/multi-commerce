"use client";

import z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { registerSchema } from "../../schemas";

// poppins폰트는 굵기700만 제공합니다.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const SignUpView = () => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message, { id: "sign-up" });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        toast.success("가입되었습니다.", { id: "sign-up" });
        router.replace("/");
      },
    })
  );

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    register.mutate(values);
  };

  const username = form.watch("username");
  const usernameErrors = form.formState.errors.username;

  const showPreview = username && !usernameErrors;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/">
                <span
                  className={cn("text-2xl font-semibold", poppins.className)}
                >
                  funroad
                </span>
              </Link>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-base border-none underline"
              >
                <Link prefetch href="/sign-in">
                  Sign in
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Join over 1,580 creators earning money on Funroad.
            </h1>

            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn("hidden", showPreview && "block")}
                  >
                    Your store will be availbale at&nbsp;
                    {/* TODO: Use proper method to generate preview url */}
                    <strong>{username}</strong>.shop.com
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={register.isPending}
              type="submit"
              size="lg"
              variant="elevated"
              className="bg-black text-white hover:bg-pink-400 hover:text-primary"
            >
              Create account
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
