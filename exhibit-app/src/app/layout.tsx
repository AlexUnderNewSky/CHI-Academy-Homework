import React from "react";
import Header from "@/components/Header"; // Подключаем Header

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ marginTop: "100px" }}>{children}</main>
      </body>
    </html>
  );
}