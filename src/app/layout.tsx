import type { Metadata } from "next";
import { geistSans, montserrat } from "../fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cap. — Objectifs d’épargne",
  description: "Votre espace privé de suivi des objectifs d’épargne.",
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
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}