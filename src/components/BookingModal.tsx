"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Clock, Flame, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    experience: "Casual Gaming",
    name: "",
    phone: "",
  });

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#1565C0", "#1E88E5", "#FF9800", "#F57C00", "#546E7A", "#FFFFFF"],
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      triggerConfetti();
      setStep(4);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-brand-cream border border-brand-beige/50 p-8 shadow-2xl z-10 text-brand-dark"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-brand-dark/60 hover:text-brand-dark hover:bg-brand-beige/25 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Stepper Progress Indicator */}
          {step <= 3 && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand-brown mb-2">
                <span>Step {step} of 3</span>
                <span>
                  {step === 1 ? "Details" : step === 2 ? "Preferences" : "Contact"}
                </span>
              </div>
              <div className="h-1.5 w-full bg-brand-beige/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-olive"
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Steps */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="font-serif text-2xl mb-1 text-brand-dark">Reserve Your Gaming Lounge</h3>
                  <p className="text-sm text-brand-brown">Select your date, guest count, and preferred time slot.</p>
                </div>

                {/* Date Input */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-brown flex items-center gap-1.5">
                    <Calendar size={14} /> Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full bg-transparent border border-brand-beige/70 focus:border-brand-olive rounded-lg p-3 outline-none transition-colors text-sm"
                    required
                  />
                </div>

                {/* Guests and Time Split */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-brand-brown flex items-center gap-1.5">
                      <Users size={14} /> Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => handleInputChange("guests", e.target.value)}
                      className="w-full bg-transparent border border-brand-beige/70 focus:border-brand-olive rounded-lg p-3 outline-none transition-colors text-sm appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((g) => (
                        <option key={g} value={g} className="bg-brand-cream">
                          {g} {g === 1 ? "Person" : "People"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-brand-brown flex items-center gap-1.5">
                      <Clock size={14} /> Time Slot
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      className="w-full bg-transparent border border-brand-beige/70 focus:border-brand-olive rounded-lg p-3 outline-none transition-colors text-sm"
                    >
                      <option value="" className="bg-brand-cream">Select slot</option>
                      <option value="12:00 PM - 03:00 PM" className="bg-brand-cream">12:00 PM - 03:00 PM</option>
                      <option value="03:00 PM - 06:00 PM" className="bg-brand-cream">03:00 PM - 06:00 PM</option>
                      <option value="06:00 PM - 09:00 PM" className="bg-brand-cream">06:00 PM - 09:00 PM</option>
                      <option value="09:00 PM - 12:00 AM" className="bg-brand-cream">09:00 PM - 12:00 AM</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="font-serif text-2xl mb-1 text-brand-dark">Select Experience Level</h3>
                  <p className="text-sm text-brand-brown">This helps our Game Masters curate and pre-set your table.</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: "Casual Gaming", desc: "Classic party, family, and light social card games.", lvl: "Easy" },
                    { name: "Strategy & Tactics", desc: "Mid-weight Eurogames and strategic combat games.", lvl: "Medium" },
                    { name: "Heavy Campaign", desc: "Complex engine building, role-playing, and cooperative campaigns.", lvl: "Expert" }
                  ].map((exp) => (
                    <button
                      key={exp.name}
                      type="button"
                      onClick={() => handleInputChange("experience", exp.name)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        formData.experience === exp.name
                          ? "border-brand-olive bg-brand-olive/10 premium-glow-olive"
                          : "border-brand-beige/50 bg-brand-beige/5 hover:border-brand-brown"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-brand-dark">{exp.name}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-brand-beige/40 text-brand-dark">
                          {exp.lvl}
                        </span>
                      </div>
                      <p className="text-xs text-brand-brown leading-relaxed">{exp.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="font-serif text-2xl mb-1 text-brand-dark">Contact Information</h3>
                  <p className="text-sm text-brand-brown">Enter details to secure your reservation code.</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-brand-brown">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Satya Bhaskar"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full bg-transparent border border-brand-beige/70 focus:border-brand-olive rounded-lg p-3 outline-none transition-colors text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-brand-brown">Contact Phone</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full bg-transparent border border-brand-beige/70 focus:border-brand-olive rounded-lg p-3 outline-none transition-colors text-sm"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="flex justify-center text-brand-olive">
                  <CheckCircle size={64} className="animate-bounce" />
                </div>
                <div>
                  <h3 className="font-serif text-3xl text-brand-dark">Table Reserved!</h3>
                  <p className="text-sm text-brand-brown mt-1">
                    Your spot is locked at our Jubilee Hills Club.
                  </p>
                </div>

                <div className="bg-brand-beige/20 border border-brand-beige/50 rounded-xl p-4 text-left max-w-sm mx-auto space-y-2 text-xs">
                  <div className="flex justify-between border-b border-brand-beige/35 pb-2">
                    <span className="font-semibold text-brand-brown">Booking Ref:</span>
                    <span className="font-mono font-bold uppercase text-brand-dark">GOB-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-brand-brown">Date & Time:</span>
                    <span className="text-brand-dark">{formData.date || "Tomorrow"} | {formData.time || "06:00 PM"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-brand-brown">Guests & Playstyle:</span>
                    <span className="text-brand-dark">{formData.guests} Guests | {formData.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-brand-brown">Reserved For:</span>
                    <span className="text-brand-dark">{formData.name || "Guest"} ({formData.phone || "+91 XXXXX"})</span>
                  </div>
                </div>

                <p className="text-[10px] text-brand-brown italic">
                  *Our Game Masters will reach out 2 hours before your slot to finalize custom board setups.
                </p>

                <button
                  onClick={onClose}
                  className="w-full bg-brand-dark hover:bg-brand-dark/95 text-white font-medium py-3 rounded-lg text-sm transition-colors mt-2"
                >
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          {step <= 3 && (
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-brand-beige/35">
              <button
                onClick={handlePrev}
                disabled={step === 1}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  step === 1 ? "opacity-0 pointer-events-none" : "text-brand-brown hover:text-brand-dark"
                }`}
              >
                <ArrowLeft size={16} /> Back
              </button>

              <button
                onClick={handleNext}
                disabled={step === 1 ? !formData.date || !formData.time : step === 3 ? !formData.name || !formData.phone : false}
                className="flex items-center gap-1.5 bg-brand-dark hover:bg-brand-dark/90 text-brand-cream disabled:opacity-40 disabled:hover:bg-brand-dark px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                {step === 3 ? "Book Table" : "Continue"} <ArrowRight size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
