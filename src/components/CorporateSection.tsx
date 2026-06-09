"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Briefcase, Trophy, Users, Sparkles } from "lucide-react";

interface CorporateSectionProps {
  onOpenBooking: () => void;
}

const eventAccents = [
  {
    color: "#FF6B4A", // Coral
    badge: "bg-[#FF6B4A]/10 text-[#FFB088] border-[#FF6B4A]/20",
    glow: "shadow-[0_0_30px_rgba(255,107,74,0.2)]",
    text: "group-hover:text-[#FFB088]",
    hoverBorder: "hover:border-[#FF6B4A]/40",
    iconBg: "group-hover:bg-[#FF6B4A]/20",
    iconColor: "text-[#FF6B4A]",
  },
  {
    color: "#4dafee", // Sky Blue
    badge: "bg-[#4dafee]/10 text-[#8fd0ff] border-[#4dafee]/20",
    glow: "shadow-[0_0_30px_rgba(77,175,238,0.2)]",
    text: "group-hover:text-[#8fd0ff]",
    hoverBorder: "hover:border-[#4dafee]/40",
    iconBg: "group-hover:bg-[#4dafee]/20",
    iconColor: "text-[#4dafee]",
  },
  {
    color: "#FFB088", // Warm Peach
    badge: "bg-[#FFB088]/10 text-[#FFB088] border-[#FFB088]/20",
    glow: "shadow-[0_0_30px_rgba(255,176,136,0.2)]",
    text: "group-hover:text-[#FFB088]",
    hoverBorder: "hover:border-[#FFB088]/40",
    iconBg: "group-hover:bg-[#FFB088]/20",
    iconColor: "text-[#FFB088]",
  },
  {
    color: "#ffffff", // White
    badge: "bg-white/10 text-white border-white/20",
    glow: "shadow-[0_0_30px_rgba(255,255,255,0.12)]",
    text: "group-hover:text-white",
    hoverBorder: "hover:border-white/30",
    iconBg: "group-hover:bg-white/15",
    iconColor: "text-white/80",
  },
];

