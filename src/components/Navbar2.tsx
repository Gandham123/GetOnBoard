"use client";

import { useState, useEffect } from "react";
import { Menu, X, Dices, Users, Image as ImageIcon, MapPin, Calendar, Utensils, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar2() {
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
    { label: "Events", href: "#events", icon: Calendar },
    { label: "Celebrities", href: "#celebrities", icon: Sparkles },
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
              ? "bg-[#0D1B2A]/90 border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              : "bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-lg"
              }`}
          >
            {/* Left Section: Menu Toggle (Mobile) + Left Links (Desktop) */}
            <div className="flex items-center gap-4 lg:gap-6 flex-1 justify-start">
              {/* Hamburger Button (hidden above lg) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-[#FF9800] transition-colors focus:outline-none lg:hidden"
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
                      className="group flex flex-col items-center gap-1 text-white/80 hover:text-[#FF9800] transition-colors"
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
                className="absolute -top-[4px] sm:-top-[10px] w-[68px] h-[68px] sm:w-[88px] sm:h-[80px] bg-[#0D1B2A] border-2 border-[#1565C0]/50 rounded-2xl shadow-[0_0_20px_rgba(21,101,192,0.4)] flex items-center justify-center overflow-hidden transition-all duration-300 active:scale-95 group"
              >
                {/* Logo Image with background, filling the entire space */}
                <img
                  src="/assets/Logo.png"
                  alt="Get On Board Logo"
                  className="w-full h-full object-cover"
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
                      className="group flex flex-col items-center gap-1 text-white/80 hover:text-[#FF9800] transition-colors"
                    >
                      <Icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-[10px] uppercase tracking-widest font-bold font-sans">
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Contact Link (Mobile only) */}
              <a
                href="#location"
                className="lg:hidden group flex items-center gap-1.5 text-white/80 hover:text-[#FF9800] transition-colors"
              >
                <MapPin size={16} className="text-[#FFF] group-hover:scale-110 transition-transform duration-200" />
                <span className="text-[10px] uppercase tracking-widest font-bold font-sans">
                  Contact
                </span>
              </a>
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
              className="fixed top-0 left-0 bottom-0 z-[95] w-full max-w-[300px] bg-[#0D1B2A] border-r border-white/[0.08] shadow-2xl flex flex-col justify-between p-8 pt-28 lg:hidden"
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
                      className="group flex items-center gap-4 text-xl font-medium text-white/90 hover:text-[#FF9800] transition-colors"
                    >
                      <div className="border border-[#F57C00]/40 bg-[#F57C00]/10 p-2.5 rounded-xl text-[#FF9800] group-hover:bg-[#F57C00]/20 transition-all">
                        <Icon size={20} />
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
                <div className="text-center text-xs text-[#546E7A] font-light leading-relaxed">
                  <p className="font-bold text-[#FF9800] uppercase tracking-wider mb-1">Get On Board Cafe</p>
                  <p className="text-white/60">Jubilee Hills, Hyderabad | Open Daily</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
