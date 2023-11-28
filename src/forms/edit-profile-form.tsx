"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Gender, Interest } from "@/enums";
import { useEditProfile } from "@/hooks/auth/use-edit-profile";
import { useSession } from "@/hooks/auth/use-session";
import { cn } from "@/lib";
import {
  editProfileSchema,
  EditProfileSchema,
} from "@/schemas/edit-profile-schema";

const interests = [
  {
    label: "Projects",
    value: Interest.PROJECT,
  },
  {
    label: "Friendship / Relationships",
    value: Interest.RELATIONSHIPS,
  },
  {
    label: "Learning Partner",
    value: Interest.KNOWLEDGE,
  },
] as const;

export function EditProfileForm({ className }: { className?: string }) {
  const { user } = useSession();

  const { isLoading, error, edit } = useEditProfile();

  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: "",
      name: "",
      biography: "",
      interests: [],
      gender: Gender.UNKNOWN,
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
      form.setValue("username", user.username);
      form.setValue("name", user.name);
      form.setValue("biography", user.biography);
      form.setValue("interests", user.interests);
      form.setValue("gender", user.gender);
    }
  }, [form, user]);

  if (!user) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(edit)}
        className={cn("p-8 rounded-xl bg-secondary", className)}
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormControl>
                  <Input id="username" {...field} placeholder="john_doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input id="name" {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="biography"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="biography">Biography</FormLabel>
                <FormControl>
                  <Textarea id="biography" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Gender.UNKNOWN}>
                      Do not specify
                    </SelectItem>
                    <SelectItem value={Gender.MALE}>Male</SelectItem>
                    <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interests"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    What are you looking for
                  </FormLabel>

                  <FormDescription>
                    To improve search algorithms, specify what you want to find
                    on our platform.
                  </FormDescription>
                </div>

                {interests.map(({ label, value }) => (
                  <FormField
                    key={label}
                    control={form.control}
                    name="interests"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, value])
                                  : field.onChange(
                                      field.value?.filter((a) => a !== value),
                                    );
                              }}
                            />
                          </FormControl>

                          <FormLabel className="font-normal">{label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full mt-6" disabled={isLoading} variant="accent">
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
