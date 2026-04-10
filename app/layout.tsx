import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Griya Hydrofarm - Sayuran Hidroponik Segar",
  description: "Griya Hydrofarm menyediakan sayuran hidroponik segar berkualitas tinggi. Pesan sekarang melalui WhatsApp!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
