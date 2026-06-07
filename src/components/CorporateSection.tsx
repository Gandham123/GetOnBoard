"use client";

import { motion } from "framer-motion";
import { Briefcase, Trophy, Users, Shield, Sparkles } from "lucide-react";

interface CorporateSectionProps {
  onOpenBooking: () => void;
}

export default function CorporateSection({ onOpenBooking }: CorporateSectionProps) {
  const events = [
    {
      icon: <Briefcase className="w-6 h-6 text-[#C7AB94]" />,
      title: "Corporate Team Building",
      desc: "Improve communication and foster strategic thinking with game sessions managed by our hosts.",
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#C7AB94]" />,
      title: "Employee Engagement",
      desc: "Reward your teams with fun, collaborative play and premium food and drink pairings.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#C7AB94]" />,
      title: "Private Events & Reunions",
      desc: "Reserve our entire lounge or VIP rooms for birthdays, reunions, and custom milestones.",
    },
    {
      icon: <Users className="w-6 h-6 text-[#C7AB94]" />,
      title: "Creative Workshops",
      desc: "A beautiful space for design sprints, board game design, or corporate workshops.",
    },
  ];

  return (
    <section id="events" className="py-12 bg-gradient-to-br from-[#3F2B2A] to-[#3F2B2A]/90 text-[#E5E0D5] relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#928A81]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Info & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C7AB94] font-bold block">
              Exclusive Gatherings
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
              Host Your Next Event With Us
            </h2>
            <p className="text-sm md:text-base text-[#E5E0D5]/70 leading-relaxed font-light">
              Elevate your corporate culture or private milestones. From team building sessions guided by our Game Masters to exclusive custom cocktail menus, we host Hyderabad&apos;s most memorable group events.
            </p>
            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="bg-[#8F9B60] hover:bg-[#8F9B60]/90 text-white text-xs uppercase tracking-widest font-bold px-8 py-4 rounded-full transition-all duration-300 premium-glow-olive hover:scale-105 active:scale-95"
              >
                Plan Your Event
              </button>
            </div>
          </div>

          {/* Right Column: Grid of Event Types */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((evt, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8F9B60]/20 transition-colors">
                  {evt.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#E5E0D5] mb-2">
                  {evt.title}
                </h3>
                <p className="text-xs text-[#E5E0D5]/65 leading-relaxed font-light">
                  {evt.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
