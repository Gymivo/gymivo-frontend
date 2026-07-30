import type { Metadata } from "next";
// @ts-ignore: allow CSS imports without type declarations
import "./globals.css";

export const metadata: Metadata = {
  title: "Gymivo",
  description: "This is Gymivo Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazirmatn antialiased">{children}</body>
    </html>
  );
}
