"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { Gender } from "@/enums";
import { useSession } from "@/hooks/auth/use-session";
import { useUpdate } from "@/hooks/auth/use-update";
import {
  EditProfileSchema,
  editProfileSchema,
} from "@/schemas/edit-profile-schema";

export default function EditProfilePage() {
  const { user } = useSession();

  const { isLoading, error, update } = useUpdate();

  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      name: user?.name || "",
      biography: user?.biography || "",
      gender: user?.gender || Gender.UNKNOWN,
      interests: user?.interests || [],
      password: "zakerman31",
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
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Input {...field} />
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
