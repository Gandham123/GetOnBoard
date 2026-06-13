"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface VideoHeroProps {
  onOpenBooking: () => void;
}

export default function VideoHero({ onOpenBooking }: VideoHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax for Hero Background and Text
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacityY = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#0D1B2A]"
    >
      {/* Background Video with Scroll Parallax */}
      <motion.div
        style={{ y: bgY, scale: 1.1 }}
        className="absolute inset-0 w-full h-full overflow-hidden opacity-100"
        aria-hidden="true"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/heroVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Hero Content Overlay */}
      <motion.div
        style={{ y: textY, opacity: opacityY }}
        className="relative z-20 text-center max-w-4xl px-6 flex flex-col items-center"
      >
        {/* Playful & Luxury Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="h-px w-6 bg-[#1565C0]/50" />
          <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#FF9800] font-semibold">
            Where Every Table Tells A Story
          </span>
          <span className="h-px w-6 bg-[#1565C0]/50" />
        </motion.div>

        {/* Brand Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", delay: 0.3 }}
          className="font-serif text-3xl md:text-6xl lg:text-8xl font-bold text-white leading-none mb-6 tracking-tight"
        >
          Get On Board
        </motion.h1>

        {/* Subtitle list */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-xl text-white/90 font-light tracking-wide max-w-2xl mb-10 leading-relaxed font-sans"
        >
          India&apos;s Ultimate Board Gaming Destination
          <span className="block text-xs md:text-sm uppercase tracking-wider text-[#FF9800] font-semibold mt-3">
            1200+ Games &bull; Celebrity Favorite &bull; Family Friendly &bull; Jubilee Hills
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#games"
            className="w-full sm:w-auto text-center border border-white/10 hover:border-[#1E88E5]/50 hover:text-[#1E88E5] text-white/90 text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-full transition-all duration-300"
          >
            Explore Games
          </a>
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-[#F57C00] hover:bg-[#FF9800] text-white text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(245,124,0,0.3)] hover:scale-105 active:scale-95"
          >
            Book A Table
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
