"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Film,
} from "lucide-react";

/* ─────────────────────── data ─────────────────────── */

interface MediaVideo {
  id: number;
  src: string;
  title: string;
  label: string;
}

/**
 * Add new videos here — the carousel auto-adapts.
 * Put the mp4 files in  public/media/  and reference them as "/media/filename.mp4".
 */
const mediaVideos: MediaVideo[] = [
  {
    id: 1,
    src: "/media/v1.mp4",
    title: "Behind the Scenes",
    label: "Exclusive Look",
  },
  {
    id: 2,
    src: "/media/v2.mp4",
    title: "Our Community",
    label: "Member Spotlight",
  },
  {
    id: 3,
    src: "/media/v3.mp4",
    title: "Event Highlights",
    label: "Live Moments",
  },
];

/* ─────────── individual video card ─────────── */

function MediaVideoCard({
  video,
  onClick,
}: {
  video: MediaVideo;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isHovered) {
      el.muted = true;
      el.play().catch(() => { });
    } else {
      el.pause();
      el.currentTime = 0.5;
    }
  }, [isHovered]);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative aspect-[16/16] bg-slate-950 rounded-2xl overflow-hidden border border-black/10 shadow-lg hover:shadow-2xl hover:shadow-[#1565C0]/25 transition-all duration-300 group cursor-pointer"
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={`${video.src}#t=0.5`}
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Gradient overlay — play icon only, no text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-center justify-center">
        <div className="bg-white/10 group-hover:bg-[#1565C0]/20 border border-white/20 group-hover:border-[#1565C0]/40 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-lg scale-90 group-hover:scale-100">
          <Play className="w-6 h-6 text-white group-hover:text-[#1565C0] fill-white group-hover:fill-[#1565C0] transition-colors translate-x-[2px]" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────── main section ─────────── */

export default function MediaSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  /* responsive visible count */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* keyboard nav for lightbox */
  const goPrev = useCallback(
    () =>
      setSelectedIndex((p) =>
        p === null ? null : p === 0 ? mediaVideos.length - 1 : p - 1
      ),
    []
  );
  const goNext = useCallback(
    () =>
      setSelectedIndex((p) =>
        p === null ? null : p === mediaVideos.length - 1 ? 0 : p + 1
      ),
    []
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, goPrev, goNext]);

  /* sync mute */
  useEffect(() => {
    if (modalVideoRef.current) modalVideoRef.current.muted = isMuted;
  }, [isMuted, selectedIndex]);

  /* carousel slide helpers */
  const maxSlide = Math.max(0, mediaVideos.length - visibleCount);
  const prevSlide = () => setCurrentSlide((p) => Math.max(0, p - 1));
  const nextSlide = () => setCurrentSlide((p) => Math.min(maxSlide, p + 1));

  return (
    <section
      id="media"
      className="py-24 relative overflow-hidden"
      style={{ background: "#faf6f0" }}
    >
      {/* Decorative blur spheres */}
      <div className="absolute top-1/3 right-[-8%] w-[400px] h-[400px] bg-[#1565C0]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-8%] w-[350px] h-[350px] bg-[#FF9800]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* ─── Header ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            {/* <span className="text-xs uppercase tracking-[0.25em] text-[#1565C0] font-bold block mb-3">
              <Film className="inline w-4 h-4 mr-1 -mt-0.5" />
              Media Gallery
            </span> */}
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#0D1B2A]">
              Even Media Love&apos;s Us
            </h2>
            <div className="h-0.5 w-16 bg-[#1565C0] mt-4" />
          </div>

          {/* Carousel arrows (only when there are more cards than visible) */}
          {mediaVideos.length > visibleCount && (
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`p-3.5 rounded-full border transition-all duration-300 ${currentSlide === 0
                  ? "border-black/10 text-black/30 cursor-not-allowed"
                  : "border-black/20 text-[#0D1B2A] hover:bg-black/5 hover:border-[#1565C0]"
                  }`}
                aria-label="Previous Media"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide >= maxSlide}
                className={`p-3.5 rounded-full border transition-all duration-300 ${currentSlide >= maxSlide
                  ? "border-black/10 text-black/30 cursor-not-allowed"
                  : "border-black/20 text-[#0D1B2A] hover:bg-black/5 hover:border-[#1565C0]"
                  }`}
                aria-label="Next Media"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          )}
        </div>

        {/* ─── Carousel ─── */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-6"
            animate={{
              x: `calc(-${(currentSlide * 100) / visibleCount}% - ${(currentSlide * 24) / visibleCount
                }px)`,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            {mediaVideos.map((video, idx) => (
              <div
                key={video.id}
                style={{
                  width: `calc(${100 / visibleCount}% - ${(24 * (visibleCount - 1)) / visibleCount
                    }px)`,
                }}
                className="flex-shrink-0"
              >
                <MediaVideoCard
                  video={video}
                  onClick={() => setSelectedIndex(idx)}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ─── Fullscreen Lightbox ─── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
          >
            {/* Top bar */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
                aria-label={isMuted ? "Unmute Video" : "Mute Video"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <button
                onClick={() => setSelectedIndex(null)}
                className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Left arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 md:left-8 z-40 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
              aria-label="Previous Video"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 md:right-8 z-40 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#1565C0]"
              aria-label="Next Video"
            >
              <ChevronRight size={24} />
            </button>

            {/* Video box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[450px] aspect-[9/16] max-h-[85vh] rounded-2xl border border-white/10 overflow-hidden bg-black shadow-2xl flex flex-col justify-end"
            >
              <video
                key={mediaVideos[selectedIndex].id}
                ref={modalVideoRef}
                src={mediaVideos[selectedIndex].src}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Overlay info */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-5 pt-8 pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#1565C0]">
                  {mediaVideos[selectedIndex].label}
                </span>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                  {mediaVideos[selectedIndex].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