export default function CorporateSection({ onOpenBooking }: CorporateSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Hover states for background animations
  const [isTrophyHovered, setIsTrophyHovered] = useState(false);
  const [isPuzzleHovered, setIsPuzzleHovered] = useState(false);
  const [isNetworkHovered, setIsNetworkHovered] = useState(false);
  const [isMeepleHovered, setIsMeepleHovered] = useState(false);
  const [isDiceHovered, setIsDiceHovered] = useState(false);
  const [isHourglassHovered, setIsHourglassHovered] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isChessHovered, setIsChessHovered] = useState(false);
  const [isSpinnerHovered, setIsSpinnerHovered] = useState(false);

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

  const parallaxX4 = useSpring(useTransform(mouseX, [-600, 600], [25, -25]), springConfig);
  const parallaxY4 = useSpring(useTransform(mouseY, [-600, 600], [-25, 25]), springConfig);

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

  const events = [
    {
      icon: <Briefcase className="w-6 h-6 text-inherit" />,
      title: "Corporate Team Building",
      desc: "Improve communication and foster strategic thinking with game sessions managed by our hosts.",
    },
    {
      icon: <Trophy className="w-6 h-6 text-inherit" />,
      title: "Employee Engagement",
      desc: "Reward your teams with fun, collaborative play and premium food and drink pairings.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-inherit" />,
      title: "Private Events & Reunions",
      desc: "Reserve our entire lounge or VIP rooms for birthdays, reunions, and custom milestones.",
    },
    {
      icon: <Users className="w-6 h-6 text-inherit" />,
      title: "Creative Workshops",
      desc: "A beautiful space for design sprints, board game design, or corporate workshops.",
    },
  ];

  // Generate floating geometric shapes
  const geoShapes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 8,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: Math.random() * 15 + 15,
    rotation: Math.random() * 360,
    type: i % 3, // 0=circle, 1=diamond, 2=hexagon
  }));

  return (
    <section
      id="events"
      ref={sectionRef}
      className="py-24 text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(175deg, #3a9be0 0%, #4dafee 18%, #6dc4f5 35%, #8ad4f8 50%, #6dc4f5 65%, #4dafee 82%, #3a9be0 100%)",
      }}
    >

      {/* --- Floating Geometric Shape Particles --- */}
      {geoShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute pointer-events-none"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.left}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.cos(shape.id) * 40, 0],
            rotate: [shape.rotation, shape.rotation + 360],
            opacity: [0.04, 0.12, 0.04],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        >
          {shape.type === 0 && (
            <div className="w-full h-full rounded-full border border-white/25" />
          )}
          {shape.type === 1 && (
            <div className="w-full h-full border border-[#FF6B4A]/30 rotate-45" />
          )}
          {shape.type === 2 && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            </svg>
          )}
        </motion.div>
      ))}

      {/* --- Ambient Glowing Background Blobs --- */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -35, 0],
          y: [0, 35, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-[5%] w-[420px] h-[420px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: "rgba(255,107,74,0.1)" }}
      />
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.12, 0.25, 0.12],
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.0,
        }}
        className="absolute bottom-1/4 right-[5%] w-[380px] h-[380px] rounded-full blur-[110px] pointer-events-none"
        style={{ background: "rgba(45,138,208,0.2)" }}
      />

      {/* Shimmer sweep overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
      />

      {/* ====================================================================== */}
      {/* --- Interactive Board Game Background Animations (9 total) --- */}
      {/* ====================================================================== */}

      {/* 1. Interlocking Team Puzzle Pieces (Top Right) */}
      <motion.div
        style={{ x: parallaxX2, y: parallaxY2 }}
        onMouseEnter={() => setIsPuzzleHovered(true)}
        onMouseLeave={() => setIsPuzzleHovered(false)}
        whileHover={{ scale: 1.15 }}
        className="absolute top-[12%] right-[8%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-32 h-28 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 120 100" className="w-full h-full fill-white/5 stroke-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {/* Piece 1 (Left) */}
          <motion.path
            d="M 15 25 L 35 25 A 5 5 0 0 1 40 30 L 40 40 A 5 5 0 0 0 45 45 L 55 45 A 5 5 0 0 0 55 55 L 45 55 A 5 5 0 0 0 40 60 L 40 70 L 15 70 Z"
            animate={isPuzzleHovered ? { x: 10 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            strokeWidth="2.5"
          />
          {/* Piece 2 (Right) */}
          <motion.path
            d="M 65 25 L 85 25 L 85 70 L 65 70 A 5 5 0 0 0 60 65 L 60 55 A 5 5 0 0 1 55 50 L 45 50 A 5 5 0 0 1 55 40 L 60 40 A 5 5 0 0 0 65 35 Z"
            animate={isPuzzleHovered ? { x: -10 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            strokeWidth="2.5"
            className={isPuzzleHovered ? "stroke-[#FF6B4A]" : "stroke-white/50"}
          />
        </svg>
      </motion.div>

      {/* 2. Corporate Champion Trophy (Bottom Left) */}
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        onMouseEnter={() => setIsTrophyHovered(true)}
        onMouseLeave={() => setIsTrophyHovered(false)}
        animate={{
          y: [0, -10, 0],
          rotate: isTrophyHovered ? [0, -6, 6, 0] : 0,
        }}
        transition={{
          duration: isTrophyHovered ? 0.6 : 8,
          repeat: isTrophyHovered ? 1 : Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.25 }}
        className="absolute bottom-[16%] left-[6%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-20 h-20 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 100 100" className={`w-full h-full fill-[#FF6B4A]/10 drop-shadow-[0_0_15px_rgba(255,107,74,0.5)] ${isTrophyHovered ? "stroke-[#FFB088]" : "stroke-[#FF6B4A]"}`}>
          <path d="M 25 20 L 75 20 Q 75 50, 50 65 Q 25 50, 25 20 Z" strokeWidth="2.5" />
          <path d="M 25 25 L 15 25 Q 10 25, 10 35 Q 10 45, 15 45 L 25 45" strokeWidth="2" fill="none" />
          <path d="M 75 25 L 85 25 Q 90 25, 90 35 Q 90 45, 85 45 L 75 45" strokeWidth="2" fill="none" />
          <path d="M 50 65 L 50 80 M 35 80 L 65 80 L 65 85 L 35 85 Z" strokeWidth="2.5" />
          <path d="M 50 28 Q 50 38, 40 38 Q 50 38, 50 48 Q 50 38, 60 38 Q 50 38, 50 28 Z" className="fill-[#FF6B4A] stroke-none" />
        </svg>
      </motion.div>

      {/* 3. Collaboration Network Graph (Middle Left) */}
      <motion.div
        style={{ x: parallaxX3, y: parallaxY3 }}
        onMouseEnter={() => setIsNetworkHovered(true)}
        onMouseLeave={() => setIsNetworkHovered(false)}
        whileHover={{ scale: 1.2 }}
        className="absolute top-[35%] left-[5%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-24 h-24 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 120 100" className="w-full h-full fill-none drop-shadow-[0_0_15px_rgba(77,175,238,0.5)]">
          <line x1="20" y1="20" x2="60" y2="50" strokeWidth="1.5" className={isNetworkHovered ? "stroke-white" : "stroke-white/20"} />
          <line x1="60" y1="50" x2="100" y2="20" strokeWidth="1.5" className={isNetworkHovered ? "stroke-white" : "stroke-white/20"} />
          <line x1="20" y1="80" x2="60" y2="50" strokeWidth="1.5" className={isNetworkHovered ? "stroke-white" : "stroke-white/20"} />
          <line x1="60" y1="50" x2="100" y2="80" strokeWidth="1.5" className={isNetworkHovered ? "stroke-white" : "stroke-white/20"} />
          <line x1="20" y1="20" x2="20" y2="80" strokeWidth="1.5" className={isNetworkHovered ? "stroke-white" : "stroke-white/20"} />
          <line x1="100" y1="20" x2="100" y2="80" strokeWidth="1.5" className={isNetworkHovered ? "stroke-white" : "stroke-white/20"} />

          <circle cx="20" cy="20" r="5" className={isNetworkHovered ? "fill-white" : "fill-white/30"} />
          <circle cx="100" cy="20" r="5" className={isNetworkHovered ? "fill-white" : "fill-white/30"} />
          <circle cx="20" cy="80" r="5" className={isNetworkHovered ? "fill-white" : "fill-white/30"} />
          <circle cx="100" cy="80" r="5" className={isNetworkHovered ? "fill-white" : "fill-white/30"} />

          <circle cx="60" cy="50" r="8" className={isNetworkHovered ? "fill-[#FF6B4A] stroke-[#FFB088]" : "fill-white/40"} strokeWidth="2.5" />
        </svg>
      </motion.div>

      {/* 4. Leadership Meeple (Bottom Right) */}
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        onMouseEnter={() => setIsMeepleHovered(true)}
        onMouseLeave={() => setIsMeepleHovered(false)}
        whileHover={{ scale: 1.15 }}
        className="absolute bottom-[18%] right-[10%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-20 h-24 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 100 120" className="w-full h-full fill-white/10 stroke-white/50 stroke-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <polygon points="40,25 45,15 50,22 55,15 60,25" className="fill-[#FF6B4A] stroke-none" />
          <motion.g
            style={{ transformOrigin: "50px 100px" }}
            animate={isMeepleHovered ? { y: [0, -15, 0], scaleY: [1, 0.8, 1.2, 1] } : {}}
            transition={{ duration: 0.6 }}
          >
            <path d="M50,25 C55.5,25 60,29.5 60,35 C60,40.5 55.5,45 50,45 C44.5,45 40,40.5 40,35 C40,29.5 44.5,25 50,25 Z M35,52 L65,52 C67.8,52 70,54.2 70,57 L70,65 C70,67.8 67.8,70 65,70 L62,70 L62,95 C62,97.8 59.8,100 57,100 L43,100 C40.2,100 38,97.8 38,95 L38,70 L35,70 C32.2,70 30,67.8 30,65 L30,57 C30,54.2 32.2,52 35,52 Z" />
          </motion.g>
        </svg>
      </motion.div>

      {/* 5. Rolling 3D Dice (Top Left) */}
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        onMouseEnter={() => setIsDiceHovered(true)}
        onMouseLeave={() => setIsDiceHovered(false)}
        animate={{
          y: [0, -8, 0],
          rotate: isDiceHovered ? [0, 360] : [0, 20, -20, 0],
        }}
        transition={{
          duration: isDiceHovered ? 1.2 : 10,
          repeat: isDiceHovered ? 1 : Infinity,
          ease: isDiceHovered ? "easeOut" : "easeInOut",
        }}
        whileHover={{ scale: 1.3 }}
        className="absolute top-[10%] left-[8%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-18 h-18 opacity-80 hover:opacity-100 transition-all duration-300"
        style={{ width: 72, height: 72 }}
      >
        <svg viewBox="0 0 100 100" className={`w-full h-full stroke-2 drop-shadow-[0_0_18px_rgba(255,255,255,0.4)] ${isDiceHovered ? "stroke-[#FF6B4A]" : "stroke-white/60"}`}>
          {/* Isometric dice */}
          <polygon points="50,12 88,32 50,52 12,32" fill={isDiceHovered ? "rgba(255,107,74,0.15)" : "rgba(255,255,255,0.08)"} />
          <polygon points="12,32 50,52 50,90 12,70" fill={isDiceHovered ? "rgba(255,107,74,0.1)" : "rgba(255,255,255,0.05)"} />
          <polygon points="50,52 88,32 88,70 50,90" fill={isDiceHovered ? "rgba(255,107,74,0.08)" : "rgba(255,255,255,0.03)"} />
          {/* Dots on top face */}
          <circle cx="38" cy="30" r="2.5" className={isDiceHovered ? "fill-[#FF6B4A]" : "fill-white/50"} />
          <circle cx="50" cy="25" r="2.5" className={isDiceHovered ? "fill-[#FF6B4A]" : "fill-white/50"} />
          <circle cx="62" cy="30" r="2.5" className={isDiceHovered ? "fill-[#FF6B4A]" : "fill-white/50"} />
          <circle cx="50" cy="38" r="2.5" className={isDiceHovered ? "fill-[#FF6B4A]" : "fill-white/50"} />
          {/* Dots on left face */}
          <circle cx="28" cy="48" r="2" className={isDiceHovered ? "fill-[#FFB088]/60" : "fill-white/30"} />
          <circle cx="35" cy="58" r="2" className={isDiceHovered ? "fill-[#FFB088]/60" : "fill-white/30"} />
        </svg>
      </motion.div>

      {/* 6. Sand Timer / Hourglass (Right side, middle-low) */}
      <motion.div
        style={{ x: parallaxX4, y: parallaxY4 }}
        onMouseEnter={() => setIsHourglassHovered(true)}
        onMouseLeave={() => setIsHourglassHovered(false)}
        animate={{
          rotate: isHourglassHovered ? [0, 180] : [0, 5, -5, 0],
        }}
        transition={{
          duration: isHourglassHovered ? 1.5 : 8,
          repeat: isHourglassHovered ? 0 : Infinity,
          ease: isHourglassHovered ? "easeInOut" : "easeInOut",
        }}
        whileHover={{ scale: 1.2 }}
        className="absolute top-[55%] right-[4%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none opacity-80 hover:opacity-100 transition-all duration-300"
        style={{ width: 56, height: 72 }}
      >
        <svg viewBox="0 0 60 80" className={`w-full h-full stroke-2 drop-shadow-[0_0_15px_rgba(255,176,136,0.5)] ${isHourglassHovered ? "stroke-[#FFB088]" : "stroke-white/55"}`}>
          {/* Top frame */}
          <line x1="10" y1="8" x2="50" y2="8" strokeWidth="3" />
          {/* Bottom frame */}
          <line x1="10" y1="72" x2="50" y2="72" strokeWidth="3" />
          {/* Glass body */}
          <path d="M14,8 L14,28 Q14,40 30,40 Q46,40 46,28 L46,8" fill={isHourglassHovered ? "rgba(255,176,136,0.1)" : "rgba(255,255,255,0.05)"} />
          <path d="M14,72 L14,52 Q14,40 30,40 Q46,40 46,52 L46,72" fill={isHourglassHovered ? "rgba(255,176,136,0.1)" : "rgba(255,255,255,0.05)"} />
          {/* Sand in top */}
          <motion.path
            d="M20,14 L40,14 L30,32 Z"
            className={isHourglassHovered ? "fill-[#FF6B4A]/40" : "fill-white/20"}
            animate={isHourglassHovered ? { opacity: [1, 0.3] } : {}}
            transition={{ duration: 1.5 }}
          />
          {/* Sand in bottom */}
          <motion.path
            d="M20,66 L40,66 L30,48 Z"
            className={isHourglassHovered ? "fill-[#FF6B4A]/50" : "fill-white/15"}
            animate={isHourglassHovered ? { opacity: [0.3, 1] } : {}}
            transition={{ duration: 1.5 }}
          />
          {/* Falling sand stream */}
          <motion.line
            x1="30" y1="32" x2="30" y2="48"
            strokeWidth="1.5"
            className={isHourglassHovered ? "stroke-[#FF6B4A]/70" : "stroke-white/20"}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      {/* 7. Playing Card Hand (Left side, lower) */}
      <motion.div
        style={{ x: parallaxX3, y: parallaxY3 }}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
        whileHover={{ scale: 1.15 }}
        className="absolute bottom-[30%] left-[3%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none opacity-80 hover:opacity-100 transition-all duration-300"
        style={{ width: 80, height: 64 }}
      >
        <svg viewBox="0 0 120 90" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {/* Card 1 (back, left-tilted) */}
          <motion.g
            animate={isCardHovered ? { rotate: -25, x: -8 } : { rotate: -15 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            style={{ transformOrigin: "60px 75px" }}
          >
            <rect x="30" y="10" width="35" height="55" rx="4" fill={isCardHovered ? "rgba(255,107,74,0.12)" : "rgba(255,255,255,0.06)"} stroke={isCardHovered ? "#FF6B4A" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" />
            <text x="36" y="30" fontSize="14" fill={isCardHovered ? "#FF6B4A" : "rgba(255,255,255,0.5)"} fontWeight="bold">♠</text>
          </motion.g>
          {/* Card 2 (middle) */}
          <motion.g
            animate={isCardHovered ? { y: -5 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <rect x="42" y="8" width="35" height="55" rx="4" fill={isCardHovered ? "rgba(255,176,136,0.12)" : "rgba(255,255,255,0.08)"} stroke={isCardHovered ? "#FFB088" : "rgba(255,255,255,0.35)"} strokeWidth="1.5" />
            <text x="48" y="28" fontSize="14" fill={isCardHovered ? "#FFB088" : "rgba(255,255,255,0.6)"} fontWeight="bold">♥</text>
          </motion.g>
          {/* Card 3 (front, right-tilted) */}
          <motion.g
            animate={isCardHovered ? { rotate: 25, x: 8 } : { rotate: 15 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            style={{ transformOrigin: "60px 75px" }}
          >
            <rect x="54" y="10" width="35" height="55" rx="4" fill={isCardHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"} stroke={isCardHovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" />
            <text x="60" y="30" fontSize="14" fill={isCardHovered ? "white" : "rgba(255,255,255,0.5)"} fontWeight="bold">♦</text>
          </motion.g>
        </svg>
      </motion.div>

      {/* 8. Chess Board Pattern (Top center-right) */}
      <motion.div
        style={{ x: parallaxX4, y: parallaxY4 }}
        onMouseEnter={() => setIsChessHovered(true)}
        onMouseLeave={() => setIsChessHovered(false)}
        whileHover={{ scale: 1.12 }}
        animate={{
          rotate: isChessHovered ? [0, 5, -5, 0] : [0, 2, -2, 0],
        }}
        transition={{
          duration: isChessHovered ? 0.8 : 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[8%] right-[30%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none opacity-70 hover:opacity-100 transition-all duration-300"
        style={{ width: 72, height: 72 }}
      >
        <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
          {/* 4x4 mini chess board */}
          {[0,1,2,3].map(row =>
            [0,1,2,3].map(col => (
              <motion.rect
                key={`${row}-${col}`}
                x={col * 18 + 2}
                y={row * 18 + 2}
                width="16"
                height="16"
                rx="1"
                fill={(row + col) % 2 === 0
                  ? (isChessHovered ? "rgba(255,107,74,0.2)" : "rgba(255,255,255,0.12)")
                  : "rgba(255,255,255,0.03)"}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.5"
                animate={isChessHovered ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.4, delay: (row + col) * 0.05 }}
              />
            ))
          )}
          {/* Chess piece silhouette - Knight */}
          <motion.path
            d="M35,62 L35,55 Q35,48 40,45 L38,40 Q35,38 38,34 Q42,30 45,32 Q48,28 48,24 Q50,20 55,22 Q52,28 50,32 L52,35 Q55,35 55,40 L52,45 Q56,48 56,55 L56,62 Z"
            fill={isChessHovered ? "rgba(255,107,74,0.5)" : "rgba(255,255,255,0.25)"}
            stroke={isChessHovered ? "#FF6B4A" : "rgba(255,255,255,0.4)"}
            strokeWidth="1"
            animate={isChessHovered ? { y: [0, -3, 0] } : {}}
            transition={{ duration: 0.5 }}
          />
        </svg>
      </motion.div>

      {/* 9. Spinning Prize Wheel (Bottom center-left) */}
      <motion.div
        style={{ x: parallaxX2, y: parallaxY2 }}
        onMouseEnter={() => setIsSpinnerHovered(true)}
        onMouseLeave={() => setIsSpinnerHovered(false)}
        whileHover={{ scale: 1.15 }}
        className="absolute bottom-[10%] left-[28%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none opacity-75 hover:opacity-100 transition-all duration-300"
        style={{ width: 64, height: 64 }}
      >
        <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,107,74,0.4)]">
          {/* Wheel */}
          <motion.g
            style={{ transformOrigin: "40px 40px" }}
            animate={{
              rotate: isSpinnerHovered ? [0, 720] : [0, 360],
            }}
            transition={{
              duration: isSpinnerHovered ? 2 : 30,
              repeat: Infinity,
              ease: isSpinnerHovered ? "easeOut" : "linear",
            }}
          >
            <circle cx="40" cy="40" r="30" fill="none" stroke={isSpinnerHovered ? "#FFB088" : "rgba(255,255,255,0.3)"} strokeWidth="2" />
            {/* Wheel segments */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={angle}
                x1="40"
                y1="40"
                x2={40 + 30 * Math.cos(angle * Math.PI / 180)}
                y2={40 + 30 * Math.sin(angle * Math.PI / 180)}
                stroke={i % 2 === 0 ? (isSpinnerHovered ? "#FF6B4A" : "rgba(255,255,255,0.25)") : (isSpinnerHovered ? "#FFB088" : "rgba(255,255,255,0.15)")}
                strokeWidth="1.5"
              />
            ))}
            {/* Colored dots on wheel edge */}
            {[0, 90, 180, 270].map((angle) => (
              <circle
                key={`dot-${angle}`}
                cx={40 + 25 * Math.cos(angle * Math.PI / 180)}
                cy={40 + 25 * Math.sin(angle * Math.PI / 180)}
                r="3"
                fill={isSpinnerHovered ? "#FF6B4A" : "rgba(255,255,255,0.3)"}
              />
            ))}
          </motion.g>
          {/* Center hub */}
          <circle cx="40" cy="40" r="5" fill={isSpinnerHovered ? "#FF6B4A" : "rgba(255,255,255,0.4)"} />
          {/* Pointer (fixed, doesn't spin) */}
          <polygon points="40,6 36,14 44,14" fill={isSpinnerHovered ? "#FFB088" : "rgba(255,255,255,0.6)"} />
        </svg>
      </motion.div>

      {/* --- Main Content Layout --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Column: Info & CTA */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] font-bold block" style={{ color: "#FFB088" }}>
              Exclusive Gatherings
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">
              Host Your Next Event With Us
            </h2>
            <p className="text-sm md:text-base text-white/75 leading-relaxed font-light">
              Elevate your corporate culture or private milestones. From team building sessions guided by our Game Masters to exclusive custom cocktail menus, we host Hyderabad&apos;s most memorable group events.
            </p>
            <div className="h-[2px] w-24 rounded-full" style={{ background: "linear-gradient(to right, #FF6B4A, #4dafee, #2d8ad0)" }} />
            <div className="pt-4">
              <motion.button
                onClick={onOpenBooking}
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,107,74,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="text-white text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-full transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #FF6B4A, #e05a3a)",
                  boxShadow: "0 0 25px rgba(255,107,74,0.3)",
                }}
              >
                Plan Your Event
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Grid of Event Types (Frosted Glass Panels) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((evt, idx) => {
              const accent = eventAccents[idx] || eventAccents[0];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`bg-white/[0.06] border border-white/[0.12] backdrop-blur-md rounded-2xl p-6 transition-all duration-500 group flex flex-col justify-between ${accent.hoverBorder} hover:bg-white/[0.1] hover:-translate-y-1.5`}
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
                >
                  <div>
                    {/* Icon container */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-white/5 transition-all duration-300 text-white/70 ${accent.iconBg} ${accent.iconColor}`}>
                      {evt.icon}
                    </div>
                    <h3 className={`font-serif text-xl font-bold text-white mb-2 transition-colors duration-300 ${accent.text}`}>
                      {evt.title}
                    </h3>
                    <p className="text-xs text-white/65 leading-relaxed font-light">
                      {evt.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      {/* --- Animated Wave Bottom Divider --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,80 C300,30 600,100 900,50 C1050,30 1150,60 1200,80 L1200,120 L0,120 Z"
            fill="rgba(58,155,224,0.35)"
            animate={{
              d: [
                "M0,80 C300,30 600,100 900,50 C1050,30 1150,60 1200,80 L1200,120 L0,120 Z",
                "M0,50 C200,90 500,20 800,70 C950,90 1100,40 1200,50 L1200,120 L0,120 Z",
                "M0,80 C300,30 600,100 900,50 C1050,30 1150,60 1200,80 L1200,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
}
