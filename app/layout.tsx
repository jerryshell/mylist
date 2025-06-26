import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyList",
  description: "Manage your files the best way",
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
