"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { InputHTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useRegister } from "@/hooks/use-register";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be longer than 3 characters.")
    .max(32, "Name must be shorten than 32 characters."),
  username: z
    .string()
    .min(3, "Username must be longer than 3 characters.")
    .max(32, "Username must be shorten than 32 characters.")
    .refine(
      (value) => /^[a-zA-Z0-9_]+$/.test(value),
      "Username can only consist of Latin characters, numbers and underscores.",
    ),
  email: z.string().email("'Invalid email.'"),
  password: z
    .string()
    .min(6, "Password must be longer than 6 characters.")
    .max(255, "Password must be shorter than 255 characters."),
});

type FormSchema = z.infer<typeof formSchema>;

interface FormFieldProps {
  name: keyof FormSchema;
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

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
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
        title: "Failed to register",
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

        <Button className="mt-8 w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Sign up
        </Button>
      </form>
    </Form>
  );
}
