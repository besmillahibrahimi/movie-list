import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Movie List",
  description: "You find curated movies here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${montserrat.className} antialiased min-h-screen pb-32`}
        style={{
          backgroundImage: 'url("/wave.png")',
          backgroundPosition: "bottom",
          backgroundSize: "100vw 7rem",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
