/*
File: Layout.tsx
Description: This is the root layout for the application.
*/

import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import { Creator, Description, Keywords, WebName } from "@/constants";
import "./globals.css";

// Font Inter
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: WebName,
  description: Description,
  creator: Creator,
  keywords: Keywords,
  icons: { apple: "/logo.jpg" },
  // manifest: "/manifest.json", // for pwa
};

export const viewport: Viewport = {
  themeColor: "#0b1015",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <AuthProvider>
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
