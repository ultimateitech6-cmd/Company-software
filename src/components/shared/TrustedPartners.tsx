"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { TrustedPartner } from "@/types";

interface TrustedPartnersProps {
  partners: TrustedPartner[];
}

export default function TrustedPartners({ partners }: TrustedPartnersProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  // Duplicate the array to create seamless infinite scroll effect
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 bg-white border-y border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-indigo-650 bg-indigo-50 border border-indigo-100 mb-3 uppercase">
            Our Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our Trusted Partners
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Backed by a strong ecosystem of industry leaders and innovators driving business excellence.
          </p>
        </motion.div>

        {/* Scrolling Logo Marquee */}
        <motion.div
          className="relative partner-marquee-wrapper"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Marquee Track — CSS animation with hover-pause */}
          <div className="partner-marquee-track flex items-center gap-6 md:gap-10">
            {duplicatedPartners.map((partner, index) => (
              <a
                key={`${partner.id}-${index}`}
                href={partner.website || "#"}
                target={partner.website && partner.website !== "#" ? "_blank" : undefined}
                rel={partner.website && partner.website !== "#" ? "noopener noreferrer" : undefined}
                className="flex-shrink-0 group"
                title={partner.name}
              >
                <div className="relative w-32 h-16 md:w-40 md:h-20 flex items-center justify-center px-4 py-3 transition-all duration-300 group-hover:scale-105">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={140}
                      height={60}
                      className="max-h-12 md:max-h-14 w-auto object-contain"
                      unoptimized
                    />
                  ) : (
                    <span className="text-sm md:text-base font-bold text-slate-400 group-hover:text-indigo-650 transition-colors duration-300 text-center leading-tight whitespace-nowrap">
                      {partner.name}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
