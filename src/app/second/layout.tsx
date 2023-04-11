'use client'

import "../globals.css";
import Header from "./components/header/Header";
import ClientOnly from "../first/components/ClientOnly";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div>
        <ClientOnly>
          <Header />
        </ClientOnly>
        <div className="">{children}</div>
      </div>
  );
}
