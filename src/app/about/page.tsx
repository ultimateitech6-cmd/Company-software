import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import CTASection from "@/components/shared/CTASection";
import { ShieldCheck, Target, Users2, Zap, CheckCircle2 } from "lucide-react";
import StatBox from "@/components/shared/StatBox";
import FadeIn from "@/components/shared/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Custom ERP & CRM | YourCompany Software Solutions",
  description: "Learn about our mission to help companies escape rigid per-user licensing traps with customizable enterprise software and dedicated engineering support.",
};

export default function AboutPage() {
  const stats = [
    { label: "Active Deployments", val: "500+" },
    { label: "ERP Custom Modules", val: "15+" },
    { label: "Enterprise Support SLA", val: "99.9%" },
    { label: "Systems Engineers", val: "50+" },
  ];

  const values = [
    {
      title: "Client-Centric Customization",
      desc: "We believe software should bend to your workflows, not force your staff to relearn their jobs.",
      icon: Target,
    },
    {
      title: "Granular Data Privacy",
      desc: "Your data belongs to you. We support private VPC cloud nodes, strict role permissions, and local database hosting.",
      icon: ShieldCheck,
    },
    {
      title: "Transparent Licensing",
      desc: "Ditch seat fees that penalize company growth. Pay for modules and server resources, not user accounts.",
      icon: Zap,
    },
    {
      title: "Continuous Partnership",
      desc: "From initial discovery mapping to onsite staff training, our team stays side-by-side with your operations.",
      icon: Users2,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Page Title Hero */}
      <section className="-mt-20 pt-36 pb-10 md:pt-44 md:pb-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-105 dark:border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="About Us"
            title="We Build Software That Adapts To Your Business"
            subtitle="At YourCompany Software Solutions, we configure customizable ERP and CRM systems that eliminate admin friction, unify teams, and drive operational performance."
            align="center"
            className="mb-0"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="pt-10 pb-20 md:pt-12 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Our Mission: Escaping the Rigid Licensing Trap
              </h2>
              <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                For decades, businesses seeking to automate operations faced a binary trap: spend hundreds of thousands building custom database software from scratch, or purchase off-the-shelf SaaS licenses that lock them into standard formats and charge massive monthly fees per user.
              </p>
              <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                YourCompany Software Solutions was founded to bridge this gap. We designed a modular ERP & CRM core architecture that is already pre-built and secure, yet fully customizable. Our engineers can add columns, create custom approvals, and connect local database feeds in days rather than months.
              </p>
              <ul className="space-y-2.5 pt-2">
                {[
                  "No seat limitations or per-user lockouts",
                  "Modular pricing structures matching company size",
                  "Direct imports from legacy files and QuickBooks sheets",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 dark:text-slate-350">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Grid of stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <StatBox
                  key={stat.label}
                  val={stat.val}
                  label={stat.label}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Core Philosophy"
            title="The Principles Driving Our Engineering"
            subtitle="Every customization query and database deployment conforms to these values."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <FadeIn
                  delay={idx * 0.08}
                  y={20}
                  key={val.title}
                  className="bg-white dark:bg-slate-905 p-6 rounded-2xl border border-slate-105 dark:border-slate-800/80 shadow-sm flex flex-col items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-450 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* pre-footer CTA */}
      <CTASection />
    </div>
  );
}
