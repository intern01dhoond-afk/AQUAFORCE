import type { Metadata } from "next";
import { Inter, Montserrat, Montserrat_Alternates, Open_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import { OrderModalProvider } from "@/context/OrderModalContext";
import { BulkEnquiryProvider } from "@/context/BulkEnquiryContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://promectools.in/aquaforceforautocare"),
  title: "AMEC Aquaforce 1400 | Cordless. Powerful. Portable.",
  description:
    "Wash your car anywhere with the AMEC Aquaforce 1400 - a powerful, battery-powered portable pressure washer. No cables, no power socket, no fixed setup needed.",
  icons: {
    icon: [
      { url: "/aquaforceforautocare/images/favicon.ico" },
      { url: "/aquaforceforautocare/favicon.ico" },
    ],
    shortcut: "/aquaforceforautocare/images/favicon.ico",
    apple: "/aquaforceforautocare/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${montserrat.variable} ${montserratAlternates.variable} ${openSans.variable} ${unbounded.variable} antialiased font-sans`}>
        <OrderModalProvider>
          <BulkEnquiryProvider>{children}</BulkEnquiryProvider>
        </OrderModalProvider>
      </body>
    </html>
  );
}
