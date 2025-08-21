import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todook - Simple Task Management",
  description:
    "Fast, reliable, and simple task management app. Organize your todos with ease.",
  keywords: ["todo", "task management", "productivity", "organizer"],
  authors: [{ name: "Todook Team" }],
  creator: "Todook",
  publisher: "Todook",
  robots: "index, follow",
  manifest: "/manifest.json",
  openGraph: {
    title: "Todook - Simple, yet reliable",
    description:
      "Fast, reliable, and simple task management app. Organize your todos with ease.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Todook - Simple, yet reliable",
    description:
      "Fast, reliable, and simple task management app. Organize your todos with ease.",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
