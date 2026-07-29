import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Himalya Sparsh - Pure Himalayan Water Solution",
  description: "Experience pure Himalayan water with our scientifically designed device. Natural wellness, advanced technology.",
  keywords: ["Himalayan water", "water purifier", "mineral water", "wellness", "natural water"],
  openGraph: {
    title: "Himalya Sparsh - Pure Himalayan Water",
    description: "By the Himalaya, from the Himalayas",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}