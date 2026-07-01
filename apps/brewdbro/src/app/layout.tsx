import type { Metadata } from "next";
import { Outfit, DM_Sans, Space_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Display: Outfit (Google-hosted stand-in for Clash Display)
const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display-src",
  display: "swap",
});
// Body: DM Sans (stand-in for Satoshi)
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans-src",
  display: "swap",
});
// Mono: Space Mono — prices, spec labels (echoes the product catalogue voice)
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-src",
  display: "swap",
});
// Editorial serif: Fraunces — big cinematic headlines (Reel 4 refinement)
const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif-src",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brewdbro.in"),
  title: "BrewdBro — Just Brew It Bro!",
  description:
    "Café-grade iced coffee you make at home, in a cup so good you'll never throw it away. Instant premix + aesthetic reusable glass tumblers. Just Brew It Bro!",
  openGraph: {
    title: "BrewdBro — Just Brew It Bro!",
    description:
      "Café-grade iced coffee at home in a cup you keep. Premix + aesthetic reusable glass tumblers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body className="min-h-dvh bg-cream text-espresso antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
