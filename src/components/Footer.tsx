"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse Motion values for background parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const parallaxX1 = useSpring(useTransform(mouseX, [-600, 600], [-20, 20]), springConfig);
  const parallaxY1 = useSpring(useTransform(mouseY, [-600, 600], [-20, 20]), springConfig);

  const parallaxX2 = useSpring(useTransform(mouseX, [-600, 600], [30, -30]), springConfig);
  const parallaxY2 = useSpring(useTransform(mouseY, [-600, 600], [30, -30]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const quickLinks = [
    { name: "The Experience", href: "#experience" },
    { name: "Game Library", href: "#games" },
    { name: "Gourmet Menu", href: "#food" },
    { name: "Celebrity Visits", href: "#celebrities" },
    { name: "Reviews", href: "#reviews" },
  ];

  // Generate twinkling stars
  const stars = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <footer 
      ref={sectionRef}
      className="text-white border-t border-white/10 pt-20 pb-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a1628 0%, #0d2847 25%, #1a4a7a 50%, #4dafee 80%, #6dc4f5 100%)",
      }}
    >
      
      {/* --- Twinkling Star Particles --- */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.left}%`,
            top: `${star.top}%`,
            background: "white",
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* --- Ambient Glowing Background Blobs --- */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.25, 0.12],
          x: [0, 25, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-[10%] w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(255,107,74,0.1)" }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.0,
        }}
        className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(77,175,238,0.15)" }}
      />

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
      />

      {/* --- Faint Floating Background Elements --- */}
      
      {/* 1. Sparkle Star (Top Left) */}
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] left-[3%] z-0 pointer-events-none opacity-40 select-none hidden lg:block"
      >
        <svg viewBox="0 0 100 100" className="w-8 h-8 fill-[#FF6B4A]/10 stroke-[#FF6B4A]/40 drop-shadow-[0_0_8px_rgba(255,107,74,0.3)]">
          <path d="M50 10 Q50 50 10 50 Q50 50 50 90 Q50 50 90 50 Q50 50 50 10 Z" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* 2. Chess Rook (Bottom Right) */}
      <motion.div
        style={{ x: parallaxX2, y: parallaxY2 }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[30%] right-[3%] z-0 pointer-events-none opacity-30 select-none hidden lg:block"
      >
        <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-white/25 fill-white/5 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">
          <path d="M30 85 h40 v-10 h-5 v-20 h5 v-5 l-10-15 v-10 h-10 v 10 l-10 15 v 5 h5 v 20 h-5 Z" strokeWidth="1.5" />
          <line x1="30" y1="85" x2="70" y2="85" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* 3. Meeple (Top Mid) */}
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        animate={{
          y: [0, 8, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute top-[15%] left-[45%] z-0 pointer-events-none opacity-30 select-none hidden lg:block"
      >
        <svg viewBox="0 0 100 100" className="w-9 h-9 fill-white/5 stroke-white/20 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
          <path d="M50,15 C55.5,15 60,19.5 60,25 C60,30.5 55.5,35 50,35 C44.5,35 40,30.5 40,25 C40,19.5 44.5,15 50,15 Z M35,42 L65,42 C67.8,42 70,44.2 70,47 L70,55 C70,57.8 67.8,60 65,60 L62,60 L62,85 C62,87.8 59.8,90 57,90 L43,90 C40.2,90 38,87.8 38,85 L38,60 L35,60 C32.2,60 30,57.8 30,55 L30,47 C30,44.2 32.2,42 35,42 Z" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* --- Main Content Layout --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10 relative z-10">

        {/* Brand Column */}
        <motion.div 
          className="lg:col-span-4 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a href="#" className="flex items-center gap-2">
            <img src="/assets/Logo.png" alt="Get On Board Logo" className="h-12 w-auto" />
          </a>
          <p className="text-sm text-white/70 leading-relaxed font-light">
            Hyderabad&apos;s premium board gaming lounge and social club. We bring people together over gourmet food, custom mocktails, and a library of 1200+ tabletop titles.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.12 }}
              className="p-3 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] transition-all duration-300 text-white"
            >
              <Instagram size={16} />
            </motion.a>
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.12 }}
              className="p-3 rounded-full bg-white/10 hover:bg-[#1877F2] transition-all duration-300 text-white"
            >
              <Facebook size={16} />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.12 }}
              className="p-3 rounded-full bg-white/10 hover:bg-[#1DA1F2] transition-all duration-300 text-white"
            >
              <Twitter size={16} />
            </motion.a>
          </div>
        </motion.div>

        {/* Navigation Column */}
        <motion.div 
          className="lg:col-span-2 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h4 className="text-xs uppercase tracking-widest font-bold" style={{ color: "#FFB088" }}>
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm font-light text-white/80">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <motion.a 
                  href={link.href}
                  whileHover={{ x: 6, color: "#FF6B4A" }}
                  className="hover:text-[#FF6B4A] transition-colors inline-block duration-200"
                >
                  {link.name}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Location & Timings Column */}
        <motion.div 
          className="lg:col-span-3 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="text-xs uppercase tracking-widest font-bold" style={{ color: "#FFB088" }}>
            Club Info
          </h4>
          <div className="space-y-4 text-xs font-light text-white/80">
            <div>
              <p className="font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#FF6B4A" }}>Address</p>
              <p className="mt-1 leading-relaxed">
                Plot 482, Road No. 36, Jubilee Hills,<br />
                Hyderabad, Telangana - 500033
              </p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#FF6B4A" }}>Club Timings</p>
              <p className="mt-1 leading-relaxed">
                Mon - Thu: 11:00 AM - 11:00 PM <br />
                Fri - Sun: 11:00 AM - 01:00 AM
              </p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#FF6B4A" }}>Contact</p>
              <p className="mt-1">
                <a href="tel:+919123456789" className="hover:text-[#FFB088] transition-colors leading-relaxed block">+91 91234 56789</a>
                <a href="mailto:hello@getonboardcafe.com" className="hover:text-[#FFB088] transition-colors leading-relaxed block mt-0.5">hello@getonboardcafe.com</a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Column */}
        <motion.div 
          className="lg:col-span-3 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-xs uppercase tracking-widest font-bold" style={{ color: "#FFB088" }}>
            Stay Updated
          </h4>
          <p className="text-xs text-white/70 leading-relaxed font-light">
            Subscribe to receive priority booking notifications, game launch announcements, and weekly chef specials.
          </p>

          <form onSubmit={handleSubscribe} className="relative flex items-center pt-1">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/[0.15] backdrop-blur-md focus:border-[#FF6B4A]/60 rounded-lg p-3.5 pr-12 outline-none text-xs text-white transition-colors placeholder:text-white/40"
              required
            />
            <button
              type="submit"
              className="absolute right-2 p-2 text-white rounded-md transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #FF6B4A, #e05a3a)",
                boxShadow: "0 0 15px rgba(255,107,74,0.3)",
              }}
            >
              <ArrowRight size={14} />
            </button>
          </form>

          {subscribed && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold mt-2"
              style={{ color: "#FF6B4A" }}
            >
              Thank you for subscribing!
            </motion.p>
          )}
        </motion.div>

      </div>

      {/* Footer Bottom / Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 space-y-3 md:space-y-0 relative z-10 font-light">
        <div>
          &copy; {new Date().getFullYear()} Get On Board Cafe. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white/80 transition-colors">Jubilee Hills Branch</a>
        </div>
      </div>
    </footer>
  );
}
