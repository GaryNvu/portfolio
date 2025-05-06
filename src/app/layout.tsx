import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gary Neveu - Portfolio",
  description: "Portfolio de Gary Neveu - Développeur Full Stack",
  icons: {
    icon: [{ url: '/logo.png' }],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}