import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/landing-styles.css";
import SessionProvider from "@/provider/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/navigation/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Everest IT Club",
  description: "Everest IT Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
