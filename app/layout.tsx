import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyList",
  description: "以最佳方式管理个人文件",
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
