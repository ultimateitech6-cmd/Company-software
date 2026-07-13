import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import IndustryCard from "@/components/shared/IndustryCard";
import CTASection from "@/components/shared/CTASection";
import { industries } from "@/data/siteData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vertical Solutions | Customizable ERP & CRM | YourCompany Software Solutions",
  description: "Learn how our customizable ERP and CRM systems help manufacturing, trading, clinics, logistics, construction, retail, and professional firms (CAs, CSs, and legal consultancies).",
};

export default function IndustriesPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Page Title Hero */}
      <section className="-mt-20 pt-36 pb-10 md:pt-44 md:pb-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-105 dark:border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.06),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeading
            badge="Vertical Solutions"
            title="Industry-Specific Operations"
            subtitle="Generic software introduces inefficiencies. We configure custom layouts, database structures, and checklists designed specifically for your industry's standards."
            align="center"
            className="mb-0"
          />
        </div>
      </section>

      {/* Industries Grid */}
      <section className="pt-10 pb-20 md:pt-12 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind, idx) => (
              <IndustryCard
                key={ind.id}
                id={ind.id}
                title={ind.title}
                description={ind.description}
                iconName={ind.iconName}
                benefits={ind.benefits}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <CTASection />
    </div>
  );
}
