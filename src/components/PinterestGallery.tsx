"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import ParticleRain from "./ParticleRain";

interface GalleryItem {
  id: number;
  image: string;
  category: "Cafe" | "Games" | "Events" | "Food" | "Celebrities";
  title: string;
  aspect: string;
}

export default function PinterestGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Cafe", "Games", "Events", "Food", "Celebrities"];

  const items: GalleryItem[] = [
    {
      id: 1,
      image: "/assets/hero_bg.png",
      category: "Cafe",
      title: "Main Lounge Gaming Area",
      aspect: "aspect-[4/3] md:aspect-[3/4]",
    },
    {
      id: 2,
      image: "/assets/experience_gm.png",
      category: "Games",
      title: "Game Master Strategy Session",
      aspect: "aspect-square",
    },
    {
      id: 3,
      image: "/assets/celebrity_visit.png",
      category: "Celebrities",
      title: "Tollywood Celebrities Night",
      aspect: "aspect-[4/3] md:aspect-[16/9]",
    },
    {
      id: 4,
      image: "/assets/food_burger.png",
      category: "Food",
      title: "Signature GOB Wagyu Burger",
      aspect: "aspect-[4/5] md:aspect-square",
    },
    {
      id: 5,
      image: "/assets/food_pizza.png",
      category: "Food",
      title: "Artisanal Wood-Fired Pizza",
      aspect: "aspect-square md:aspect-[4/3]",
    },
    {
      id: 6,
      image: "/assets/food_drink.png",
      category: "Food",
      title: "Smoked Rosemary Amber Tonic",
      aspect: "aspect-[4/3] md:aspect-[3/4]",
    },
    {
      id: 7,
      image: "/assets/experience_gm.png",
      category: "Events",
      title: "Corporate Engagement Tournament",
      aspect: "aspect-[16/9] md:aspect-square",
    },
  ];

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
      if (e.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
      if (e.key === "Escape") setLightboxIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-16 bg-gradient-to-b from-[#FFFFFF] to-[#F1F5F9] relative overflow-hidden border-t border-slate-200/50">
      {/* Particle Sprinkler */}
      <ParticleRain count={12} color="rgba(20, 184, 166, 0.12)" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-teal-600 font-bold block mb-3">
            Moments & Ambiance
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Social Club Gallery
          </h2>
          <div className="h-0.5 w-16 bg-teal-500 mx-auto mt-4" />
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={`text-xs uppercase tracking-widest font-bold px-5 py-3 rounded-full transition-all border ${
                activeCategory === cat
                  ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-500/10"
                  : "bg-white text-slate-700 border-slate-200 hover:border-teal-500 hover:text-teal-600 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pinterest-Style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className={`relative overflow-hidden rounded-2xl border border-slate-200/50 shadow-sm cursor-pointer group break-inside-avoid ${item.aspect} hover:shadow-lg hover:border-teal-500/40 transition-all duration-300`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/95 p-3 rounded-full shadow-lg text-teal-600">
                  <ZoomIn size={20} />
                </div>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] uppercase tracking-widest text-teal-300 font-bold">
                  {item.category}
                </span>
                <h4 className="font-serif text-sm font-semibold mt-1">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full h-[70vh] flex flex-col justify-between z-10 text-white"
            >
              {/* Top Bar */}
              <div className="flex justify-between items-center px-6 py-2.5 bg-slate-900/60 border border-slate-800 rounded-full backdrop-blur-sm self-center">
                <span className="text-xs uppercase tracking-widest text-slate-300 font-bold">
                  {filteredItems[lightboxIndex].title} ({filteredItems[lightboxIndex].category})
                </span>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-1 hover:text-teal-400 transition-colors ml-6"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Image Container with Nav buttons */}
              <div className="relative flex-grow my-4 flex items-center justify-center">
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:-left-12 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-sm transition-colors border border-white/10 z-20"
                >
                  <ChevronLeft size={24} />
                </button>

                <div className="relative w-full h-full max-h-[55vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src={filteredItems[lightboxIndex].image}
                    alt={filteredItems[lightboxIndex].title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>

                <button
                  onClick={handleNext}
                  className="absolute right-2 md:-right-12 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-sm transition-colors border border-white/10 z-20"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Image Counter */}
              <div className="text-center text-xs text-slate-400 font-semibold">
                {lightboxIndex + 1} of {filteredItems.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
