"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight, Play } from "lucide-react";
import ParticleRain from "./ParticleRain";

interface GalleryItem {
  id: number;
  type: "image" | "video";
  src: string;
  category: "Cafe" | "Games" | "Events" | "Food" | "Celebrities";
  title: string;
}

export default function PinterestGallery() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tabs = ["All", "Images", "Videos"];

  const items: GalleryItem[] = [
    {
      id: 1,
      type: "image",
      src: "/gallery/g1.jpeg",
      category: "Games",
      title: "Board Game Masters & Fun",
    },
    {
      id: 2,
      type: "image",
      src: "/gallery/g2.jpeg",
      category: "Cafe",
      title: "GetOnBoard Premium Lounge",
    },
    {
      id: 3,
      type: "image",
      src: "/gallery/g3.jpeg",
      category: "Events",
      title: "Group Gaming & Outings",
    },
    {
      id: 4,
      type: "image",
      src: "/gallery/g4.jpeg",
      category: "Celebrities",
      title: "Celebrity Gaming Experience",
    },
    {
      id: 5,
      type: "image",
      src: "/gallery/g5.jpeg",
      category: "Food",
      title: "Culinary Delights & Drinks",
    },
    {
      id: 6,
      type: "image",
      src: "/gallery/g6.jpeg",
      category: "Events",
      title: "Corporate Tournament & Celebration",
    },
    {
      id: 7,
      type: "video",
      src: "/gallery/v1.mp4",
      category: "Cafe",
      title: "Inside GetOnBoard Lounge",
    },
    {
      id: 8,
      type: "video",
      src: "/gallery/v2.mp4",
      category: "Games",
      title: "Live Board Gaming Action",
    },
    {
      id: 9,
      type: "video",
      src: "/gallery/v3.mp4",
      category: "Events",
      title: "Game Night Highlights",
    },
    {
      id: 10,
      type: "video",
      src: "/gallery/v4.mp4",
      category: "Games",
      title: "Epic Gaming Moments",
    },
  ];

  const filteredItems = activeTab === "All"
    ? items
    : activeTab === "Images"
      ? items.filter((item) => item.type === "image")
      : items.filter((item) => item.type === "video");

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
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-[#F9FBFF] relative overflow-hidden border-t border-[#E3F2FD]">
      {/* Particle Sprinkler */}
      <ParticleRain count={12} color="rgba(21, 101, 192, 0.12)" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1565C0] font-bold block mb-3">
            Moments & Ambiance
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#0D1B2A]">
            Social Club Gallery
          </h2>
          <p className="text-sm text-[#546E7A] mt-3 font-normal">
            Explore photos and highlights from gaming nights, celebrity visits, food delights, and corporate outings.
          </p>
          <div className="h-0.5 w-16 bg-[#1565C0] mx-auto mt-4 rounded-full" />
        </div>

        {/* Media Type Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setLightboxIndex(null);
              }}
              className={`text-xs uppercase tracking-widest font-bold px-5 py-3 rounded-full transition-all border ${activeTab === tab
                  ? "bg-[#1565C0] text-white border-[#1565C0] shadow-md shadow-[#1565C0]/10"
                  : "bg-white text-[#546E7A] border-[#E3F2FD] hover:border-[#1565C0] hover:text-[#1565C0] shadow-sm"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Responsive Grid Gallery */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="relative overflow-hidden rounded-2xl border border-[#E3F2FD] shadow-sm cursor-pointer group aspect-[4/3] hover:shadow-xl hover:shadow-[#1565C0]/8 hover:border-[#1565C0]/40 transition-all duration-300 bg-[#f0f5fa]"
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}

                {/* Video Badge Icon */}
                {item.type === "video" && (
                  <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20 shadow-md">
                    <Play size={10} className="fill-white text-white" />
                    <span>VIDEO</span>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#0D1B2A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="bg-white/95 p-3.5 rounded-full shadow-lg text-[#1565C0] flex items-center justify-center">
                    {item.type === "video" ? <Play size={20} className="fill-[#1565C0]" /> : <ZoomIn size={20} />}
                  </div>
                </div>


              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
              className="absolute inset-0 bg-[#0D1B2A]/90 backdrop-blur-md"
            />

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full h-[75vh] flex flex-col justify-between z-10 text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="self-end p-2.5 bg-[#0D1B2A]/80 border border-white/10 rounded-full backdrop-blur-sm hover:text-[#FF9800] transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Image / Video Container with Nav buttons */}
              <div className="relative flex-grow my-1 flex items-center justify-center">
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:-left-12 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-colors border border-white/20 z-20"
                  aria-label="Previous item"
                >
                  <ChevronLeft size={24} />
                </button>

                {filteredItems[lightboxIndex].type === "video" ? (
                  <div className="relative w-full h-full max-h-[60vh] flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                    <video
                      key={filteredItems[lightboxIndex].src}
                      src={filteredItems[lightboxIndex].src}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="max-w-full max-h-[60vh] object-contain rounded-2xl"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full max-h-[60vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                      src={filteredItems[lightboxIndex].src}
                      alt={filteredItems[lightboxIndex].title}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className="absolute right-2 md:-right-12 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-colors border border-white/20 z-20"
                  aria-label="Next item"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Image / Video Counter */}
              <div className="text-center text-xs text-white/60 font-semibold">
                {lightboxIndex + 1} of {filteredItems.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
