"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

interface VideoReview {
  id: number;
  src: string;
  title: string;
  celebrity: string;
  role: string;
}

const videoReviews: VideoReview[] = [
  {
    id: 1,
    src: "/assets/v1.mp4",
    title: "Unmatched Vibe & Board Games",
    celebrity: "Niharika",
    role: "Tollywood Actor"
  },
  {
    id: 2,
    src: "/assets/v2.mp4",
    title: "Best Food & Gaming Spot",
    celebrity: "Suhas",
    role: "Tollywood Actor"
  },
  {
    id: 3,
    src: "/assets/v3.mp4",
    title: "My Favorite Weekend Hangout",
    celebrity: "Mahendran",
    role: "Tollywood Actress"
  },
  {
    id: 4,
    src: "/assets/v4.mp4",
    title: "Amazing Concept Cafe",
    celebrity: "Kushan",
    role: "Tollywood Actress"
  },
  {
    id: 5,
    src: "/assets/v5.mp4",
    title: "Incredible Ambiance",
    celebrity: "Adivi Sesh",
    role: "Tollywood Actor & Writer"
  },
  {
    id: 6,
    src: "/assets/v6.mp4",
    title: "Perfect Place for Game Night",
    celebrity: "Nani",
    role: "Tollywood Star"
  },
  {
    id: 7,
    src: "/assets/v7.mp4",
    title: "Gourmet Food Meets Board Games",
    celebrity: "Tilak Varma",
    role: "Indian Cricketer"
  },
  {
    id: 8,
    src: "/assets/v8.mp4",
    title: "Premium Social Club Review",
    celebrity: "Sushanth",
    role: "Tollywood Actor"
  }
];

// Individual Video Card Component to manage its own hover-play logic
function VideoCard({
  video,
  onClick
}: {
  video: VideoReview;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isHovered) {
      // Play silently on hover
      videoEl.muted = true;
      videoEl.play().catch(() => { });
    } else {
      // Pause and reset when hover leaves (to 0.5s to keep the thumbnail visible)
      videoEl.pause();
      videoEl.currentTime = 0.5;
    }
  }, [isHovered]);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-[#FF9800]/25 transition-all duration-300 group cursor-pointer"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={`${video.src}#t=0.5`}
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Dark overlay for readable text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5">

        {/* Play Button Icon wrapper */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 group-hover:bg-[#FF9800]/20 border border-white/20 group-hover:border-[#FF9800]/40 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-lg scale-90 group-hover:scale-100">
          <Play className="w-6 h-6 text-white group-hover:text-[#FF9800] fill-white group-hover:fill-[#FF9800] transition-colors translate-x-[2px]" />
        </div>

        {/* Text Details */}
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#FF9800]">
          {video.role}
        </span>
        <h4 className="text-base font-bold text-white mt-1 group-hover:text-[#FF9800] transition-colors leading-tight">
          {video.celebrity}
        </h4>
        <p className="text-xs text-white/70 mt-1 line-clamp-2">
          {video.title}
        </p>
      </div>
    </motion.div>
  );
}

export default function CelebrityReviews() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Responsive items count based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation for Lightbox Modal
  useEffect(() => {
    if (selectedVideoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideoIndex(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevVideo();
      } else if (e.key === "ArrowRight") {
        handleNextVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVideoIndex]);

  const handlePrevVideo = () => {
    setSelectedVideoIndex((prev) =>
      prev === null ? null : prev === 0 ? videoReviews.length - 1 : prev - 1
    );
  };

  const handleNextVideo = () => {
    setSelectedVideoIndex((prev) =>
      prev === null ? null : prev === videoReviews.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prev) => Math.min(videoReviews.length - visibleCount, prev + 1));
  };

  // Sync mute state to the lightbox video
  useEffect(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = isMuted;
    }
  }, [isMuted, selectedVideoIndex]);

  return (
    <section
      id="celebrity-reviews"
      className="py-24 text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #111827 0%, #030712 100%)",
      }}
    >
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-[-10%] w-[350px] h-[350px] bg-[#FF9800]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[350px] h-[350px] bg-[#1E88E5]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF9800] font-bold block mb-3">
              VIP Experiences
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">
              Celebrity Video Reviews
            </h2>
            <div className="h-0.5 w-16 bg-[#FF9800] mt-4" />
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevSlide}
              disabled={currentIndex === 0}
              className={`p-3.5 rounded-full border transition-all duration-300 ${currentIndex === 0
                ? "border-white/10 text-white/30 cursor-not-allowed"
                : "border-white/20 text-white hover:bg-white/10 hover:border-[#FF9800]"
                }`}
              aria-label="Previous Reviews"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={handleNextSlide}
              disabled={currentIndex >= videoReviews.length - visibleCount}
              className={`p-3.5 rounded-full border transition-all duration-300 ${currentIndex >= videoReviews.length - visibleCount
                ? "border-white/10 text-white/30 cursor-not-allowed"
                : "border-white/20 text-white hover:bg-white/10 hover:border-[#FF9800]"
                }`}
              aria-label="Next Reviews"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-6"
            animate={{
              x: `calc(-${(currentIndex * 100) / visibleCount}% - ${(currentIndex * 24) / visibleCount}px)`
            }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            {videoReviews.map((video, idx) => (
              <div
                key={video.id}
                style={{
                  width: `calc(${100 / visibleCount}% - ${(24 * (visibleCount - 1)) / visibleCount}px)`,
                }}
                className="flex-shrink-0"
              >
                <VideoCard
                  video={video}
                  onClick={() => setSelectedVideoIndex(idx)}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Video Theater Lightbox Modal */}
      <AnimatePresence>
        {selectedVideoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideoIndex(null)}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Bar (Close and Mute Buttons) */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
              {/* Mute Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                aria-label={isMuted ? "Unmute Video" : "Mute Video"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedVideoIndex(null)}
                className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                aria-label="Close Theater Modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Left Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevVideo();
              }}
              className="absolute left-4 md:left-8 z-40 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
              aria-label="Previous Video"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextVideo();
              }}
              className="absolute right-4 md:right-8 z-40 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
              aria-label="Next Video"
            >
              <ChevronRight size={24} />
            </button>

            {/* Video Theater Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[450px] aspect-[9/16] max-h-[85vh] rounded-2xl border border-white/10 overflow-hidden bg-black shadow-2xl flex flex-col justify-end"
            >
              {/* Theater Video Player */}
              <video
                key={videoReviews[selectedVideoIndex].id}
                ref={modalVideoRef}
                src={videoReviews[selectedVideoIndex].src}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Minimal overlay description */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-5 pt-8 pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#FF9800]">
                  {videoReviews[selectedVideoIndex].role}
                </span>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                  {videoReviews[selectedVideoIndex].celebrity}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
