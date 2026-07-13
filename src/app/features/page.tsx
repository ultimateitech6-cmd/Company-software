import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import FeatureCard from "@/components/shared/FeatureCard";
import CTASection from "@/components/shared/CTASection";
import { allFeatures } from "@/data/siteData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Features | Customizable ERP & CRM Modules | YourCompany Software Solutions",
  description: "View all 15 core SaaS automation features of our custom business suite, including role logins, admin boards, warehouses, billing, and document repositories.",
};

export default function FeaturesPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Page Title Hero */}
      <section className="-mt-20 pt-36 pb-10 md:pt-44 md:pb-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-105 dark:border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeading
            badge="Platform Features"
            title="Comprehensive Suite Built for Growth"
            subtitle="Explore our preconfigured features engineered to eliminate operational silos, protect company records, and automate daily tasks."
            align="center"
            className="mb-0"
          />
        </div>
      </section>

      {/* 15 Features Grid */}
      <section className="pt-10 pb-20 md:pt-12 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((feat, idx) => (
              <FeatureCard
                key={feat.id}
                title={feat.title}
                description={feat.description}
                iconName={feat.iconName}
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
