import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voorraad",
  description: "De online voorraad van huize van Zanten",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
