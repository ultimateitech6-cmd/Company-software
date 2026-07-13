import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import CTASection from "@/components/shared/CTASection";
import { caseStudies } from "@/data/siteData";
import { CheckCircle2, Quote } from "lucide-react";
import FadeIn from "@/components/shared/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & Success Stories | YourCompany Software Solutions",
  description: "See how organizations save administrative costs, fleet expenses, and close 42% more leads by migrating to our customizable ERP and CRM platforms.",
};

export default function CaseStudiesPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Page Title Hero */}
      <section className="-mt-20 pt-36 pb-10 md:pt-44 md:pb-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-105 dark:border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeading
            badge="Case Studies"
            title="Real Operational Success Stories"
            subtitle="Explore how fast-growing companies replaced manual workflows with our customizable ERP & CRM platforms to save hours and scale cleanly."
            align="center"
            className="mb-0"
          />
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pt-10 pb-20 md:pt-12 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {caseStudies.map((study, idx) => (
            <FadeIn
              delay={idx * 0.1}
              y={40}
              key={study.slug}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-slate-100 dark:border-slate-800/80 pb-16 last:border-b-0 last:pb-0 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image side */}
              <div className={`overflow-hidden rounded-3xl shadow-lg aspect-video ${idx % 2 === 1 ? "lg:order-last" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text side */}
              <div className="space-y-6 text-left">
                <span className="inline-flex items-center px-3 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  {study.industry} Client
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {study.title}
                </h3>

                <div className="space-y-3.5">
                  <div>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                      The Challenge
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-350 mt-1 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                      Our Customized Solution
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-350 mt-1 leading-relaxed">
                      {study.solution}
                    </p>
                  </div>
                </div>

                {/* Results checklist */}
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-3">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Verified Results
                  </span>
                  <ul className="space-y-2.5">
                    {study.results.map((res, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-800 dark:text-slate-300 leading-tight">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quote block */}
                {study.testimonial && (
                  <div className="border-l-4 border-indigo-600 pl-4 py-1 italic relative">
                    <Quote className="w-8 h-8 text-indigo-100 dark:text-indigo-950/60 absolute -top-4 left-2 -z-10" />
                    <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                      &ldquo;{study.testimonial.text}&rdquo;
                    </p>
                    <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-450 mt-2">
                      — {study.testimonial.author}, {study.testimonial.role} ({study.client})
                    </span>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Pre-footer CTA */}
      <CTASection />
    </div>
  );
}
