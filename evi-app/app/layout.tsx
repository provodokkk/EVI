import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "../components/Nav";
import { cn } from "utils";

export const metadata: Metadata = {
  title: "Empathic Shopping Assistant",
  description:
    "An intelligent, empathic voice assistant helping you find the best products tailored to your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/AI-Empathy-icon.png" />
      </head>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screen relative"
        )}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
