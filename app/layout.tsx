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
      <body className="relative bg-neutral-200 top-0 left-0 w-full z-50 m-auto min-h-screen max-w-[390px]">
        {children}
      </body>
    </html>
  );
}
