"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Play } from "lucide-react";

interface InteractiveHeroProps {
  onOpenBooking: () => void;
}

export default function InteractiveHero({ onOpenBooking }: InteractiveHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax for Hero Background and Text
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacityY = useTransform(scrollY, [0, 400], [1, 0]);

  // Cursor Parallax for Floating Elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const floatX1 = useSpring(useTransform(mouseX, [-300, 300], [-30, 30]), springConfig);
  const floatY1 = useSpring(useTransform(mouseY, [-300, 300], [-30, 30]), springConfig);

  const floatX2 = useSpring(useTransform(mouseX, [-300, 300], [20, -20]), springConfig);
  const floatY2 = useSpring(useTransform(mouseY, [-300, 300], [20, -20]), springConfig);

  const floatX3 = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);
  const floatY3 = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX - innerWidth / 2;
      const y = clientY - innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#3F2B2A]"
    >
      {/* Background Image with Scroll Parallax */}
      <motion.div
        style={{ y: bgY, scale: 1.1 }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        priority-attribute="true"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/hero_bg.png')` }}
        />
        {/* Dark/Warm overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3F2B2A] via-[#3F2B2A]/40 to-[#3F2B2A]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3F2B2A]/70 via-transparent to-[#3F2B2A]/30" />
      </motion.div>

      {/* Floating game pieces */}
      <div className="absolute top-20 left-8 text-5xl opacity-20 float-anim text-[#E5E0D5] select-none pointer-events-none" style={{ animationDelay: "0s" }}>♟</div>
      <div className="absolute top-32 right-12 text-4xl opacity-15 float-anim text-[#E5E0D5] select-none pointer-events-none" style={{ animationDelay: "1s" }}>🎯</div>
      <div className="absolute bottom-32 left-16 text-4xl opacity-20 float-anim text-[#E5E0D5] select-none pointer-events-none" style={{ animationDelay: "2s" }}>🃏</div>
      <div className="absolute bottom-24 right-8 text-5xl opacity-15 float-anim text-[#E5E0D5] select-none pointer-events-none" style={{ animationDelay: "0.5s" }}>🎲</div>
      <div className="absolute top-1/2 left-4 text-3xl opacity-10 float-anim text-[#E5E0D5] select-none pointer-events-none" style={{ animationDelay: "1.5s" }}>♛</div>
      <div className="absolute top-1/3 right-6 text-3xl opacity-10 float-anim text-[#E5E0D5] select-none pointer-events-none" style={{ animationDelay: "2.5s" }}>🧩</div>

      {/* Floating Dice Element 1 (Top Left) */}
      {/* <motion.div
        style={{ x: floatX1, y: floatY1 }}
        className="absolute top-[20%] left-[10%] z-10 w-24 h-24 pointer-events-none hidden md:block select-none animate-float-slow"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
         
          <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" fill="#C7AB94" opacity="0.9" />
          <polygon points="50,15 85,35 50,55 15,35" fill="#E5E0D5" opacity="0.9" />
          <polygon points="50,55 85,35 85,75 50,95" fill="#928A81" opacity="0.9" />
          
          <circle cx="50" cy="35" r="4" fill="#3F2B2A" />
          <circle cx="35" cy="27" r="4" fill="#3F2B2A" />
          <circle cx="65" cy="43" r="4" fill="#3F2B2A" />

          <circle cx="35" cy="57" r="4" fill="#E5E0D5" />
          <circle cx="35" cy="73" r="4" fill="#E5E0D5" />
          <circle cx="45" cy="65" r="4" fill="#E5E0D5" />
        </svg>
      </motion.div> */}

      {/* Floating Card Element 2 (Bottom Right) */}
      <motion.div
        style={{ x: floatX2, y: floatY2 }}
        className="absolute bottom-[20%] right-[12%] z-10 w-20 h-28 pointer-events-none hidden md:block select-none animate-float-medium"
      >
        <div className="w-full h-full bg-[#E5E0D5]/95 rounded-xl shadow-2xl border border-[#C7AB94] p-3 transform rotate-12 flex flex-col justify-between">
          <div className="flex justify-between items-center text-[#8F9B60]">
            <span className="font-serif text-sm font-bold">A</span>
            <span>♠</span>
          </div>
          <div className="flex justify-center text-[#3F2B2A] my-auto scale-125">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
              <path d="M12 2C11.5 2 10 5 10 9c0 3 2 5 2 5s2-2 2-5c0-4-1.5-7-2-7zm0 13c-2.2 0-4 1.8-4 4h8c0-2.2-1.8-4-4-4z" />
            </svg>
          </div>
          <div className="flex justify-between items-center text-[#8F9B60] rotate-180">
            <span className="font-serif text-sm font-bold">A</span>
            <span>♠</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Meeple Element 3 (Top Right) */}
      <motion.div
        style={{ x: floatX3, y: floatY3 }}
        className="absolute top-[25%] right-[20%] z-10 w-12 h-12 pointer-events-none hidden lg:block select-none animate-float-fast"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#8F9B60] opacity-80 drop-shadow-xl">
          <path d="M50,15 C55.5,15 60,19.5 60,25 C60,30.5 55.5,35 50,35 C44.5,35 40,30.5 40,25 C40,19.5 44.5,15 50,15 Z M35,42 L65,42 C67.8,42 70,44.2 70,47 L70,55 C70,57.8 67.8,60 65,60 L62,60 L62,85 C62,87.8 59.8,90 57,90 L43,90 C40.2,90 38,87.8 38,85 L38,60 L35,60 C32.2,60 30,57.8 30,55 L30,47 C30,44.2 32.2,42 35,42 Z" />
        </svg>
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
          <span className="h-px w-6 bg-[#C7AB94]" />
          <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#C7AB94] font-semibold">
            Where Every Table Tells A Story
          </span>
          <span className="h-px w-6 bg-[#C7AB94]" />
        </motion.div>

        {/* Brand Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", delay: 0.3 }}
          className="font-serif text-3xl md:text-6xl lg:text-8xl font-bold text-[#E5E0D5] leading-none mb-6 tracking-tight"
        >
          Get On Board
        </motion.h1>

        {/* Subtitle list */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-xl text-[#E5E0D5]/90 font-light tracking-wide max-w-2xl mb-10 leading-relaxed font-sans"
        >
          India&apos;s Ultimate Board Gaming Destination
          <span className="block text-xs md:text-sm uppercase tracking-wider text-[#C7AB94] font-semibold mt-2">
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
            className="w-full sm:w-auto text-center border border-[#E5E0D5]/40 hover:border-[#E5E0D5] text-[#E5E0D5] text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-full transition-colors duration-300"
          >
            Explore Games
          </a>
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-[#8F9B60] hover:bg-[#8F9B60]/90 text-white text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-full transition-all duration-300 premium-glow-olive hover:scale-105 active:scale-95"
          >
            Book A Table
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative Elegant bottom fade to section 2 */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#E5E0D5] to-transparent pointer-events-none" /> */}
    </div>
  );
}
