"use client";

import React from "react";

import { EditProfileForm } from "@/forms/edit-profile-form";
import { UpdateAvatarForm } from "@/forms/update-avatar-form";

export default function EditProfilePage() {
  return (
    <main className="max-w-screen-md mx-auto p-8 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">
        Edit profile
      </h1>

      <UpdateAvatarForm />

      <EditProfileForm className="mt-6" />
    </main>
  );
}
