import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
      </html>
  );
}