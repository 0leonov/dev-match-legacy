"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/use-login";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email ir required." }),
  password: z.string().min(1, { message: "Password ir required." }),
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm({ className }: { className?: string }) {
  const { isLoading, error, login } = useLogin();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Login failed",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(login)} className={className}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input
                  placeholder="example@company.com"
                  type="email"
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
            <FormItem className="mt-4">
              <FormLabel>Password</FormLabel>

              <FormControl>
                <Input placeholder="••••••••••" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-8" disabled={isLoading}>
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Sign in
        </Button>
      </form>
    </Form>
  );
}
