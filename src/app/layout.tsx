import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Get On Board | Premium Board Game Cafe & Social Club Hyderabad",
  description: "Hyderabad's ultimate board gaming destination in Jubilee Hills. 1200+ games, gourmet cafe, family-friendly vibe, and a favorite destination for celebrities.",
  keywords: "board game cafe, hyderabad cafe, jubilee hills cafe, get on board, social club, strategy games, premium board games, team bonding, Hyderabad celebrity hangouts",
  openGraph: {
    title: "Get On Board | Premium Board Game Cafe & Social Club",
    description: "Experience Hyderabad's finest board gaming lounge in Jubilee Hills. 1200+ games, custom-crafted food, and premium hospitality.",
    images: [{ url: "/assets/hero_background.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-brand-dark bg-[#F9FBFF] selection:bg-[#1565C0] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
