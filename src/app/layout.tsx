import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Trust Mark Real Estate Advisor | Buy • Sell • Rent Properties in Pakistan",
  description:
    "Trust Mark Real Estate Advisor - Your trusted partner for buying, selling, renting, and investing in properties across Pakistan. Honesty • Trust • Transparency",
  keywords: [
    "real estate",
    "Pakistan property",
    "Lahore property",
    "buy property",
    "sell property",
    "rent property",
    "investment deals",
    "plots",
    "commercial property",
    "Trust Mark",
  ],
  authors: [{ name: "Trust Mark Real Estate Advisor" }],
  icons: {
    icon: "/images/logo.jpeg",
  },
  openGraph: {
    title: "Trust Mark Real Estate Advisor",
    description: "Buy | Sell | Rent Properties Across Pakistan",
    siteName: "Trust Mark Real Estate Advisor",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
