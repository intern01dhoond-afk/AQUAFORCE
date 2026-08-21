import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates, Open_Sans } from "next/font/google";
import "./globals.css";
import { OrderModalProvider } from "@/context/OrderModalContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  variable: "--font-montserrat-alternates",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

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
      <body className={`${montserrat.variable} ${montserratAlternates.variable} ${openSans.variable} antialiased font-sans`}>
        <OrderModalProvider>{children}</OrderModalProvider>
      </body>
    </html>
  );
}
