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
        <div className="mx-auto w-full max-w-7xl p-4">{children}</div>
      </div>
  );
}
