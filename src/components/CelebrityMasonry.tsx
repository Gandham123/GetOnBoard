"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Image dimension metadata parsed directly from original files to prevent Layout Shifts (CLS)
const celebrityImages = [
  { id: 1, width: 1202, height: 1308, alt: "Tollywood Star Game Night" },
  { id: 2, width: 1399, height: 1124, alt: "National Cricket Team Members" },
  { id: 3, width: 824, height: 1909, alt: "Leading Content Creators Meetup" },
  { id: 4, width: 1323, height: 1189, alt: "Luxury Lifestyle Influencers" },
  { id: 5, width: 861, height: 1827, alt: "Actors & Film Personalities Gathering" },
  { id: 6, width: 941, height: 1672, alt: "South Cinema Directors Night" },
  { id: 7, width: 1663, height: 946, alt: "Pro Athletes Gaming Session" },
  { id: 8, width: 934, height: 1684, alt: "Music Artists & Composers Lounge" },
  { id: 9, width: 941, height: 1672, alt: "Top Tech Founders Boardgame Meetup" },
  { id: 10, width: 1195, height: 1316, alt: "Fashion Designers Social Night" },
  { id: 11, width: 1284, height: 1225, alt: "Popular Stand-up Comedians Night" },
  { id: 12, width: 1624, height: 969, alt: "Gourmet Chefs & Vloggers Special Table" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 16,
    },
  },
};

