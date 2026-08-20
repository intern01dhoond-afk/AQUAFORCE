import type { Metadata } from "next";
import "./globals.css";
import { OrderModalProvider } from "@/context/OrderModalContext";

export const metadata: Metadata = {
  title: "AMEC Aquaforce 1400 | Cordless. Powerful. Portable.",
  description:
    "Wash your car anywhere with the AMEC Aquaforce 1400 — a powerful, battery-powered portable pressure washer. No cables, no power socket, no fixed setup needed.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans">
        <OrderModalProvider>{children}</OrderModalProvider>
      </body>
    </html>
  );
}
