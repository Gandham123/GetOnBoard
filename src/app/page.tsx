"use client";

import { useState } from "react";
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
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <>
      {/* Floating Navigation */}
      <Navbar2 onOpenBooking={openBooking} />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <VideoHero onOpenBooking={openBooking} />

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
        <CorporateSection onOpenBooking={openBooking} />

        {/* Pinterest Gallery Grid */}
        <PinterestGallery />

        {/* Location Map Section */}
        <LocationMap />
      </main>

      {/* Footing Section */}
      <Footer />

      {/* Multi-step Booking System Overlay */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </>
  );
}
