"use client";

import { MapPin, Phone, Mail, Clock, CalendarDays, ExternalLink } from "lucide-react";

export default function LocationMap() {
  return (
    <section id="location" className="py-12 bg-[#E5E0D5] text-[#3F2B2A] relative overflow-hidden border-t border-[#C7AB94]/45">
      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8F9B60]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8F9B60] font-bold block mb-3">
            Visit our club
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Location & Timings
          </h2>
          <div className="h-0.5 w-16 bg-[#8F9B60] mx-auto mt-4" />
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

          {/* Left: Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="bg-white/50 backdrop-blur-md p-8 rounded-2xl border border-[#C7AB94]/40 space-y-6 flex-grow flex flex-col justify-center shadow-sm">

              {/* Address details */}
              <div className="flex items-start gap-4">
                <div className="bg-[#8F9B60]/10 border border-[#8F9B60]/20 p-3 rounded-xl text-[#8F9B60] mt-1">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-widest text-[#8F9B60] mb-1">
                    Club Address
                  </h4>
                  <p className="text-sm text-[#3F2B2A]/90 font-light leading-relaxed">
                    Plot 482, Road No. 36, Jubilee Hills,<br />
                    Near Jubilee Hills Check Post Metro Station,<br />
                    Hyderabad, Telangana - 500033
                  </p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-4">
                <div className="bg-[#8F9B60]/10 border border-[#8F9B60]/20 p-3 rounded-xl text-[#8F9B60] mt-1">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-widest text-[#8F9B60] mb-1">
                    Club Timings
                  </h4>
                  <div className="text-sm text-[#3F2B2A]/90 font-light space-y-1">
                    <p className="flex w-64">
                      <span>Mon - Thu:</span>
                      <span className="font-semibold  text-[#3F2B2A]">11:00 AM - 11:00 PM</span>
                    </p>
                    <p className="flex  w-64">
                      <span>Fri - Sun:</span>
                      <span className="font-semibold text-right text-[#3F2B2A]">11:00 AM - 01:00 AM</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Contacts */}
              <div className="flex items-start gap-4">
                <div className="bg-[#8F9B60]/10 border border-[#8F9B60]/20 p-3 rounded-xl text-[#8F9B60] mt-1">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-widest text-[#8F9B60] mb-1">
                    Inquiries & Bookings
                  </h4>
                  <div className="text-sm text-[#3F2B2A]/90 font-light space-y-1">
                    <p className="flex items-center gap-1.5 hover:text-[#8F9B60] transition-colors">
                      <a href="tel:+919123456789">+91 91234 56789</a>
                    </p>
                    <p className="flex items-center gap-1.5 hover:text-[#8F9B60] transition-colors">
                      <a href="mailto:hello@getonboardcafe.com">hello@getonboardcafe.com</a>
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Google Maps External Button */}
            <a
              href="https://maps.google.com/?q=Jubilee+Hills+Road+No+36+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#3F2B2A] hover:bg-[#8F9B60] text-[#E5E0D5] hover:text-white text-xs uppercase tracking-widest font-bold py-4 rounded-xl transition-all duration-300 shadow-md"
            >
              Get Directions on Google Maps <ExternalLink size={14} />
            </a>
          </div>

          {/* Right: Map Embed */}
          <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[350px] rounded-2xl overflow-hidden border border-[#C7AB94]/30 shadow-md relative">
            <iframe
              title="Get On Board Jubilee Hills Cafe Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.460429922691!2d78.3977561751661!3d17.437663183458103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91463b7ebb4b%3A0x16a4ba4ed2262687!2sRoad%20No.%2036%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1780797347373!5m2!1sen!2sin"
              className="w-full h-full border-none opacity-90 filter contrast-110 grayscale"
              loading="lazy"
            />
            {/* Soft decorative frame border */}
            <div className="absolute inset-0 border border-[#C7AB94]/15 pointer-events-none rounded-2xl" />
          </div>

        </div>

      </div>
    </section>
  );
}
