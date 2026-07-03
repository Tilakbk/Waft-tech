import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "@/components/layout/RootLayoutClient";

export const metadata: Metadata = {
  title: "Waft Tech | Building Digital Solutions",
  description:
    "We discover, design, and build effective digital solutions tailor-made for your ideas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}