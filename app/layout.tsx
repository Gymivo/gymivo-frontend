import type { Metadata } from "next";
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
      <body className="font-vazirmatn antialiased">
        {children}
      </body>
    </html>
  );
}
