import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import PricingCard from "@/components/shared/PricingCard";
import FAQAccordion from "@/components/shared/FAQAccordion";
import CTASection from "@/components/shared/CTASection";
import { pricingPlans, faqs } from "@/data/siteData";
import JsonLd, { getFAQSchema } from "@/components/shared/JsonLd";
import type { Metadata } from "next";
import { getDb } from "@/lib/dbHelper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing Plans | Customizable ERP & CRM | YourCompany Software Solutions",
  description: "Check our flexible Starter, Professional, and Custom Enterprise pricing tiers. Final pricing depends on modules, active users, and customization specifications.",
};

export default function PricingPage() {
  const db = getDb();
  const currentPricingPlans = db.pricingPlans && db.pricingPlans.length > 0 ? db.pricingPlans : pricingPlans;

  return (
    <div className="bg-white dark:bg-slate-950">
      <JsonLd schema={getFAQSchema(faqs)} />
      {/* Page Title Hero */}
      <section className="-mt-20 pt-36 pb-10 md:pt-44 md:pb-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-105 dark:border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeading
            badge="Simple Pricing"
            title="Scalable Plans Configured for Any Team Size"
            subtitle="Choose a baseline tier matching your operations. Final pricing depends on modules, users, customization, and deployment type."
            align="center"
            className="mb-0"
          />
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="pt-10 pb-20 md:pt-12 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {currentPricingPlans.map((plan, idx) => (
              <PricingCard
                key={plan.id}
                name={plan.name}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                ctaText={plan.ctaText}
                isPopular={plan.isPopular}
                index={idx}
                ctaHref={`?demo=${plan.id === "enterprise" ? "custom" : plan.id}`}
              />
            ))}
          </div>

          <div className="mt-12 text-center max-w-2xl mx-auto text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-100 dark:border-slate-800/80">
            <span className="font-bold text-slate-700 dark:text-slate-350 block mb-1">Customization Notice</span>
            All modules can be configured with custom columns, database connections, and unique approval logic. On-premises server deployment, dedicated support SLAs, and data imports are arranged individually with our architects.
          </div>
        </div>
      </section>

      {/* Pricing FAQ Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Pricing FAQ"
            title="Have Questions About Billing & Licensing?"
            subtitle="Here are details about license ownership, data migration, and deployment setups."
          />
          <FAQAccordion items={faqs.slice(0, 4)} />
        </div>
      </section>

      {/* Pre-footer CTA */}
      <CTASection />
    </div>
  );
}
