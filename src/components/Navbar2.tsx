"use client";

import { useState, useEffect } from "react";
import { Menu, X, Dices, Users, Image as ImageIcon, MapPin, Calendar, Utensils, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Navbar2Props {
  onOpenBooking: () => void;
}

export default function Navbar2({ onOpenBooking }: Navbar2Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftLinks = [
    { label: "Games", href: "#games", icon: Dices },
    { label: "Experience", href: "#experience", icon: Users },
    { label: "Menu", href: "#food", icon: Utensils },
    { label: "Reviews", href: "#reviews", icon: Star },
  ];

  const rightLinks = [
    { label: "Gallery", href: "#gallery", icon: ImageIcon },
    { label: "Contact", href: "#location", icon: MapPin },
  ];

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-[100] px-4 md:px-6 w-full pointer-events-none">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="max-w-4xl mx-auto w-full pointer-events-auto"
        >
          {/* Main Capsule Navbar */}
          <div
            className={`w-full rounded-2xl h-[60px] flex items-center justify-between px-6 relative transition-all duration-300 border ${isScrolled
              ? "bg-[#0B0A16]/90 border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              : "bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-lg"
              }`}
          >
            {/* Left Section: Menu Toggle (Mobile) + Left Links (Desktop) */}
            <div className="flex items-center gap-4 lg:gap-6 flex-1 justify-start">
              {/* Hamburger Button (hidden above lg) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#E5E0D5] hover:text-teal-400 transition-colors focus:outline-none lg:hidden"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              {/* Left Side Links */}
              <div className="hidden lg:flex items-center gap-8">
                {leftLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="group flex flex-col items-center gap-1 text-[#E5E0D5]/80 hover:text-teal-400 transition-colors"
                    >
                      <Icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-[10px] uppercase tracking-widest font-bold font-sans">
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Center Section: Taller Highlighted Logo Container */}
            <div className="relative w-22 h-full flex items-center justify-center z-20">
              <a
                href="#"
                className="absolute -top-[4px] sm:-top-[10px] w-[68px] h-[68px] sm:w-[80px] sm:h-[80px] bg-[#0A0714] border-2 border-teal-500/50 rounded-2xl shadow-[0_0_20px_rgba(20,184,166,0.4)] flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                {/* Logo Image with background, filling the entire space */}
                <img
                  src="/assets/Logo.png"
                  alt="Get On Board Logo"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Soft glow hover effect overlay */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </a>
            </div>

            {/* Right Section: Right Links (Desktop) + CTA Button */}
            <div className="flex items-center gap-6 lg:gap-8 flex-1 justify-end">
              {/* Right Side Links */}
              <div className="hidden lg:flex items-center gap-8">
                {rightLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className="group flex flex-col items-center gap-1 text-[#E5E0D5]/80 hover:text-teal-400 transition-colors"
                    >
                      <Icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-[10px] uppercase tracking-widest font-bold font-sans">
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Book a Table Button */}
              <button
                onClick={onOpenBooking}
                className="bg-teal-500 hover:bg-teal-400 text-white text-[10px] lg:text-[11px] uppercase tracking-widest font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg shadow-teal-500/20 border border-teal-500/30"
              >
                <span className="hidden sm:inline">Book A Table</span>
                <span className="inline sm:hidden">Book</span>
                <Calendar size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Drawer Menu (Mobile & Tablet Sidebar Trigger) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer Body - sliding from the side */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 z-[95] w-full max-w-[300px] bg-[#5ab6f0] border-r border-white/[0.08] shadow-2xl flex flex-col justify-between p-8 pt-28 lg:hidden"
            >
              {/* Menu Links with Icons */}
              <div className="flex flex-col gap-6">
                {[...leftLinks, ...rightLinks].map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center gap-4 text-xl font-medium text-[#E5E0D5] hover:text-[#14B8A6] transition-colors"
                    >
                      <div className=" border border-[#f56645] p-2.5 rounded-xl text-[#14B8A6] group-hover:bg-[#14B8A6]/20 transition-all">
                        <Icon size={20} color="#f56645" />
                      </div>
                      <span className="font-serif tracking-wide text-2xl">{link.label}</span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Bottom Drawer Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full bg-[#f56645] hover:bg-teal-400 text-white text-xs uppercase tracking-widest font-bold py-4 rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/10"
                >
                  Book A Table <Calendar size={14} />
                </button>
                <div className="text-center text-xs text-[#928A81] font-light leading-relaxed">
                  <p className="font-bold text-[#fff] uppercase tracking-wider mb-1">Get On Board Cafe</p>
                  <p>Jubilee Hills, Hyderabad | Open Daily</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
