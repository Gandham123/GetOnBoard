"use client";

import Navbar2 from "@/components/Navbar2";
import VideoHero from "@/components/VideoHero";
import StatsCounter from "@/components/StatsCounter";
import ExperienceSplit from "@/components/ExperienceSplit";
import GameExplorer from "@/components/GameExplorer";
import FoodMenu from "@/components/FoodMenu";
import CelebrityMasonry from "@/components/CelebrityMasonry";
import Testimonials from "@/components/Testimonials";
import CorporateSection from "@/components/CorporateSection";
import PinterestGallery from "@/components/PinterestGallery";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";
import { Phone } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Floating Navigation */}
      <Navbar2 />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <VideoHero />

        {/* Stats Section */}
        <StatsCounter />

        {/* Core Experience */}
        <ExperienceSplit />

        {/* Game library list explorer */}
        <GameExplorer />

        {/* Culinary Menu */}
        <FoodMenu />

        {/* Celebrity Grid */}
        <CelebrityMasonry />

        {/* Testimonials */}
        <Testimonials />

        {/* Corporate Space */}
        <CorporateSection />

        {/* Pinterest Gallery Grid */}
        <PinterestGallery />

        {/* Location Map Section */}
        <LocationMap />
      </main>

      {/* Footing Section */}
      <Footer />

      {/* Sticky Call Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center justify-center">
        {/* Pulsing ring background */}
        <div className="absolute w-16 h-16 bg-[#F57C00]/30 rounded-full animate-ping pointer-events-none" />
        <a
          href="tel:+919123456789"
          className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#F57C00] to-[#FF9800] text-white rounded-full shadow-[0_0_20px_rgba(245,124,0,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 group hover:shadow-[0_0_30px_rgba(245,124,0,0.8)]"
          aria-label="Call Us"
        >
          <Phone className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
        </a>
      </div>
    </>
  );
}
