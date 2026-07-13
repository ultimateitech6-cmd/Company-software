import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import ModuleCard from "@/components/shared/ModuleCard";
import CustomButton from "@/components/shared/CustomButton";
import CTASection from "@/components/shared/CTASection";
import { crmFeatures } from "@/data/siteData";
import { Calendar, Handshake } from "lucide-react";
import JsonLd, { getSoftwareSchema } from "@/components/shared/JsonLd";
import type { Metadata } from "next";

type Params = Promise<{ city: string }>;

export async function generateStaticParams() {
  return [
    { city: "delhi" },
    { city: "noida" },
    { city: "gurgaon" },
    { city: "mumbai" },
    { city: "bangalore" },
    { city: "pune" },
    { city: "hyderabad" },
    { city: "chennai" },
    { city: "kolkata" },
  ];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city } = await params;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  return {
    title: `Custom CRM Software in ${cityName} | Ultimate iTech Solutions`,
    description: `Accelerate your lead conversions in ${cityName} with customizable CRM features, lead pipelines, Customer 360 histories, automated follow-ups, and sales quotas.`,
  };
}

export default async function CRMCityPage({ params }: { params: Params }) {
  const { city } = await params;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  return (
    <div className="bg-white dark:bg-slate-955">
      <JsonLd schema={getSoftwareSchema("CRM")} />
      {/* Page Hero */}
      <section className="-mt-20 pt-36 pb-10 md:pt-44 md:pb-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.06),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left max-w-xl">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 uppercase">
                Relations Platform in {cityName}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Customer Relationship Management (CRM) Suite in {cityName}
              </h1>
              <p className="text-sm sm:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
                Empower your sales and support teams in {cityName} to drive growth. Our customizable CRM gives representatives instant visibility into active lead pipelines, communication logs, automated follow-up tasks, and performance metrics.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <CustomButton
                  variant="secondary"
                  size="md"
                  href="?demo=crm"
                  className="shadow-emerald-100 dark:shadow-none shadow-lg text-white hover:bg-emerald-700"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book CRM Demo in {cityName}
                </CustomButton>
                <CustomButton
                  variant="outline"
                  size="md"
                  href="/contact"
                >
                  Request Custom Quote
                </CustomButton>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              {/* Graphic container simulating CRM pipeline */}
              <div className="bg-slate-900 border border-slate-850 p-8 rounded-2xl w-full max-w-md shadow-xl text-slate-355 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-850 pb-4">
                  <div className="p-2 rounded bg-emerald-600 text-white">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-none">Ultimate iTech CRM</h4>
                    <span className="text-[10px] text-slate-500">{cityName} Regional Release v4.0</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { stage: "Qualified Lead", count: "124 leads", rate: "85% Score", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
                    { stage: "Proposal Drafted", count: "48 proposals", rate: "60% Win", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
                    { stage: "Contract Pending", count: "18 contracts", rate: "95% Win", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
                  ].map((pipe) => (
                    <div key={pipe.stage} className="flex items-center justify-between text-xs p-2.5 rounded bg-slate-950/80 border border-slate-850/50">
                      <div>
                        <span className="font-semibold text-white block">{pipe.stage}</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">{pipe.count}</span>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 border rounded uppercase tracking-wider ${pipe.color}`}>
                        {pipe.rate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Listing Grid */}
      <section className="pt-10 pb-20 md:pt-12 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="8 CRM Workflows"
            title={`Accelerate ${cityName} Leads to Closed Deals`}
            subtitle={`Explore our comprehensive collection of customer-facing modules optimized for B2B enterprises in ${cityName}.`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {crmFeatures.map((feat, idx) => (
              <ModuleCard
                key={feat.id}
                title={feat.title}
                description={feat.description}
                iconName={feat.iconName}
                details={feat.details}
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
