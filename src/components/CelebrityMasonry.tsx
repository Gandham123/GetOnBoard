"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function CelebrityMasonry() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Hover states for background animation details
  const [isQueenHovered, setIsQueenHovered] = useState(false);
  const [isStar1Hovered, setIsStar1Hovered] = useState(false);
  const [isStar2Hovered, setIsStar2Hovered] = useState(false);
  const [isDiceHovered, setIsDiceHovered] = useState(false);
  const [isMeepleHovered, setIsMeepleHovered] = useState(false);

  // Mouse Motion values for background parallax effect
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

  const items = [
    {
      id: 1,
      image: "/assets/celebrity_visit.png",
      title: "Tollywood Stars Game Night",
      subtitle: "Actors and Creators enjoying heavy strategy games in our VIP lounge.",
      colSpan: "md:col-span-2",
      height: "h-[350px] md:h-[450px]",
    },
    {
      id: 2,
      image: "/assets/hero_bg.png",
      title: "National Cricket Team Members",
      subtitle: "A tense session of Catan between training matches.",
      colSpan: "md:col-span-1",
      height: "h-[350px] md:h-[450px]",
    },
    {
      id: 3,
      image: "/assets/experience_gm.png",
      title: "Leading Content Creators Meetup",
      subtitle: "Playing Codenames and enjoying mocktails at our flagship event.",
      colSpan: "md:col-span-1",
      height: "h-[300px] md:h-[400px]",
    },
    {
      id: 4,
      image: "/assets/food_drink.png",
      title: "Luxury Lifestyle Influencers",
      subtitle: "Snapping social posts with our premium handcrafted food and drink layouts.",
      colSpan: "md:col-span-2",
      height: "h-[300px] md:h-[400px]",
    },
  ];

  // Generate floating bubble particles
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
        background: "linear-gradient(165deg, #3a9be0 0%, #4dafee 20%, #6dc4f5 45%, #8ad4f8 60%, #6dc4f5 75%, #4dafee 90%, #3a9be0 100%)",
      }}
    >
      
      {/* --- Animated Wave Top Divider --- */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ transform: "rotate(180deg)" }}>
        <svg className="relative block w-full h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1050,65 1150,90 1200,50 L1200,120 L0,120 Z"
            fill="rgba(58,155,224,0.35)"
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
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,${b.opacity + 0.15}), rgba(77,175,238,${b.opacity}))`,
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

      {/* --- Ambient Glowing Background Blobs (adapted to blue theme) --- */}
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
        style={{ background: "rgba(255,107,74,0.12)" }}
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
        style={{ background: "rgba(45,138,208,0.2)" }}
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
      {/* Placed at z-0 with pointer-events-auto so they can be hovered in margins and gaps */}

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
        <svg viewBox="0 0 100 100" className={`w-full h-full fill-white/10 stroke-2 drop-shadow-[0_0_15px_rgba(255,107,74,0.65)] ${isStar1Hovered ? "stroke-[#FFB088]" : "stroke-[#FF6B4A]"}`}>
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
        <svg viewBox="0 0 100 100" className={`w-full h-full fill-white/10 stroke-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] ${isStar2Hovered ? "stroke-white" : "stroke-white/60"}`}>
          <path d="M50 10 Q50 50 10 50 Q50 50 50 90 Q50 50 90 50 Q50 50 50 10 Z" />
        </svg>
      </motion.div>

      {/* 3. VIP Chess Queen (Top Right - behind cards) */}
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
        <svg viewBox="0 0 100 100" className={`w-full h-full stroke-2 fill-white/10 drop-shadow-[0_0_15px_rgba(255,107,74,0.6)] ${isQueenHovered ? "stroke-[#FFB088]" : "stroke-[#FF6B4A]"}`}>
          <path d="M 20 85 h 60 c 0-5-5-10-8-15 c -3-5-2-12-2-18 c 0-8 6-12 4-20 c -2-8-12-10-14-2 c -2-8-12-10-14-2 c -2-8-12-10-14 2 c -2 8 4 12 4 20 c 0 6 1 13-2 18 c -3 5-8 10-8 15 Z" />
          <circle cx="50" cy="18" r="4.5" className={isQueenHovered ? "fill-[#FFB088]" : "fill-[#FF6B4A]"} />
          <circle cx="34" cy="24" r="3.5" className={isQueenHovered ? "fill-[#FFB088]" : "fill-[#FF6B4A]"} />
          <circle cx="66" cy="24" r="3.5" className={isQueenHovered ? "fill-[#FFB088]" : "fill-[#FF6B4A]"} />
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
          {/* Bottom Meeple */}
          <motion.g
            style={{ transformOrigin: "50px 105px" }}
            animate={isMeepleHovered ? { y: [0, -10, 0], scaleY: [1, 0.9, 1.1, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <path d="M50,75 C54,75 57,78 57,82 C57,86 54,89 50,89 C46,89 43,86 43,82 C43,78 46,75 50,75 Z M38,94 L62,94 C64,94 65,95 65,97 L65,102 C65,104 64,105 62,105 L60,105 L60,118 c0,2-1.5,3-3,3 L43,121 c-1.5,0-3-1-3-3 L40,105 L38,105 C36,105 35,104 35,102 L35,97 C35,95 36,94 38,94 Z" />
          </motion.g>

          {/* Middle Meeple */}
          <motion.g
            style={{ transformOrigin: "50px 75px" }}
            animate={isMeepleHovered ? { y: [0, -20, 0], scaleY: [1, 0.9, 1.1, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <path d="M50,45 C54,45 57,48 57,52 C57,56 54,59 50,59 C46,59 43,56 43,52 C43,48 46,45 50,45 Z M38,64 L62,64 C64,64 65,65 65,67 L65,72 C65,74 64,75 62,75 L60,75 L60,88 c0,2-1.5,3-3,3 L43,91 c-1.5,0-3-1-3-3 L40,75 L38,75 C36,75 35,74 35,72 L35,67 C35,65 36,64 38,64 Z" />
          </motion.g>

          {/* Top Meeple */}
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
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.25em] font-bold mb-3"
            style={{ color: "#FFB088" }}
          >
            A Celebrity Hangout
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Loved By Celebrities
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[2px] mx-auto mt-5 rounded-full"
            style={{ background: "linear-gradient(to right, #FF6B4A, #4dafee, #2d8ad0)" }}
          />
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.15] hover:border-[#FF6B4A]/50 hover:shadow-[0_0_45px_rgba(255,107,74,0.25),0_0_80px_rgba(77,175,238,0.15)] transition-all duration-500 ${item.colSpan} ${item.height}`}
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Tint Overlay — soft blue tint */}
              <div 
                className="absolute inset-0 opacity-85 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(45,110,190,0.9) 5%, rgba(77,175,238,0.35) 50%, transparent)" }}
              />
              
              {/* Animated shine on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 50%, transparent 65%)",
                }}
              />

              {/* Text / Glass Card Overlay */}
              <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end">
                <div className="bg-white/[0.06] backdrop-blur-md p-6 rounded-xl border border-white/[0.12] transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 shadow-xl group-hover:border-[#FF6B4A]/30 group-hover:bg-white/[0.1]">
                  <span className="text-[10px] uppercase tracking-widest font-bold block mb-1" style={{ color: "#FF6B4A" }}>
                    Visited Get On Board
                  </span>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-white mb-2 group-hover:text-[#FFB088] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Animated Wave Bottom Divider --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z"
            fill="rgba(58,155,224,0.35)"
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
