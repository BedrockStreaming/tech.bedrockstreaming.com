import "../styles/index.css";
import React, { ReactNode } from "react";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}