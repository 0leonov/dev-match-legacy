"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { InputHTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";

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
import { useToast } from "@/components/ui/use-toast";
import { useRegister } from "@/hooks/auth/use-register";
import { registerSchema, RegisterSchema } from "@/schemas/register-schema";

interface FormFieldProps {
  name: keyof RegisterSchema;
  label?: string;
  description?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const formFieldsProps: FormFieldProps[] = [
  {
    name: "name",
    label: "Name",
    description: "public display name",
    inputProps: {
      placeholder: "John Doe",
    },
  },
  {
    name: "username",
    label: "Username",
    description: "name to identify you",
    inputProps: {
      placeholder: "john_doe",
    },
  },
  {
    name: "email",
    label: "Email",
    inputProps: {
      placeholder: "example@company.com",
      type: "email",
    },
  },
  {
    name: "password",
    label: "Password",
    inputProps: {
      placeholder: "••••••••••",
      type: "password",
    },
  },
];

export function RegisterForm({ className }: { className?: string }) {
  const { isLoading, error, register } = useRegister();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Failed to sign up",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(register)} className={className}>
        <div className="space-y-4">
          {formFieldsProps.map(({ name, label, description, inputProps }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {label}{" "}
                    {description && (
                      <span className="text-xs text-muted-foreground">
                        ({description})
                      </span>
                    )}
                  </FormLabel>

                  <FormControl>
                    <Input {...inputProps} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button className="mt-8 w-full" disabled={isLoading} variant="accent">
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Sign up
        </Button>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="font-medium underline-offset-4 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/terms"
            className="font-medium underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </Form>
  );
}
