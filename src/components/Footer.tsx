"use client";

import { useState } from "react";
import { Sparkles, Instagram, Facebook, Twitter, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#3F2B2A] text-[#E5E0D5] border-t border-white/5 pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-8 border-b border-white/5">

        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-4">
          <a href="#" className="flex items-center gap-2">
            <img src="/assets/Logo.png" alt="Get On Board Logo" className="h-12 w-auto" />
          </a>
          <p className="text-sm text-[#E5E0D5]/70 leading-relaxed font-light">
            Hyderabad&apos;s premium board gaming lounge and social club. We bring people together over gourmet food, custom mocktails, and a library of 1200+ tabletop titles.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#8F9B60] transition-colors hover:text-white"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#8F9B60] transition-colors hover:text-white"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/5 hover:bg-[#8F9B60] transition-colors hover:text-white"
            >
              <Twitter size={16} />
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-bold text-[#C7AB94]">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm font-light text-[#E5E0D5]/80">
            <li>
              <a href="#experience" className="hover:text-[#C7AB94] transition-colors">
                The Experience
              </a>
            </li>
            <li>
              <a href="#games" className="hover:text-[#C7AB94] transition-colors">
                Game Library
              </a>
            </li>
            <li>
              <a href="#food" className="hover:text-[#C7AB94] transition-colors">
                Gourmet Menu
              </a>
            </li>
            <li>
              <a href="#celebrities" className="hover:text-[#C7AB94] transition-colors">
                Celebrity Visits
              </a>
            </li>
            <li>
              <a href="#reviews" className="hover:text-[#C7AB94] transition-colors">
                Reviews
              </a>
            </li>
          </ul>
        </div>

        {/* Location & Timings Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-bold text-[#C7AB94]">
            Club Info
          </h4>
          <div className="space-y-3.5 text-xs font-light text-[#E5E0D5]/80">
            <div>
              <p className="font-semibold text-[#C7AB94]">Address</p>
              <p className="mt-0.5 leading-relaxed">
                Plot 482, Road No. 36, Jubilee Hills,<br />
                Hyderabad, Telangana - 500033
              </p>
            </div>
            <div>
              <p className="font-semibold text-[#C7AB94]">Club Timings</p>
              <p className="mt-0.5">Mon - Thu: 11:00 AM - 11:00 PM</p>
              <p>Fri - Sun: 11:00 AM - 01:00 AM</p>
            </div>
            <div>
              <p className="font-semibold text-[#C7AB94]">Contact</p>
              <p className="mt-0.5">
                <a href="tel:+919123456789" className="hover:text-[#C7AB94] transition-colors">+91 91234 56789</a>
              </p>
              <p>
                <a href="mailto:hello@getonboardcafe.com" className="hover:text-[#C7AB94] transition-colors">hello@getonboardcafe.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-bold text-[#C7AB94]">
            Stay Updated
          </h4>
          <p className="text-xs text-[#E5E0D5]/70 leading-relaxed font-light">
            Subscribe to receive priority booking notifications, game launch announcements, and weekly chef specials.
          </p>

          <form onSubmit={handleSubscribe} className="relative flex items-center">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-[#8F9B60] rounded-lg p-3.5 pr-12 outline-none text-xs transition-colors"
              required
            />
            <button
              type="submit"
              className="absolute right-2 p-2 bg-[#8F9B60] hover:bg-[#8F9B60]/90 text-white rounded-md transition-colors"
            >
              <ArrowRight size={14} />
            </button>
          </form>

          {subscribed && (
            <p className="text-xs text-[#8F9B60] font-semibold animate-pulse">
              Thank you for subscribing!
            </p>
          )}
        </div>

      </div>

      {/* Footer Bottom / Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-[#E5E0D5]/40 space-y-3 md:space-y-0">
        <div>
          &copy; {new Date().getFullYear()} Get On Board Cafe. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[#E5E0D5] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#E5E0D5] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#E5E0D5] transition-colors">Jubilee Hills Branch</a>
        </div>
      </div>
    </footer>
  );
}
