import React from "react";
// import Header from "../components/Header";
// import { Provider } from "react-redux";
// import store from "../store/store";

// Глобальный layout, например для header, footer
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* <Header/> */}
      <body>{children}</body>
    </html>
  );
}
