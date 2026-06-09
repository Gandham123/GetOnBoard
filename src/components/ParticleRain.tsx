"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ParticleRainProps {
  count?: number;
  color?: string;
}

export default function ParticleRain({ count = 15, color = "rgba(20, 184, 166, 0.3)" }: ParticleRainProps) {
  const [particles, setParticles] = useState<{ id: number; size: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate particles on client side to avoid Next.js hydration mismatches
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: "-5%",
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
          }}
          animate={{
            y: ["0vh", "100vh"],
            x: ["0px", `${(Math.random() - 0.5) * 60}px`],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
