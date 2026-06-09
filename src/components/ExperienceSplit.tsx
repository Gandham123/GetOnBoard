"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UserCheck, Heart, Award, Gift, Compass } from "lucide-react";
import ParticleRain from "./ParticleRain";

export default function ExperienceSplit() {
  const features = [
    {
      icon: <UserCheck className="w-5 h-5 text-teal-600" />,
      title: "Game Masters",
      desc: "Our friendly experts explain any game's setup and rules, getting you playing in under 5 minutes.",
    },
    {
      icon: <Compass className="w-5 h-5 text-teal-600" />,
      title: "Beginner Friendly",
      desc: "No prior tabletop experience needed. We match games to your group's size and play style.",
    },
    {
      icon: <Heart className="w-5 h-5 text-teal-600" />,
      title: "Family Friendly & Date Nights",
      desc: "Warm ambient lighting, delicious food pairings, and social games for all age groups.",
    },
    {
      icon: <Award className="w-5 h-5 text-teal-600" />,
      title: "Team Bonding & Corporate Events",
      desc: "Break organizational silos and build genuine human connection through collaborative problem-solving.",
    },
    {
      icon: <Gift className="w-5 h-5 text-teal-600" />,
      title: "Birthday Celebrations",
      desc: "Unforgettable birthdays with customized packages, food menus, and competitive tournaments.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="experience" className="py-16 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9] relative overflow-hidden">
      {/* Particle Sprinkler */}
      <ParticleRain count={12} color="rgba(20, 184, 166, 0.12)" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Column: Immersive Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="lg:col-span-6 relative h-[450px] md:h-[600px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-2xl"
          >
            <Image
              src="/assets/experience_gm2.png"
              alt="Get On Board Cafe Experience"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Soft decorative shadow gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
          </motion.div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-teal-600 font-bold block">
                More Than A Cafe
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                This is not just a cafe. It&apos;s an experience.
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                Step into a premium, custom-curated social club where board gaming is treated as an art. Our focus is on high-end hospitality, connection, and creating memories.
              </p>
            </div>

            {/* Features list with stagger */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex gap-4 items-start"
                >
                  <div className="bg-teal-50 border border-teal-500/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-slate-800">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
