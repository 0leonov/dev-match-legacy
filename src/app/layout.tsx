import React from "react";
import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { ReduxProvider } from "@/store/slices/redux-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Match",
  description:
    "Social network for IT specialists – search, collaborate, learn, chat",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
