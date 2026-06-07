"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  tag: string;
  rating: number;
}

export default function Testimonials() {
  const row1: Testimonial[] = [
    {
      id: 1,
      text: "Best place in Hyderabad for friends and family. The game selection is unmatched!",
      author: "Rahul Krishnan",
      tag: "Verified Board Gamer",
      rating: 5,
    },
    {
      id: 2,
      text: "The Game Masters make every game easy to learn. We played Scythe without reading any manual!",
      author: "Priyanka Reddy",
      tag: "Weekly Member",
      rating: 5,
    },
    {
      id: 3,
      text: "An unforgettable experience every visit. Perfect date night combination of food, cocktails, and games.",
      author: "Aditya & Sneha",
      tag: "Regular Guests",
      rating: 5,
    },
  ];

  const row2: Testimonial[] = [
    {
      id: 4,
      text: "The food is unexpectedly gourmet! The truffle wagyu burger and artisanal pizzas are stellar.",
      author: "Vikram Malhotra",
      tag: "Food Critic & Gamer",
      rating: 5,
    },
    {
      id: 5,
      text: "Soho House meets board gaming. A gorgeous premium social club atmosphere in Jubilee Hills.",
      author: "Neha Sen",
      tag: "Lifestyle Influencer",
      rating: 5,
    },
    {
      id: 6,
      text: "Corporate team building was a huge success. The Game Masters got everyone engaging and laughing.",
      author: "Siddharth Mehta",
      tag: "HR Director, Tech Corp",
      rating: 5,
    },
  ];

  // Double the rows for infinite scroll wrap-around
  const doubledRow1 = [...row1, ...row1, ...row1];
  const doubledRow2 = [...row2, ...row2, ...row2];

  return (
    <section id="reviews" className="py-12 bg-[#E5E0D5] relative overflow-hidden border-t border-[#C7AB94]/40">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-20 px-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8F9B60] font-bold block mb-3">
          Voice of our community
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#3F2B2A]">
          Why People Love Us
        </h2>
        <div className="h-0.5 w-16 bg-[#8F9B60] mx-auto mt-4" />
      </div>

      {/* Marquee 1 (Right to Left) */}
      <div className="relative flex overflow-x-hidden w-full py-4 mb-6">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          className="flex gap-6 flex-shrink-0"
        >
          {doubledRow1.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[350px] md:w-[450px] bg-[#E5E0D5] border border-[#C7AB94]/60 rounded-2xl p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-[#8F9B60]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-current" />
                  ))}
                </div>
                <Quote size={32} className="text-[#C7AB94]/30 mb-2" />
                <p className="font-serif text-lg md:text-xl font-medium text-[#3F2B2A] leading-relaxed mb-6">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>
              <div className="border-t border-[#C7AB94]/30 pt-4 flex flex-col">
                <span className="font-bold text-sm text-[#3F2B2A]">{item.author}</span>
                <span className="text-xs text-[#928A81] mt-0.5">{item.tag}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee 2 (Left to Right) */}
      <div className="relative flex overflow-x-hidden w-full py-4">
        <motion.div
          animate={{ x: [-1000, 0] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          className="flex gap-6 flex-shrink-0"
        >
          {doubledRow2.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[350px] md:w-[450px] bg-[#E5E0D5] border border-[#C7AB94]/60 rounded-2xl p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-[#8F9B60]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-current" />
                  ))}
                </div>
                <Quote size={32} className="text-[#C7AB94]/30 mb-2" />
                <p className="font-serif text-lg md:text-xl font-medium text-[#3F2B2A] leading-relaxed mb-6">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>
              <div className="border-t border-[#C7AB94]/30 pt-4 flex flex-col">
                <span className="font-bold text-sm text-[#3F2B2A]">{item.author}</span>
                <span className="text-xs text-[#928A81] mt-0.5">{item.tag}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
