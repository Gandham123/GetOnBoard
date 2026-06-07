"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Users, Clock, Flame } from "lucide-react";

interface Game {
  id: number;
  title: string;
  category: string;
  players: string;
  time: string;
  complexity: "Easy" | "Medium" | "Hard" | "Expert";
  desc: string;
}

export default function GameExplorer() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Strategy",
    "Party",
    "Family",
    "Card",
    "Adventure",
  ];

  const gamesList: Game[] = [
    {
      id: 1,
      title: "Scythe",
      category: "Strategy",
      players: "1-5 Players",
      time: "90-115 Min",
      complexity: "Hard",
      desc: "An alternate-history 1920s engine-building game of farming, war, and giant mechs.",
    },
    {
      id: 2,
      title: "Codenames",
      category: "Party",
      players: "2-8 Players",
      time: "15-20 Min",
      complexity: "Easy",
      desc: "Give one-word clues to help your team identify their secret agents first.",
    },
    {
      id: 3,
      title: "Azul",
      category: "Family",
      players: "2-4 Players",
      time: "30-45 Min",
      complexity: "Easy",
      desc: "A beautiful draft game where players compete to build the most gorgeous mosaic wall.",
    },
    {
      id: 4,
      title: "Monopoly Deal",
      category: "Card",
      players: "2-5 Players",
      time: "15 Min",
      complexity: "Easy",
      desc: "Fast-paced property trading card game. Steal properties, collect rent, make deals.",
    },
    {
      id: 5,
      title: "Pandemic Legacy",
      category: "Adventure",
      players: "2-4 Players",
      time: "60 Min",
      complexity: "Medium",
      desc: "Cooperative campaign game where your decisions carry over across multiple game months.",
    },
    {
      id: 6,
      title: "Terraforming Mars",
      category: "Strategy",
      players: "1-5 Players",
      time: "120-150 Min",
      complexity: "Expert",
      desc: "Run giant corporations and coordinate oxygen, heat, and water to make Mars habitable.",
    },
    {
      id: 7,
      title: "Secret Hitler",
      category: "Party",
      players: "5-10 Players",
      time: "45 Min",
      complexity: "Medium",
      desc: "A dramatic social deduction game of political intrigue, distrust, and hidden factions.",
    },
    {
      id: 8,
      title: "Wingspan",
      category: "Strategy",
      players: "1-5 Players",
      time: "40-70 Min",
      complexity: "Medium",
      desc: "An award-winning card-driven engine building game about attracting diverse birds to your sanctuary.",
    },
    {
      id: 9,
      title: "Gloomhaven: Jaws of the Lion",
      category: "Adventure",
      players: "1-4 Players",
      time: "60-90 Min",
      complexity: "Hard",
      desc: "Immersive tactical campaign battles in a deep, fantasy-narrative adventure world.",
    },
  ];

  const filteredGames = activeCategory === "All"
    ? gamesList
    : gamesList.filter((game) => game.category === activeCategory);

  return (
    <section id="games" className="py-12 bg-[#3F2B2A] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C7AB94] font-bold block mb-3">
            Explore 1200+ Titles
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#E5E0D5]">
            Curated Game Library
          </h2>
          <p className="text-sm text-[#E5E0D5]/70 mt-3">
            From quick party games to epic heavy strategy campaigns, our Game Masters will set up the perfect match.
          </p>
          <div className="h-0.5 w-16 bg-[#8F9B60] mx-auto mt-4" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-full transition-all border ${activeCategory === cat
                ? "bg-[#E5E0D5] text-[#3F2B2A] border-[#E5E0D5] shadow-md"
                : "bg-transparent text-[#E5E0D5]/70 border-white/10 hover:border-[#E5E0D5]"
                }`}
            >
              {cat} {cat !== "All" && "Games"}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between hover:border-[#8F9B60] hover:-translate-y-1"
            >
              <div>
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#8F9B60]/10 text-[#8F9B60] border border-[#8F9B60]/20">
                    {game.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#928A81]">
                    ID: GOB-{1000 + game.id}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="font-serif text-2xl font-bold text-[#E5E0D5] mb-2 group-hover:text-[#8F9B60] transition-colors">
                  {game.title}
                </h3>
                <p className="text-sm text-[#E5E0D5]/80 leading-relaxed mb-6 font-light">
                  {game.desc}
                </p>
              </div>

              {/* Metadata Bar */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold text-[#928A81]">
                <span className="flex items-center gap-1">
                  <Users size={14} /> {game.players}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {game.time}
                </span>
                <span className="flex items-center gap-1">
                  <Flame size={14} /> Complexity: {game.complexity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
