import React from "react";

import { EditProfileForm } from "@/forms/edit-profile-form";

export default function EditProfilePage() {
  return (
    <main className="max-w-lg mx-auto p-8 py-12">
      <h1 className="text-5xl font-extrabold tracking-tight">Edit profile</h1>

      <EditProfileForm className="mt-6" />
    </main>
  );
}
