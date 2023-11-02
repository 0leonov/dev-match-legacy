"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { InputHTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Gender } from "@/enums";
import { useSession } from "@/hooks/auth/use-session";
import { useUpdate } from "@/hooks/auth/use-update";
import {
  EditProfileSchema,
  editProfileSchema,
} from "@/schemas/edit-profile-schema";

interface FormFieldProps {
  name: keyof EditProfileSchema;
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

export default function EditProfilePage() {
  const { user } = useSession();

  const { isLoading, error, update } = useUpdate();

  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      biography: "",
      gender: Gender.UNKNOWN,
      interests: [],
      password: "",
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Edit failed",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (user) {
      form.reset({ ...user, password: "zakerman31" });
    }
  }, [form, user]);

  if (!user) {
    return null;
  }

  return (
    <main className="mx-auto py-12 sm:max-w-screen-md xl:max-w-screen-lg xl:px-8">
      <h1>Edit profile</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(update)}>
          {formFieldsProps.map(({ name, label, inputProps }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">{label}</Label>
                      <Input {...field} {...inputProps} />
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <FormField
            control={form.control}
            name="biography"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Biography</Label>
                    <Textarea {...field} />
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full mt-8" disabled={isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Update
          </Button>
        </form>
      </Form>
    </main>
  );
}
