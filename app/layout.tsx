import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JevTech Custom Solutions",
  description: "Custom full-stack software — web applications, e-commerce platforms, APIs, and real-time systems. Plan. Build. Launch.",
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
