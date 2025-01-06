import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Funtom",
  description:
    "A clone of the Phantom website built for educational purposes, recreating its sleek interface and animations using modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(montserrat.variable, "antialiased")}>{children}</body>
    </html>
  );
}
