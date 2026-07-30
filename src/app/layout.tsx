import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { AnimatedBackground } from "@/components/public/AnimatedBackground";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Himalya Sparsh — Pure Himalayan Water, Refined by Science",
  description:
    "A premium Himalayan-grade water purification system. Natural minerals, advanced filtration, timeless design. Experience water the way the peaks intended.",
  keywords: [
    "Himalayan water",
    "water purifier",
    "mineral water",
    "alkaline water",
    "wellness technology",
    "natural filtration",
  ],
  authors: [{ name: "Himalya Sparsh" }],
  openGraph: {
    title: "Himalya Sparsh — Pure Himalayan Water",
    description: "By the Himalaya, from the Himalayas. Premium water purification.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himalya Sparsh",
    description: "Pure Himalayan Water, Refined by Science",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased bg-navy text-white noise-overlay">
        <Providers>
          {/* Fixed Three.js particle background layer */}
          <AnimatedBackground />

          {/* Content layer above background */}
          <div className="content-layer flex flex-col flex-1 relative">
            <Header />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
