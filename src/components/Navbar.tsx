"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    // { label: "Experience", href: "#experience" },
    { label: "Games", href: "#games" },
    { label: "Food & Drinks", href: "#food" },
    { label: "Celebrities", href: "#celebrities" },
    { label: "Reviews", href: "#reviews" },
    // { label: "Events", href: "#events" },
    // { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? "py-2 bg-[#3F2B2A]/90 backdrop-blur-md shadow-lg border-b border-white/5"
          : "py-2 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-[#E5E0D5]">
            {/* <span className="font-serif text-xl md:text-2xl font-bold tracking-widest uppercase">
              Get On Board
            </span>
            <Sparkles size={16} className="text-[#8F9B60] animate-pulse" /> */}
            <img src="/assets/Logo.png" alt="Get On Board Logo" className="h-10 w-10 rounded-full" />
            {/* <img src="/assets/Logo2.png" alt="Get On Board Logo" className="h-14 w-14 rounded-full" /> */}
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-widest font-semibold text-[#E5E0D5]/80 hover:text-[#C7AB94] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="bg-[#8F9B60] hover:bg-[#8F9B60]/90 text-white text-[9px] uppercase tracking-widest font-bold px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 premium-glow-olive"
            >
              Book A Table
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#E5E0D5] hover:text-[#C7AB94] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] bottom-0 z-30 bg-[#3F2B2A] border-t border-white/5 flex flex-col justify-between p-8 overflow-y-auto lg:hidden"
          >
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-3xl text-[#E5E0D5] hover:text-[#8F9B60] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#8F9B60] hover:bg-[#8F9B60]/90 text-white text-xs uppercase tracking-widest font-bold py-4 rounded-full text-center block transition-all"
              >
                Book A Table
              </button>
              <div className="text-center text-xs text-[#928A81]">
                Jubilee Hills, Hyderabad | Open Daily
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
