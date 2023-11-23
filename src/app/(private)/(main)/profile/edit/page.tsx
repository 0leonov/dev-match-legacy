"use client";

import React from "react";

import { EditProfileForm } from "@/forms/edit-profile-form";
import { UpdateAvatarForm } from "@/forms/update-avatar-form";

export default function EditProfilePage() {
  return (
    <main className="max-w-screen-md mx-auto p-8 py-12">
      <h1 className="text-2xl font-semibold">Edit profile</h1>

      <div className="mb-8 space-y-6">
        <UpdateAvatarForm />

        <EditProfileForm />
      </div>
    </main>
  );
}
