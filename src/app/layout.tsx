import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { CartProvider } from "@/context/CartContext";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aavkar Fashion",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <CartProvider>
            <div>
              <Nav />
              {children}
              <Footer />
            </div>
            <Analytics />
            <SpeedInsights />
            <Toaster />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
