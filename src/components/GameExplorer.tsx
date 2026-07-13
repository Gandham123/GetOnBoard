"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

interface CategoryOverview {
  id: string;
  category: string;
  badge: string;
  heading: string;
  desc: string;
  perfectFor: string[];
  whatYoullExperience: string[];
  indicators: {
    sessionLength: number;
    learningCurve: number;
    interactionLevel: number;
    energyLevel: number;
  };
}

const categoryAccents: Record<string, {
  color: string;
  badge: string;
  glow: string;
  text: string;
  hoverBorder: string;
  btnActive: string;
}> = {
  "Strategy": {
    color: "#1565C0", // Blue
    badge: "bg-[#1565C0]/10 text-[#1565C0] border-[#1565C0]/20",
    glow: "shadow-[0_0_30px_rgba(21,101,192,0.25)]",
    text: "group-hover:text-[#1565C0]",
    hoverBorder: "hover:border-[#1565C0]/50",
    btnActive: "bg-[#1565C0] text-white border-[#1565C0] shadow-[0_0_15px_rgba(21,101,192,0.4)]",
  },
  "Party": {
    color: "#F57C00", // Orange
    badge: "bg-[#F57C00]/10 text-[#F57C00] border-[#F57C00]/20",
    glow: "shadow-[0_0_30px_rgba(245,124,0,0.25)]",
    text: "group-hover:text-[#F57C00]",
    hoverBorder: "hover:border-[#F57C00]/50",
    btnActive: "bg-[#F57C00] text-white border-[#F57C00] shadow-[0_0_15px_rgba(245,124,0,0.4)]",
  },
  "Family": {
    color: "#FF9800", // Orange 2
    badge: "bg-[#FF9800]/10 text-[#FF9800] border-[#FF9800]/20",
    glow: "shadow-[0_0_30px_rgba(255,152,0,0.25)]",
    text: "group-hover:text-[#FF9800]",
    hoverBorder: "hover:border-[#FF9800]/50",
    btnActive: "bg-[#FF9800] text-white border-[#FF9800] shadow-[0_0_15px_rgba(255,152,0,0.4)]",
  },
  "Card": {
    color: "#1E88E5", // Blue 2
    badge: "bg-[#1E88E5]/10 text-[#1E88E5] border-[#1E88E5]/20",
    glow: "shadow-[0_0_30px_rgba(30,136,229,0.25)]",
    text: "group-hover:text-[#1E88E5]",
    hoverBorder: "hover:border-[#1E88E5]/50",
    btnActive: "bg-[#1E88E5] text-white border-[#1E88E5] shadow-[0_0_15px_rgba(30,136,229,0.4)]",
  },
  "Adventure": {
    color: "#546E7A", // Gray
    badge: "bg-[#546E7A]/10 text-[#546E7A] border-[#546E7A]/20",
    glow: "shadow-[0_0_30px_rgba(84,110,122,0.25)]",
    text: "group-hover:text-[#546E7A]",
    hoverBorder: "hover:border-[#546E7A]/50",
    btnActive: "bg-[#546E7A] text-white border-[#546E7A] shadow-[0_0_15px_rgba(84,110,122,0.4)]",
  },
  "All": {
    color: "#1565C0", // Blue
    badge: "bg-[#1565C0]/10 text-[#1565C0] border-[#1565C0]/20",
    glow: "shadow-[0_0_30px_rgba(21,101,192,0.25)]",
    text: "group-hover:text-[#1565C0]",
    hoverBorder: "hover:border-[#1565C0]/50",
    btnActive: "bg-[#1565C0] text-white border-[#1565C0] shadow-[0_0_15px_rgba(21,101,192,0.4)]",
  },
};

