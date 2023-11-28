"use client";

import React from "react";

import { PageLayout } from "@/components/layouts/page-layout";
import { EditProfileForm } from "@/forms/edit-profile-form";
import { UpdateAvatarForm } from "@/forms/update-avatar-form";

export default function EditProfilePage() {
  return (
    <PageLayout title="Edit profile">
      <div className="space-y-6">
        <UpdateAvatarForm />

        <EditProfileForm />
      </div>
    </PageLayout>
  );
}
