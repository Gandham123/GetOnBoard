"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CelebrityMasonry() {
  const items = [
    {
      id: 1,
      image: "/assets/celebrity_visit.png",
      title: "Tollywood Stars Game Night",
      subtitle: "Actors and Creators enjoying heavy strategy games in our VIP lounge.",
      colSpan: "md:col-span-2",
      height: "h-[350px] md:h-[450px]",
    },
    {
      id: 2,
      image: "/assets/hero_bg.png",
      title: "National Cricket Team Members",
      subtitle: "A tense session of Catan between training matches.",
      colSpan: "md:col-span-1",
      height: "h-[350px] md:h-[450px]",
    },
    {
      id: 3,
      image: "/assets/experience_gm.png",
      title: "Leading Content Creators Meetup",
      subtitle: "Playing Codenames and enjoying mocktails at our flagship event.",
      colSpan: "md:col-span-1",
      height: "h-[300px] md:h-[400px]",
    },
    {
      id: 4,
      image: "/assets/food_drink.png",
      title: "Luxury Lifestyle Influencers",
      subtitle: "Snapping social posts with our premium handcrafted food and drink layouts.",
      colSpan: "md:col-span-2",
      height: "h-[300px] md:h-[400px]",
    },
  ];

  return (
    <section id="celebrities" className="py-12 bg-[#3F2B2A] text-[#E5E0D5] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8F9B60]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C7AB94]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.25em] text-[#C7AB94] font-bold mb-3"
          >
            A Celebrity Hangout
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#E5E0D5]"
          >
            Loved By Celebrities
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-0.5 bg-[#8F9B60] mx-auto mt-4"
          />
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${item.colSpan} ${item.height}`}
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Tint Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3F2B2A] via-[#3F2B2A]/30 to-transparent opacity-90 transition-opacity duration-300" />

              {/* Text / Glass Card Overlay */}
              <div className="absolute inset-x-6 bottom-6 flex flex-col justify-end">
                <div className="glass-panel-dark p-6 rounded-xl border border-white/5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-[#8F9B60] font-bold block mb-1">
                    Visited Get On Board
                  </span>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-[#E5E0D5] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#E5E0D5]/70 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