export default function GameExplorer() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Hover states for background animation details
  const [isHourglassHovered, setIsHourglassHovered] = useState(false);
  const [isSpinnerHovered, setIsSpinnerHovered] = useState(false);
  const [isTttHovered, setIsTttHovered] = useState(false);
  const [isDominoHovered, setIsDominoHovered] = useState(false);
  const [isMeepleHovered, setIsMeepleHovered] = useState(false);
  const [isBgHovered, setIsBgHovered] = useState(false);

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

  const categories = [
    "All",
    "Strategy",
    "Party",
    "Family",
    "Card",
    "Adventure",
  ];

  const categoryOverviews: CategoryOverview[] = [
    {
      id: "strategy",
      category: "Strategy",
      badge: "Strategy Games",
      heading: "Think Before Every Move",
      desc: "Immerse yourself in games of planning, logistics, and tactics. Every choice counts as you manage limited resources, build engines, out-maneuver opponents, and execute long-term decisions to secure victory.",
      perfectFor: ["Competitive Players", "Friends", "Team Building"],
      whatYoullExperience: ["Strategy", "Resource Management", "Puzzle Solving"],
      indicators: {
        sessionLength: 75,
        learningCurve: 85,
        interactionLevel: 60,
        energyLevel: 50,
      },
    },
    {
      id: "party",
      category: "Party",
      badge: "Party Games",
      heading: "Laugh Together",
      desc: "Break the ice with fast-paced, high-interaction games of communication, social deduction, guessing, and active laughter. Perfect for keeping the energy high, sharing inside jokes, and creating unforgettable memories.",
      perfectFor: ["Large Groups", "Friends", "Beginners", "Team Building"],
      whatYoullExperience: ["Communication", "Bluffing", "Quick Thinking"],
      indicators: {
        sessionLength: 25,
        learningCurve: 20,
        interactionLevel: 95,
        energyLevel: 90,
      },
    },
    {
      id: "family",
      category: "Family",
      badge: "Family Games",
      heading: "Fun For Everyone",
      desc: "Gather everyone around the table with accessible games featuring intuitive rules, engaging mechanics, and high-replayability. Designed to bring ages from kids to grandparents together for fun, friendly bonding.",
      perfectFor: ["Families", "Kids", "Beginners", "Couples"],
      whatYoullExperience: ["Teamwork", "Puzzle Solving", "Quick Thinking"],
      indicators: {
        sessionLength: 40,
        learningCurve: 30,
        interactionLevel: 75,
        energyLevel: 65,
      },
    },
    {
      id: "card",
      category: "Card",
      badge: "Card Games",
      heading: "Master Every Card",
      desc: "Test your skill in deck building, hand management, and tactical card plays. From classic bluffing games to modern cooperative card challenges, learn to read the room and play your hand at the perfect moment.",
      perfectFor: ["Couples", "Friends", "Competitive Players"],
      whatYoullExperience: ["Bluffing", "Resource Management", "Quick Thinking"],
      indicators: {
        sessionLength: 30,
        learningCurve: 40,
        interactionLevel: 70,
        energyLevel: 60,
      },
    },
    {
      id: "adventure",
      category: "Adventure",
      badge: "Adventure Games",
      heading: "Live the Story",
      desc: "Embark on cooperative quests, campaign-driven exploration, and immersive roleplay. Work together with your teammates to solve mysteries, complete dangerous missions, and uncover stories where your choices shape the outcome.",
      perfectFor: ["Competitive Players", "Friends", "Couples", "Team Building"],
      whatYoullExperience: ["Storytelling", "Teamwork", "Puzzle Solving"],
      indicators: {
        sessionLength: 80,
        learningCurve: 70,
        interactionLevel: 85,
        energyLevel: 70,
      },
    },
  ];

  const filteredOverviews = activeCategory === "All"
    ? categoryOverviews
    : categoryOverviews.filter((overview) => overview.category === activeCategory);

  return (
    <section 
      id="games" 
      ref={sectionRef}
      className="py-24 bg-[#102c47] border-t border-white/20 relative overflow-hidden"
    >
      
      {/* --- Ambient Soft Glowing Background Blobs --- */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, 40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-[5%] w-[380px] h-[380px] bg-white/10 rounded-full blur-[110px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.25, 0.1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-1/4 right-[5%] w-[480px] h-[480px] bg-[#1E88E5]/15 rounded-full blur-[130px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#FF9800]/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* --- High Visibility Interactive Floating Game Components --- */}
      {/* Set at z-0 with pointer-events-auto so they can be hovered/interacted in spaces/margins */}

      {/* 1. Opposing Chess Pieces Battle (Left Side - visible behind strategy cards) */}
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        className="absolute top-[12%] left-[6%] z-0 pointer-events-auto select-none opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <div className="relative w-44 h-44 flex items-center justify-between">
          <div className="absolute inset-x-0 bottom-12 h-[2px] bg-gradient-to-r from-transparent via-[#1565C0]/40 to-transparent" />
          
          {/* Chess Knight */}
          <motion.div
            animate={{
              x: [0, 20, 0],
              y: [0, -8, 0],
              rotate: [0, 6, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ 
              y: [0, -25, -25, 0], 
              scaleY: [1, 0.8, 1.2, 1], 
              rotate: [0, 15, -15, 0],
              transition: { duration: 0.6 } 
            }}
            className="w-16 h-16 cursor-pointer"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#1565C0] fill-white/10 drop-shadow-[0_0_15px_rgba(21,101,192,0.4)]">
              <path d="M35 85 h30 C65 85 68 80 65 72 C62 65 58 55 62 48 C65 40 70 38 68 30 C65 20 50 15 45 20 C35 25 30 38 32 45 C35 52 30 55 25 60 C20 65 25 72 30 72 C32 65 38 68 35 85 Z" strokeWidth="2" />
              <circle cx="45" cy="35" r="3" className="fill-[#E3F2FD]" />
            </svg>
          </motion.div>
 
          {/* Chess Pawn */}
          <motion.div
            animate={{
              x: [0, -20, 0],
              y: [0, -4, 0],
              rotate: [0, -4, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            whileHover={{ y: -15, scale: 1.2 }}
            className="w-12 h-12 cursor-pointer"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#1565C0] fill-white/10 drop-shadow-[0_0_12px_rgba(21,101,192,0.4)]">
              <path d="M35 85 h30 c2-15-5-20-5-30 c0-5 3-8 3-12 c0-5-3-8-8-8 s-8 3-8 8 c0 4 3 7 3 12 c0 10-7 15-5 30 Z" strokeWidth="2" />
              <circle cx="50" cy="25" r="5" className="fill-[#E3F2FD]" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* 2. Rolling Dice Pairs (Top Right) */}
      <motion.div
        style={{ x: parallaxX2, y: parallaxY2 }}
        className="absolute top-[10%] right-[8%] z-0 pointer-events-auto select-none opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <div className="relative w-40 h-40">
          {/* Die 1 */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 45, 90, 45, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.3, rotate: 360, transition: { duration: 0.6, ease: "easeOut" } }}
            className="absolute left-0 top-4 w-16 h-16 cursor-pointer"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#FF9800] fill-white/10 drop-shadow-[0_0_15px_rgba(255,152,0,0.4)]">
              <polygon points="50,15 85,35 50,55 15,35" strokeWidth="2" />
              <polygon points="15,35 50,55 50,90 15,70" strokeWidth="2" />
              <polygon points="50,55 85,35 85,70 50,90" strokeWidth="2" />
              <circle cx="50" cy="35" r="3" className="fill-[#FFF3E0]" />
              <circle cx="32" cy="52" r="2.5" className="fill-[#FFF3E0]/80" />
              <circle cx="32" cy="72" r="2.5" className="fill-[#FFF3E0]/80" />
              <circle cx="68" cy="52" r="2.5" className="fill-[#FFF3E0]/80" />
              <circle cx="68" cy="72" r="2.5" className="fill-[#FFF3E0]/80" />
              <circle cx="59" cy="62" r="2.5" className="fill-[#FFF3E0]/80" />
            </svg>
          </motion.div>
 
          {/* Die 2 (D20) */}
          <motion.div
            animate={{
              y: [8, -4, 8],
              rotate: [180, 220, 180],
              scale: [0.95, 1, 0.95],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
            whileHover={{ scale: 1.3, rotate: 360, transition: { duration: 0.6 } }}
            className="absolute right-2 bottom-4 w-18 h-18 cursor-pointer"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#FF9800] fill-white/10 drop-shadow-[0_0_12px_rgba(255,152,0,0.4)]">
              <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" strokeWidth="2" />
              <polygon points="50,10 50,45 15,30" strokeWidth="2" />
              <polygon points="50,10 85,30 50,45" strokeWidth="2" />
              <polygon points="15,30 50,45 15,70" strokeWidth="2" />
              <polygon points="85,30 50,45 85,70" strokeWidth="2" />
              <polygon points="15,70 50,45 50,90" strokeWidth="2" />
              <polygon points="85,70 50,45 50,90" strokeWidth="2" />
              <text x="50" y="52" textAnchor="middle" dominantBaseline="middle" className="fill-[#FF9800] font-sans text-xs font-bold" stroke="none">20</text>
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* 3. Fanned Playing Cards (Bottom Right area) */}
      <motion.div
        style={{ x: parallaxX3, y: parallaxY3 }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 7.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        whileHover={{ scale: 1.25, rotate: 18 }}
        className="absolute bottom-[8%] right-[5%] z-0 pointer-events-auto select-none opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
      >
        <svg viewBox="0 0 120 120" className="w-28 h-28 stroke-[#1E88E5] fill-white/10 drop-shadow-[0_0_15px_rgba(30,136,229,0.4)]">
          <g transform="rotate(-15 60 60)">
            <rect x="25" y="20" width="45" height="70" rx="4" strokeWidth="2" fill="#E3F2FD" />
          </g>
          <g transform="rotate(0 60 60)">
            <rect x="35" y="15" width="45" height="70" rx="4" strokeWidth="2" fill="#E3F2FD" />
            <path d="M57.5 45 C57.5 45 52 40 47.5 45 C43 50 57.5 60 57.5 60 C57.5 60 72 50 67.5 45 C63 40 57.5 45 57.5 45 Z" className="fill-[#1E88E5]/40 stroke-none" />
          </g>
          <g transform="rotate(15 60 60)">
            <rect x="45" y="20" width="45" height="70" rx="4" strokeWidth="2" fill="#E3F2FD" />
            <text x="52" y="34" className="fill-[#1E88E5] text-[10px] font-bold" stroke="none">A</text>
            <path d="M67.5 50 C67.5 50 63.5 47 60 50 C56.5 53 67.5 62 67.5 62 C67.5 62 78.5 53 75 50 C71.5 47 67.5 50 67.5 50 Z" className="fill-[#1E88E5]/80 stroke-none" />
          </g>
        </svg>
      </motion.div>

      {/* 4. Board Path & Moving Meeples (Bottom Left) */}
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        className="absolute bottom-[6%] left-[4%] z-0 pointer-events-none select-none opacity-80"
      >
        <div className="relative w-56 h-32">
          {/* Glow Dotted Path */}
          <svg viewBox="0 0 200 100" className="w-full h-full stroke-[#546E7A] fill-none">
            <path d="M 20 80 Q 70 20 120 75 T 180 35" strokeDasharray="5,7" strokeWidth="2.5" className="drop-shadow-[0_0_8px_rgba(84,110,122,0.4)]" />
            <circle cx="20" cy="80" r="5" className="fill-[#546E7A]" />
            <circle cx="72" cy="45" r="4.5" className="fill-[#546E7A]" />
            <circle cx="120" cy="75" r="4.5" className="fill-[#546E7A]" />
            <circle cx="180" cy="35" r="5" className="fill-[#546E7A]" />
          </svg>
 
          {/* Yellow Meeple */}
          <motion.div
            animate={{
              x: [10, 16, 10],
              y: [4, 0, 4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[30px] top-[18px] w-9 h-9"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#546E7A]/20 stroke-[#546E7A] drop-shadow-[0_0_12px_rgba(84,110,122,0.4)]">
              <path d="M50,15 C55.5,15 60,19.5 60,25 C60,30.5 55.5,35 50,35 C44.5,35 40,30.5 40,25 C40,19.5 44.5,15 50,15 Z M35,42 L65,42 C67.8,42 70,44.2 70,47 L70,55 C70,57.8 67.8,60 65,60 L62,60 L62,85 C62,87.8 59.8,90 57,90 L43,90 C40.2,90 38,87.8 38,85 L38,60 L35,60 C32.2,60 30,57.8 30,55 L30,47 C30,44.2 32.2,42 35,42 Z" strokeWidth="2" />
            </svg>
          </motion.div>
 
          {/* Red Meeple */}
          <motion.div
            animate={{
              x: [100, 106, 100],
              y: [34, 38, 34],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
            className="absolute left-0 top-0 w-9 h-9"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#FF9800]/20 stroke-[#FF9800] drop-shadow-[0_0_12px_rgba(255,152,0,0.4)]">
              <path d="M50,15 C55.5,15 60,19.5 60,25 C60,30.5 55.5,35 50,35 C44.5,35 40,30.5 40,25 C40,19.5 44.5,15 50,15 Z M35,42 L65,42 C67.8,42 70,44.2 70,47 L70,55 C70,57.8 67.8,60 65,60 L62,60 L62,85 C62,87.8 59.8,90 57,90 L43,90 C40.2,90 38,87.8 38,85 L38,60 L35,60 C32.2,60 30,57.8 30,55 L30,47 C30,44.2 32.2,42 35,42 Z" strokeWidth="2" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* 5. Strategy Map Connection Routes / Hex Grid (Middle Right) */}
      <motion.div
        style={{ x: parallaxX2, y: parallaxY2 }}
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[38%] right-[2%] z-0 pointer-events-none select-none opacity-80"
      >
        <svg viewBox="0 0 120 120" className="w-36 h-36 stroke-[#1E88E5] fill-none drop-shadow-[0_0_12px_rgba(30,136,229,0.4)]">
          <polygon points="60,20 90,37 90,72 60,90 30,72 30,37" strokeWidth="1.5" />
          <polygon points="90,37 120,54 120,89 90,107 60,90 90,72" strokeWidth="1.5" />
          <polygon points="30,37 60,54 60,89 30,107 0,89 0,54" strokeWidth="1.5" />
          <circle cx="60" cy="20" r="3.5" className="fill-[#1E88E5]" />
          <circle cx="90" cy="37" r="4.5" className="fill-[#1E88E5]" />
          <circle cx="30" cy="37" r="3.5" className="fill-[#1E88E5]" />
          <circle cx="60" cy="90" r="5.5" className="fill-[#1E88E5]" />
        </svg>
      </motion.div>

      {/* 6. Glowing Gold Tokens / Game Coins (Drifting in background) */}
      <motion.div
        style={{ x: parallaxX3, y: parallaxY3 }}
        animate={{
          y: [0, -15, 0],
          rotateX: [0, 30, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[42%] left-[3%] z-0 pointer-events-none select-none opacity-85"
      >
        <svg viewBox="0 0 80 80" className="w-14 h-14 stroke-[#F57C00] fill-white/10 drop-shadow-[0_0_12px_rgba(245,124,0,0.4)]">
          <ellipse cx="40" cy="50" rx="25" ry="10" strokeWidth="2" />
          <line x1="15" y1="50" x2="15" y2="55" strokeWidth="2" />
          <line x1="65" y1="50" x2="65" y2="55" strokeWidth="2" />
          <ellipse cx="40" cy="55" rx="25" ry="10" strokeWidth="2" />
          <ellipse cx="40" cy="40" rx="25" ry="10" strokeWidth="2" fill="#FFF3E0" />
          <path d="M 25 40 A 15 6 0 0 0 55 40" strokeWidth="1.2" strokeDasharray="3,3" className="stroke-[#F57C00]" />
        </svg>
      </motion.div>

      {/* 7. Hourglass (Sand Timer) (Mid Left - visible behind middle left cards) */}
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        onMouseEnter={() => setIsHourglassHovered(true)}
        onMouseLeave={() => setIsHourglassHovered(false)}
        animate={{
          rotate: isHourglassHovered 
            ? [0, 180, 360] 
            : [0, 0, 180, 180, 360, 360],
        }}
        transition={{
          duration: isHourglassHovered ? 1.5 : 12,
          repeat: Infinity,
          ease: "easeInOut",
          times: isHourglassHovered ? [0, 0.5, 1] : [0, 0.45, 0.5, 0.95, 1, 1],
        }}
        whileHover={{ scale: 1.25 }}
        className="absolute top-[36%] left-[6%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-20 h-28 opacity-85 hover:opacity-100 transition-all duration-300"
      >
        <svg viewBox="0 0 100 120" className="w-full h-full stroke-[#546E7A] fill-white/10 drop-shadow-[0_0_15px_rgba(84,110,122,0.4)]">
          {/* Wooden Plates */}
          <rect x="18" y="10" width="64" height="8" rx="2" strokeWidth="2.5" className="fill-[#546E7A]" />
          <rect x="18" y="102" width="64" height="8" rx="2" strokeWidth="2.5" className="fill-[#546E7A]" />
          
          {/* Outer Glass Bulbs */}
          <path d="M 28 18 C 28 50, 48 56, 48 60 C 48 64, 28 70, 28 102" strokeWidth="2.5" fill="none" />
          <path d="M 72 18 C 72 50, 52 56, 52 60 C 52 64, 72 70, 72 102" strokeWidth="2.5" fill="none" />
          
          {/* Sand Top (depleting) */}
          <motion.path
            d="M 30 18 L 70 18 Q 65 48, 51 58 L 49 58 Q 35 48, 30 18 Z"
            style={{ transformOrigin: "50px 58px" }}
            animate={{
              scaleY: [1, 0, 0, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.45, 0.5, 0.51]
            }}
            className={isHourglassHovered ? "fill-[#F57C00]/80 stroke-none" : "fill-[#546E7A]/70 stroke-none"}
          />
 
          {/* Trickling Sand Line */}
          <motion.line
            x1="50"
            y1="58"
            x2="50"
            y2="102"
            strokeWidth="2.5"
            strokeDasharray="4,6"
            animate={{
              strokeDashoffset: [0, -20],
              opacity: [1, 1, 0, 0, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.8, 0.9, 0.95, 1]
            }}
            className={isHourglassHovered ? "stroke-[#FF9800]" : "stroke-[#546E7A]"}
          />
 
          {/* Sand Bottom (accumulating) */}
          <motion.path
            d="M 30 102 L 70 102 L 55 76 L 45 76 Z"
            style={{ transformOrigin: "50px 102px" }}
            animate={{
              scaleY: [0, 1, 0, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.45, 0.5, 0.51]
            }}
            className={isHourglassHovered ? "fill-[#F57C00]/80 stroke-none" : "fill-[#546E7A]/70 stroke-none"}
          />
        </svg>
      </motion.div>

      {/* 8. Spinning Arrow Game Wheel (Mid Right - visible in columns gap) */}
      <motion.div
        style={{ x: parallaxX2, y: parallaxY2 }}
        onMouseEnter={() => setIsSpinnerHovered(true)}
        onMouseLeave={() => setIsSpinnerHovered(false)}
        whileHover={{ scale: 1.25 }}
        className="absolute top-[48%] right-[8%] z-0 pointer-events-auto cursor-pointer hidden md:block select-none w-24 h-24 opacity-85 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#FF9800] fill-white/10 drop-shadow-[0_0_15px_rgba(255,152,0,0.4)]">
          <circle cx="50" cy="50" r="45" strokeWidth="2.5" />
          <line x1="5" y1="50" x2="95" y2="50" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="50" y1="5" x2="50" y2="95" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="18" y1="18" x2="82" y2="82" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="18" y1="82" x2="82" y2="18" strokeWidth="1" strokeDasharray="4,4" />
          <circle cx="50" cy="50" r="6" className="fill-[#FF9800]" />
          
          <motion.g
            style={{ transformOrigin: "50px 50px" }}
            animate={isSpinnerHovered 
              ? { rotate: [0, 360, 1080, 2160, 2880] } 
              : { rotate: [0, 360, 1080, 1440, 1500, 1500] }
            }
            transition={{
              duration: isSpinnerHovered ? 2 : 8,
              repeat: Infinity,
              ease: isSpinnerHovered ? "easeOut" : "easeInOut",
              times: isSpinnerHovered ? [0, 0.2, 0.5, 0.8, 1] : [0, 0.1, 0.3, 0.5, 0.6, 1],
            }}
          >
            <polygon points="50,15 56,35 52,35 52,65 48,65 48,35 44,35" className="fill-[#FF9800] stroke-none" />
            <circle cx="50" cy="50" r="3" className="fill-black" />
          </motion.g>
        </svg>
      </motion.div>

      {/* 9. Tic-Tac-Toe Game Sequence Board (Upper Center/Left - visible behind card 2) */}
      <motion.div
        style={{ x: parallaxX3, y: parallaxY3 }}
        onMouseEnter={() => setIsTttHovered(true)}
        onMouseLeave={() => setIsTttHovered(false)}
        whileHover={{ scale: 1.2 }}
        className="absolute top-[28%] left-[45%] -translate-x-1/2 z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-28 h-28 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none drop-shadow-[0_0_15px_rgba(255,152,0,0.4)]">
          {/* Grid Lines */}
          <line x1="33" y1="5" x2="33" y2="95" strokeWidth="2.5" className={isTttHovered ? "stroke-[#FF9800]" : "stroke-[#546E7A]"} />
          <line x1="66" y1="5" x2="66" y2="95" strokeWidth="2.5" className={isTttHovered ? "stroke-[#FF9800]" : "stroke-[#546E7A]"} />
          <line x1="5" y1="33" x2="95" y2="33" strokeWidth="2.5" className={isTttHovered ? "stroke-[#FF9800]" : "stroke-[#546E7A]"} />
          <line x1="5" y1="66" x2="95" y2="66" strokeWidth="2.5" className={isTttHovered ? "stroke-[#FF9800]" : "stroke-[#546E7A]"} />
          
          {/* X in center */}
          <motion.g
            animate={{
              opacity: [0, 1, 1, 1, 1, 1, 0, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              times: [0, 0.15, 0.15, 0.8, 0.8, 0.9, 0.95, 1],
              ease: "easeInOut",
            }}
          >
            <line x1="42" y1="42" x2="58" y2="58" strokeWidth="3" className={isTttHovered ? "stroke-[#FF9800]" : "stroke-[#1565C0]"} />
            <line x1="58" y1="42" x2="42" y2="58" strokeWidth="3" className={isTttHovered ? "stroke-[#FF9800]" : "stroke-[#1565C0]"} />
          </motion.g>

          {/* O in top-left */}
          <motion.g
            animate={{
              opacity: [0, 0, 1, 1, 1, 1, 0, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              times: [0, 0.25, 0.4, 0.8, 0.8, 0.9, 0.95, 1],
              ease: "easeInOut",
            }}
          >
            <circle cx="19" cy="19" r="8" strokeWidth="3" className={isTttHovered ? "stroke-[#FF9800]" : "stroke-[#1E88E5]"} />
          </motion.g>

          {/* X in bottom-right */}
          <motion.g
            animate={{
              opacity: [0, 0, 0, 1, 1, 1, 0, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              times: [0, 0.45, 0.6, 0.8, 0.8, 0.9, 0.95, 1],
              ease: "easeInOut",
            }}
          >
            <line x1="75" y1="75" x2="91" y2="91" strokeWidth="3" className={isTttHovered ? "stroke-[#FF9800]" : "stroke-[#1565C0]"} />
            <line x1="91" y1="75" x2="75" y2="91" strokeWidth="3" className={isTttHovered ? "stroke-[#FF9800]" : "stroke-[#1565C0]"} />
          </motion.g>

          {/* O in top-right */}
          <motion.g
            animate={{
              opacity: [0, 0, 0, 0, 1, 1, 0, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              times: [0, 0.65, 0.75, 0.8, 0.8, 0.9, 0.95, 1],
              ease: "easeInOut",
            }}
          >
            <circle cx="82" cy="19" r="8" strokeWidth="3" className={isTttHovered ? "stroke-[#FF9800]" : "stroke-[#1E88E5]"} />
          </motion.g>

          {/* Winning Strike line */}
          <motion.line
            x1="10"
            y1="10"
            x2="90"
            y2="90"
            strokeWidth="3.5"
            className="stroke-[#F57C00]"
            animate={{
              opacity: [0, 0, 0, 0, 1, 1, 0, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              times: [0, 0.75, 0.78, 0.8, 0.9, 0.9, 0.95, 1],
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>

      {/* 10. Dominoes (NEW - Center Grid position - visible behind Card 5) */}
      <motion.div
        style={{ x: parallaxX2, y: parallaxY2 }}
        onMouseEnter={() => setIsDominoHovered(true)}
        onMouseLeave={() => setIsDominoHovered(false)}
        whileHover={{ scale: 1.15 }}
        className="absolute top-[52%] left-[45%] -translate-x-1/2 z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-36 h-28 opacity-85 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 120 80" className="w-full h-full stroke-[#FF9800] fill-white/10 drop-shadow-[0_0_15px_rgba(255,152,0,0.4)]">
          {/* Domino 1 */}
          <motion.g
            style={{ transformOrigin: "20px 70px" }}
            animate={{ rotate: isDominoHovered ? 75 : 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
          >
            <rect x="10" y="10" width="20" height="60" rx="3" strokeWidth="2.5" />
            <line x1="10" y1="40" x2="30" y2="40" strokeWidth="2" className="stroke-[#FF9800]/50" />
            <circle cx="20" cy="25" r="2.5" className="fill-[#FF9800]" />
            <circle cx="20" cy="55" r="2.5" className="fill-[#FF9800]" />
          </motion.g>
 
          {/* Domino 2 */}
          <motion.g
            style={{ transformOrigin: "50px 70px" }}
            animate={{ rotate: isDominoHovered ? 55 : 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.12 }}
          >
            <rect x="40" y="10" width="20" height="60" rx="3" strokeWidth="2.5" />
            <line x1="40" y1="40" x2="60" y2="40" strokeWidth="2" className="stroke-[#FF9800]/50" />
            <circle cx="50" cy="25" r="2.5" className="fill-[#FF9800]" />
            <circle cx="45" cy="50" r="2" className="fill-[#FF9800]" />
            <circle cx="55" cy="60" r="2" className="fill-[#FF9800]" />
          </motion.g>
 
          {/* Domino 3 */}
          <motion.g
            style={{ transformOrigin: "80px 70px" }}
            animate={{ rotate: isDominoHovered ? 35 : 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.24 }}
          >
            <rect x="70" y="10" width="20" height="60" rx="3" strokeWidth="2.5" />
            <line x1="70" y1="40" x2="90" y2="40" strokeWidth="2" className="stroke-[#FF9800]/50" />
            <circle cx="75" cy="20" r="2" className="fill-[#FF9800]" />
            <circle cx="85" cy="30" r="2" className="fill-[#FF9800]" />
            <circle cx="80" cy="55" r="2.5" className="fill-[#FF9800]" />
          </motion.g>
        </svg>
      </motion.div>

      {/* 11. Bouncing Meeple Stack (NEW - Bottom Center - visible behind Card 8) */}
      <motion.div
        style={{ x: parallaxX1, y: parallaxY1 }}
        onMouseEnter={() => setIsMeepleHovered(true)}
        onMouseLeave={() => setIsMeepleHovered(false)}
        whileHover={{ scale: 1.15 }}
        className="absolute bottom-[16%] left-[45%] -translate-x-1/2 z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-24 h-32 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 100 120" className="w-full h-full fill-white/10 stroke-[#FF9800] drop-shadow-[0_0_15px_rgba(255,152,0,0.4)]">
          {/* Bottom Meeple */}
          <motion.g
            style={{ transformOrigin: "50px 105px" }}
            animate={isMeepleHovered ? { y: [0, -10, 0], scaleY: [1, 0.9, 1.1, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <path d="M50,75 C54,75 57,78 57,82 C57,86 54,89 50,89 C46,89 43,86 43,82 C43,78 46,75 50,75 Z M38,94 L62,94 C64,94 65,95 65,97 L65,102 C65,104 64,105 62,105 L60,105 L60,118 c0,2-1.5,3-3,3 L43,121 c-1.5,0-3-1-3-3 L40,105 L38,105 C36,105 35,104 35,102 L35,97 C35,95 36,94 38,94 Z" strokeWidth="2" />
          </motion.g>

          {/* Middle Meeple */}
          <motion.g
            style={{ transformOrigin: "50px 75px" }}
            animate={isMeepleHovered ? { y: [0, -20, 0], scaleY: [1, 0.9, 1.1, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <path d="M50,45 C54,45 57,48 57,52 C57,56 54,59 50,59 C46,59 43,56 43,52 C43,48 46,45 50,45 Z M38,64 L62,64 C64,64 65,65 65,67 L65,72 C65,74 64,75 62,75 L60,75 L60,88 c0,2-1.5,3-3,3 L43,91 c-1.5,0-3-1-3-3 L40,75 L38,75 C36,75 35,74 35,72 L35,67 C35,65 36,64 38,64 Z" strokeWidth="2" />
          </motion.g>

          {/* Top Meeple */}
          <motion.g
            style={{ transformOrigin: "50px 45px" }}
            animate={isMeepleHovered ? { y: [0, -30, 0], scaleY: [1, 0.8, 1.2, 1] } : {}}
            transition={{ duration: 0.6 }}
          >
            <path d="M50,15 C54,15 57,18 57,22 C57,26 54,29 50,29 C46,29 43,26 43,22 C43,18 46,15 50,15 Z M38,34 L62,34 C64,34 65,35 65,37 L65,42 C65,44 64,45 62,45 L60,45 L60,58 c0,2-1.5,3-3,3 L43,61 c-1.5,0-3-1-3-3 L40,45 L38,45 C36,45 35,44 35,42 L35,37 C35,35 36,34 38,34 Z" strokeWidth="2" />
          </motion.g>
        </svg>
      </motion.div>

      {/* 12. Backgammon Points & Sliding Checkers (NEW - Bottom Right - visible behind Card 9) */}
      <motion.div
        style={{ x: parallaxX3, y: parallaxY3 }}
        onMouseEnter={() => setIsBgHovered(true)}
        onMouseLeave={() => setIsBgHovered(false)}
        whileHover={{ scale: 1.15 }}
        className="absolute bottom-[20%] right-[10%] z-0 pointer-events-auto cursor-pointer hidden lg:block select-none w-32 h-28 opacity-85 hover:opacity-100 transition-opacity duration-300"
      >
        <svg viewBox="0 0 120 100" className="w-full h-full stroke-[#FF9800] fill-white/10 drop-shadow-[0_0_15px_rgba(255,152,0,0.4)]">
          <polygon points="10,90 25,20 40,90" strokeWidth="1.5" />
          <polygon points="40,90 55,20 70,90" strokeWidth="1.5" />
          <polygon points="70,90 85,20 100,90" strokeWidth="1.5" />
          
          <motion.circle
            cx="25"
            cy="80"
            r="7"
            animate={isBgHovered ? { x: 30, y: -15 } : { x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="fill-[#FF9800]"
            stroke="none"
          />

          <motion.circle
            cx="85"
            cy="80"
            r="7"
            animate={isBgHovered ? { x: -30, y: -5 } : { x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.1 }}
            className="fill-[#FF9800]"
            stroke="none"
          />
        </svg>
      </motion.div>

      {/* --- Main Contents Container --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#FF9800] font-bold block mb-3">
            Explore 1200+ Titles
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">
            Curated Game Library
          </h2>
          <p className="text-sm text-white/80 mt-3 font-normal">
            From quick party games to epic heavy strategy campaigns, our Game Masters will set up the perfect match.
          </p>
          <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-[#FF9800] to-transparent mx-auto mt-5 rounded-full" />
        </div>

        {/* Categories Tab Selector (Glassmorphism Tabs) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const accent = categoryAccents[cat] || categoryAccents["All"];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-full transition-all duration-300 border backdrop-blur-md ${
                  isSelected
                    ? accent.btnActive
                    : "bg-white/5 text-white border-white/20 hover:border-white/40 hover:bg-white/10"
                }`}
              >
                {cat} {cat !== "All" && "Games"}
              </button>
            );
          })}
        </div>

        {/* Games Grid */}
        <LayoutGroup>
          <motion.div 
            layout 
            className={`grid grid-cols-1 ${
              filteredOverviews.length > 1 
                ? "md:grid-cols-2 lg:grid-cols-3 justify-center" 
                : "max-w-xl mx-auto"
            } gap-6 md:gap-8`}
          >
            <AnimatePresence mode="popLayout">
              {filteredOverviews.map((overview) => {
                const accent = categoryAccents[overview.category] || categoryAccents["All"];
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={overview.id}
                    className="bg-white/[0.05] border border-white/[0.1] rounded-[24px] md:rounded-[28px] p-8 shadow-lg transition-all duration-500 group flex flex-col justify-between backdrop-blur-md hover:border-[#FF9800]/50 hover:bg-white/[0.09] hover:-translate-y-2 hover:backdrop-blur-lg hover:shadow-2xl hover:shadow-[0_0_30px_rgba(255,152,0,0.25)]"
                  >
                    <div>
                      {/* Badge / Category Header */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full border bg-[#FF9800]/10 text-[#FF9800] border-[#FF9800]/20">
                          {overview.badge}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-white/40">
                          Curated Guide
                        </span>
                      </div>

                      {/* Accent line that animates on hover */}
                      <div className="h-[2px] w-12 bg-[#FF9800]/50 group-hover:w-20 group-hover:bg-[#FF9800] transition-all duration-500 rounded-full mb-4" />

                      {/* Premium Heading */}
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-[#FF9800]">
                        {overview.heading}
                      </h3>

                      {/* Short Description */}
                      <p className="text-sm text-white/70 leading-relaxed mb-6 font-normal">
                        {overview.desc}
                      </p>

                      {/* "Perfect For" Section */}
                      <div className="mb-6">
                        <p className="text-[10px] uppercase tracking-widest text-[#FF9800] font-bold mb-2.5">Perfect For</p>
                        <div className="flex flex-wrap gap-2">
                          {overview.perfectFor.map((pill, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* "What You'll Experience" Section */}
                      <div className="mb-6">
                        <p className="text-[10px] uppercase tracking-widest text-[#FF9800] font-bold mb-2.5">What You&apos;ll Experience</p>
                        <div className="flex flex-wrap gap-3">
                          {overview.whatYoullExperience.map((chip, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-white/80 font-normal">
                              <Check size={12} className="text-[#FF9800] group-hover:scale-110 transition-transform duration-300" />
                              <span>{chip}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      {/* Experience Indicator Section (Circular Progress Bars) */}
                      <div className="border-t border-white/10 pt-5 mb-6">
                        <p className="text-[10px] uppercase tracking-widest text-[#FF9800] font-bold mb-4">Experience Indicator</p>
                        
                        <div className="grid grid-cols-4 gap-2">
                          {/* 1. Session Length */}
                          <div className="flex flex-col items-center">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r="18" className="stroke-white/5 fill-none" strokeWidth="2.5" />
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="18"
                                  className="stroke-[#FF9800] fill-none transition-all duration-1000"
                                  strokeWidth="2.5"
                                  strokeDasharray={`${2 * Math.PI * 18}`}
                                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - overview.indicators.sessionLength / 100)}`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute text-[9px] font-bold text-white">{overview.indicators.sessionLength}%</span>
                            </div>
                            <span className="text-[8px] uppercase tracking-wider text-white/50 font-bold mt-2 text-center leading-tight">Length</span>
                          </div>

                          {/* 2. Learning Curve */}
                          <div className="flex flex-col items-center">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r="18" className="stroke-white/5 fill-none" strokeWidth="2.5" />
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="18"
                                  className="stroke-[#1E88E5] fill-none transition-all duration-1000"
                                  strokeWidth="2.5"
                                  strokeDasharray={`${2 * Math.PI * 18}`}
                                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - overview.indicators.learningCurve / 100)}`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute text-[9px] font-bold text-white">{overview.indicators.learningCurve}%</span>
                            </div>
                            <span className="text-[8px] uppercase tracking-wider text-white/50 font-bold mt-2 text-center leading-tight">Learning</span>
                          </div>

                          {/* 3. Interaction Level */}
                          <div className="flex flex-col items-center">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r="18" className="stroke-white/5 fill-none" strokeWidth="2.5" />
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="18"
                                  className="stroke-[#F57C00] fill-none transition-all duration-1000"
                                  strokeWidth="2.5"
                                  strokeDasharray={`${2 * Math.PI * 18}`}
                                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - overview.indicators.interactionLevel / 100)}`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute text-[9px] font-bold text-white">{overview.indicators.interactionLevel}%</span>
                            </div>
                            <span className="text-[8px] uppercase tracking-wider text-white/50 font-bold mt-2 text-center leading-tight">Interact</span>
                          </div>

                          {/* 4. Energy Level */}
                          <div className="flex flex-col items-center">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r="18" className="stroke-white/5 fill-none" strokeWidth="2.5" />
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="18"
                                  className="stroke-[#546E7A] fill-none transition-all duration-1000"
                                  strokeWidth="2.5"
                                  strokeDasharray={`${2 * Math.PI * 18}`}
                                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - overview.indicators.energyLevel / 100)}`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute text-[9px] font-bold text-white">{overview.indicators.energyLevel}%</span>
                            </div>
                            <span className="text-[8px] uppercase tracking-wider text-white/50 font-bold mt-2 text-center leading-tight">Energy</span>
                          </div>

                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href="#location"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white hover:text-[#FF9800] transition-colors duration-300 mt-2 border border-white/10 hover:border-[#FF9800]/50 rounded-full px-5 py-2.5 bg-white/5 hover:bg-[#FF9800]/5 group/btn"
                      >
                        Explore This Category <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform duration-300 text-[#FF9800]" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
