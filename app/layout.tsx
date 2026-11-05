import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: "CreoHold", template: "%s - CreoHold" },
  description: "A digital wallet for Nigeria. Hold naira, send and receive crypto, convert currencies and pay bills, all in one place.",
  openGraph: {
    title: "CreoHold - Hold value, move freely.",
    description: "A digital wallet for Nigeria. Hold naira, send and receive crypto, convert currencies and pay bills, all in one place.",
    url: "https://creohold.com",
    siteName: "CreoHold",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CreoHold - Hold value, move freely.",
    description: "A digital wallet for Nigeria. Hold naira, send and receive crypto, convert currencies and pay bills, all in one place.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">Skip to main content</a>
        <QueryProvider>
          <NavBar />
          <main id="main">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
