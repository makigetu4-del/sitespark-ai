import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SiteSpark — AI website builder",
  description: "Build a polished one-page website from a simple idea, preview it instantly, and export it to HTML.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
