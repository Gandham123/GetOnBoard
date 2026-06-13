"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Star, MessageSquare, Heart } from "lucide-react";
import ParticleRain from "./ParticleRain";

interface CounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

function Counter({ value, suffix = "", decimals = 0, duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalMiliseconds = duration * 1000;
    const incrementTime = 30; // ms
    const totalSteps = totalMiliseconds / incrementTime;
    const stepValue = (end - start) / totalSteps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const nextCount = start + stepValue * currentStep;

      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(nextCount);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className="font-serif">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const stats = [
    {
      id: 1,
      icon: <BookOpen className="text-[#1565C0] w-6 h-6" />,
      label: "Premium Board Games",
      element: <Counter value={1200} suffix="+" />,
      desc: "From family-classics to heavy strategic imports",
    },
    {
      id: 2,
      icon: <MessageSquare className="text-[#1565C0] w-6 h-6" />,
      label: "Google Reviews",
      element: <Counter value={3500} suffix="+" />,
      desc: "Consistently rated by Hyderabad gamers",
    },
    {
      id: 3,
      icon: <Star className="text-[#F57C00] w-6 h-6" />,
      label: "Average Rating",
      element: <Counter value={4.7} decimals={1} />,
      desc: "High-end customer service & hospitality",
    },
    {
      id: 4,
      icon: <Heart className="text-[#F57C00] w-6 h-6" />,
      label: "Happy Players",
      element: <span className="font-serif">10K+</span>,
      desc: "Bonding, laughter, and unforgettable moments",
    },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Particle Sprinkler */}
      <ParticleRain count={12} color="rgba(21, 101, 192, 0.12)" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={stat.id}
              className="bg-white/80 border border-[#E3F2FD] backdrop-blur-md hover:border-[#1565C0]/40 rounded-2xl p-8 shadow-sm transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-[#E3F2FD] w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1565C0]/20 transition-colors">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold font-serif text-[#0D1B2A] mb-2">
                {stat.element}
              </div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#546E7A] mb-2">
                {stat.label}
              </h4>
              <p className="text-sm text-[#546E7A] leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