export default function CelebrityMasonry() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // States for Lightbox modal
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Hover states for background animation details (retained to match existing design)
  const [isQueenHovered, setIsQueenHovered] = useState(false);
  const [isStar1Hovered, setIsStar1Hovered] = useState(false);
  const [isStar2Hovered, setIsStar2Hovered] = useState(false);
  const [isDiceHovered, setIsDiceHovered] = useState(false);
  const [isMeepleHovered, setIsMeepleHovered] = useState(false);

  // Mouse Motion values for background parallax effect (retained to match existing design)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const parallaxX1 = useSpring(useTransform(mouseX, [-600, 600], [-35, 35]), springConfig);
  const parallaxY1 = useSpring(useTransform(mouseY, [-600, 600], [-35, 35]), springConfig);

  const parallaxX2 = useSpring(useTransform(mouseX, [-600, 600], [50, -50]), springConfig);
  const parallaxY2 = useSpring(useTransform(mouseY, [-600, 600], [50, -50]), springConfig);

  const parallaxX3 = useSpring(useTransform(mouseX, [-600, 600], [-20, 20]), springConfig);
  const parallaxY3 = useSpring(useTransform(mouseY, [-600, 600], [20, -20]), springConfig);

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

  // Keyboard accessibility listeners for Lightbox modal
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, selectedImageIndex]);

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? celebrityImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === celebrityImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Generate floating bubble particles (retained to match existing design)
  const bubbles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 14 + 4,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: Math.random() * 10 + 12,
    opacity: Math.random() * 0.15 + 0.05,
  }));

  return (
    <section
      id="celebrities"
      ref={sectionRef}
      className="py-24 text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(165deg, #1565C0 0%, #1E88E5 20%, #4ba3e8 45%, #6bb8f0 60%, #4ba3e8 75%, #1E88E5 90%, #1565C0 100%)",
      }}
    >
      {/* --- Animated Wave Top Divider --- */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ transform: "rotate(180deg)" }}>
        <svg className="relative block w-full h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1050,65 1150,90 1200,50 L1200,120 L0,120 Z"
            fill="rgba(21,101,192,0.35)"
            animate={{
              d: [
                "M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1050,65 1150,90 1200,50 L1200,120 L0,120 Z",
                "M0,70 C200,20 300,80 500,40 C700,0 800,90 1000,60 C1100,40 1150,20 1200,70 L1200,120 L0,120 Z",
                "M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1050,65 1150,90 1200,50 L1200,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* --- Floating Bubble Particles --- */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: "-5%",
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,${b.opacity + 0.15}), rgba(21,101,192,${b.opacity}))`,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          animate={{
            y: [0, -800 - Math.random() * 400],
            x: [0, Math.sin(b.id) * 60],
            opacity: [0, b.opacity + 0.1, b.opacity, 0],
            scale: [0.5, 1, 1.1, 0.8],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* --- Ambient Glowing Background Blobs --- */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-[5%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(245,124,0,0.12)" }}
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
        className="absolute bottom-1/4 left-[5%] w-[380px] h-[380px] rounded-full blur-[110px] pointer-events-none"
        style={{ background: "rgba(21,101,192,0.2)" }}
      />

      {/* Shimmer sweep overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
      />

      {/* --- Floating Glamour & Game Background Components --- */}
      {/* 1. Glowing Glamour Star 1 (Top Left) */}
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        onMouseEnter={() => setIsStar1Hovered(true)}
        onMouseLeave={() => setIsStar1Hovered(false)}
        animate={{
          rotate: isStar1Hovered ? [0, 180, 360] : [0, 12, -12, 0],
          scale: isStar1Hovered ? 1.3 : [1, 1.05, 1],
        }}
        transition={{
          duration: isStar1Hovered ? 1.5 : 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[18%] left-[4%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-14 h-14 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 100 100" className={`w-full h-full fill-white/10 stroke-2 drop-shadow-[0_0_15px_rgba(245,124,0,0.65)] ${isStar1Hovered ? "stroke-[#FF9800]" : "stroke-[#F57C00]"}`}>
          <path d="M50 10 Q50 50 10 50 Q50 50 50 90 Q50 50 90 50 Q50 50 50 10 Z" />
        </svg>
      </motion.div>

      {/* 2. Glowing Glamour Star 2 (Bottom Right) */}
      <motion.div
        style={{ x: parallaxX3, y: parallaxY3 }}
        onMouseEnter={() => setIsStar2Hovered(true)}
        onMouseLeave={() => setIsStar2Hovered(false)}
        animate={{
          rotate: isStar2Hovered ? [0, -180, -360] : [0, -15, 15, 0],
          scale: isStar2Hovered ? 1.3 : [0.95, 1, 0.95],
        }}
        transition={{
          duration: isStar2Hovered ? 1.5 : 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-[22%] right-[5%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-12 h-12 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 100 100" className={`w-full h-full fill-white/10 stroke-2 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] ${isStar2Hovered ? "stroke-white" : "stroke-white/60"}`}>
          <path d="M50 10 Q50 50 10 50 Q50 50 50 90 Q50 50 90 50 Q50 50 50 10 Z" />
        </svg>
      </motion.div>

      {/* 3. VIP Chess Queen (Top Right) */}
      <motion.div
        style={{ x: parallaxX2, y: parallaxY2 }}
        onMouseEnter={() => setIsQueenHovered(true)}
        onMouseLeave={() => setIsQueenHovered(false)}
        animate={{
          y: [0, -10, 0],
          rotate: isQueenHovered ? 15 : 0,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.25 }}
        className="absolute top-[15%] right-[6%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-20 h-24 opacity-80 hover:opacity-100 transition-all duration-300"
      >
        <svg viewBox="0 0 100 100" className={`w-full h-full stroke-2 fill-white/10 drop-shadow-[0_0_15px_rgba(245,124,0,0.6)] ${isQueenHovered ? "stroke-[#FF9800]" : "stroke-[#F57C00]"}`}>
          <path d="M 20 85 h 60 c 0-5-5-10-8-15 c -3-5-2-12-2-18 c 0-8 6-12 4-20 c -2-8-12-10-14-2 c -2-8-12-10-14-2 c -2-8-12-10-14 2 c -2 8 4 12 4 20 c 0 6 1 13-2 18 c -3 5-8 10-8 15 Z" />
          <circle cx="50" cy="18" r="4.5" className={isQueenHovered ? "fill-[#FF9800]" : "fill-[#F57C00]"} />
          <circle cx="34" cy="24" r="3.5" className={isQueenHovered ? "fill-[#FF9800]" : "fill-[#F57C00]"} />
          <circle cx="66" cy="24" r="3.5" className={isQueenHovered ? "fill-[#FF9800]" : "fill-[#F57C00]"} />
        </svg>
      </motion.div>

      {/* 4. Golden Dice (Bottom Left) */}
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        onMouseEnter={() => setIsDiceHovered(true)}
        onMouseLeave={() => setIsDiceHovered(false)}
        animate={{
          y: [0, -12, 0],
          rotate: isDiceHovered ? [0, 180, 360] : [0, 45, 0],
        }}
        transition={{
          duration: isDiceHovered ? 1.5 : 9,
          repeat: isDiceHovered ? 1 : Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.25 }}
        className="absolute bottom-[16%] left-[6%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-16 h-16 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-white/70 fill-white/5 stroke-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          <polygon points="50,15 85,35 50,55 15,35" />
          <polygon points="15,35 50,55 50,90 15,70" />
          <polygon points="50,55 85,35 85,70 50,90" />
          <circle cx="50" cy="35" r="3" className="fill-white/80" />
          <circle cx="32" cy="52" r="2.5" className="fill-white/60" />
          <circle cx="68" cy="52" r="2.5" className="fill-white/60" />
        </svg>
      </motion.div>

      {/* 5. Colorful Meeples Stack (Middle Left) */}
      <motion.div
        style={{ x: parallaxX3, y: parallaxY3 }}
        onMouseEnter={() => setIsMeepleHovered(true)}
        onMouseLeave={() => setIsMeepleHovered(false)}
        whileHover={{ scale: 1.15 }}
        className="absolute top-[48%] left-[4%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-20 h-28 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 100 120" className="w-full h-full fill-white/10 stroke-white/50 stroke-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <motion.g
            style={{ transformOrigin: "50px 105px" }}
            animate={isMeepleHovered ? { y: [0, -10, 0], scaleY: [1, 0.9, 1.1, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <path d="M50,75 C54,75 57,78 57,82 C57,86 54,89 50,89 C46,89 43,86 43,82 C43,78 46,75 50,75 Z M38,94 L62,94 C64,94 65,95 65,97 L65,102 C65,104 64,105 62,105 L60,105 L60,118 c0,2-1.5,3-3,3 L43,121 c-1.5,0-3-1-3-3 L40,105 L38,105 C36,105 35,104 35,102 L35,97 C35,95 36,94 38,94 Z" />
          </motion.g>
          <motion.g
            style={{ transformOrigin: "50px 75px" }}
            animate={isMeepleHovered ? { y: [0, -20, 0], scaleY: [1, 0.9, 1.1, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <path d="M50,45 C54,45 57,48 57,52 C57,56 54,59 50,59 C46,59 43,56 43,52 C43,48 46,45 50,45 Z M38,64 L62,64 C64,64 65,65 65,67 L65,72 C65,74 64,75 62,75 L60,75 L60,88 c0,2-1.5,3-3,3 L43,91 c-1.5,0-3-1-3-3 L40,75 L38,75 C36,75 35,74 35,72 L35,67 C35,65 36,64 38,64 Z" />
          </motion.g>
          <motion.g
            style={{ transformOrigin: "50px 45px" }}
            animate={isMeepleHovered ? { y: [0, -30, 0], scaleY: [1, 0.8, 1.2, 1] } : {}}
            transition={{ duration: 0.6 }}
          >
            <path d="M50,15 C54,15 57,18 57,22 C57,26 54,29 50,29 C46,29 43,26 43,22 C43,18 46,15 50,15 Z M38,34 L62,34 C64,34 65,35 65,37 L65,42 C65,44 64,45 62,45 L60,45 L60,58 c0,2-1.5,3-3,3 L43,61 c-1.5,0-3-1-3-3 L40,45 L38,45 C36,45 35,44 35,42 L35,37 C35,35 36,34 38,34 Z" />
          </motion.g>
        </svg>
      </motion.div>

      {/* --- Main Grid Content Container --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h4
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.25em] font-bold mb-3"
            style={{ color: "#FF9800" }}
          >
            A Celebrity Hangout
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white animate-fade-in"
          >
            Loved By Celebrities
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[2px] mx-auto mt-5 rounded-full"
            style={{ background: "linear-gradient(to right, #F57C00, #1E88E5, #1565C0)" }}
          />

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {[
              { text: "⭐ 15+ Celebrity Visits" },
              { text: "🎬 Film Personalities" },
              { text: "🎲 Shared Game Nights" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-xl px-5 py-2.5 text-xs font-semibold tracking-wide text-white/90 shadow-md flex items-center justify-center gap-2 hover:bg-white/[0.12] transition-colors"
              >
                {stat.text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Masonry / Pinterest Wall of Fame Gallery */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          {celebrityImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                setSelectedImageIndex(index);
                setIsLightboxOpen(true);
              }}
              className="break-inside-avoid relative rounded-2xl overflow-hidden border border-white/15 shadow-lg hover:shadow-2xl hover:shadow-[#FF9800]/15 hover:border-[#FF9800]/50 transition-all duration-300 group cursor-pointer bg-white/5 mb-6"
            >
              <Image
                src={`/assets/c${image.id}.png`}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Minimal Dark Gradient Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#FF9800] flex items-center gap-1">
                  ⭐ Celebrity Visit
                </span>
                <span className="text-xs font-semibold text-white/95 mt-0.5">
                  {image.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Previous Image Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-6 z-40 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
              aria-label="Previous Image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Image Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-6 z-40 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
              aria-label="Next Image"
            >
              <ChevronRight size={28} />
            </button>

            {/* Slide Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            >
              <div className="relative w-auto h-auto max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/40">
                <Image
                  src={`/assets/c${celebrityImages[selectedImageIndex].id}.png`}
                  alt={celebrityImages[selectedImageIndex].alt}
                  width={celebrityImages[selectedImageIndex].width}
                  height={celebrityImages[selectedImageIndex].height}
                  className="max-w-full max-h-[72vh] object-contain rounded-2xl"
                  sizes="80vw"
                  priority
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-xs font-semibold tracking-widest text-[#FF9800] uppercase">
                  ⭐ Visited Get On Board Cafe
                </p>
                <h3 className="font-serif text-lg font-bold text-white mt-1">
                  {celebrityImages[selectedImageIndex].alt}
                </h3>
                <p className="text-[10px] text-white/55 tracking-wider mt-0.5">
                  Image {selectedImageIndex + 1} of {celebrityImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Animated Wave Bottom Divider --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z"
            fill="rgba(21,101,192,0.35)"
            animate={{
              d: [
                "M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z",
                "M0,40 C150,90 350,10 600,70 C850,10 950,80 1200,40 L1200,120 L0,120 Z",
                "M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
}
