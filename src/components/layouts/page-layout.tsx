import React from "react";

export function PageLayout({
  children,
  title,
}: {
  children?: React.ReactNode;
  title?: string;
}) {
  return (
    <main className="max-w-screen-md mx-auto p-8 sm:py-24">
      <h1 className="text-3xl tracking-tight mb-8">{title}</h1>

      {children}
    </main>
  );
}
