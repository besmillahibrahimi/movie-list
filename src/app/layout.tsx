import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Image from "next/image";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased min-h-screen`}
        style={{
          backgroundImage: 'url("/wave.png")',
          backgroundPosition: "bottom",
          backgroundSize: "100vw 7rem",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </body>
    </html>
  );
}
