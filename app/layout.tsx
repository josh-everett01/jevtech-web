import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JevTech Portfolio",
  description: "JevTech portfolio with Light, Dark, and Cosmic mission themes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
