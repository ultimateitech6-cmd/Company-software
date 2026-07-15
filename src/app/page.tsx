import React from "react";
import Link from "next/link";
import {
  Lock,
  Cloud,
  Key,
  Smartphone,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Database,
  Layers,
  Users,
  Sparkles,
  Zap,
} from "lucide-react";

import CustomButton from "@/components/shared/CustomButton";
import SoftwareMockup from "@/components/shared/SoftwareMockup";
import SectionHeading from "@/components/shared/SectionHeading";
import CTASection from "@/components/shared/CTASection";
import ModuleCard from "@/components/shared/ModuleCard";
import TestimonialCard from "@/components/shared/TestimonialCard";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { erpModules, industries, testimonials, faqs, trustedPartners } from "@/data/siteData";
import TrustedPartners from "@/components/shared/TrustedPartners";
import JsonLd, { getOrganizationSchema, getSoftwareSchema, getFAQSchema } from "@/components/shared/JsonLd";
import FadeIn from "@/components/shared/FadeIn";
import type { Metadata } from "next";
import { getDb } from "@/lib/dbHelper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Customizable ERP, CRM & HRMS Software | YourCompany Software Solutions",
  description: "Ditch generic spreadsheets and rigid seat-locked licenses. Get a secure, fully customizable ERP, CRM & HRMS platform configured to your exact operations workflows.",
};

export default function Home() {
  const db = getDb();
  const currentTestimonials = db.testimonials && db.testimonials.length > 0 ? db.testimonials : testimonials;
  
  // Selected features/industries for home preview
  const previewModules = erpModules.slice(0, 3);
  const previewIndustries = industries.slice(0, 4);

  const trustBadges = [
    { name: "Customizable Modules", icon: Cpu, desc: "Add fields & workflows" },
    { name: "Secure Platform", icon: Lock, desc: "Bank-grade 256-bit encryption" },
    { name: "Cloud Ready", icon: Cloud, desc: "Hosted or on-premises" },
    { name: "Role-Based Access", icon: Key, desc: "Granular CRUD restrictions" },
    { name: "Mobile Responsive", icon: Smartphone, desc: "Optimized touch control panel" },
  ];

  const steps = [
    {
      num: "01",
      title: "Discovery & Consulting",
      desc: "Our engineers analyze your spreadsheets and legacy systems to map out your core business processes.",
    },
    {
      num: "02",
      title: "Custom Module Configuration",
      desc: "We adapt fields, configure user permission trees, and design approval workflows specifically for your team.",
    },
    {
      num: "03",
      title: "Data Migration & Tests",
      desc: "We securely import historical data files, link external APIs, and execute sandbox validation checks.",
    },
    {
      num: "04",
      title: "Deploy & Scale",
      desc: "Get onsite staff training, compile native applications, and continuous technical support as you expand.",
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <JsonLd schema={getOrganizationSchema()} />
      <JsonLd schema={getSoftwareSchema("Combined")} />
      <JsonLd schema={getFAQSchema(faqs)} />
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 bg-white dark:bg-slate-950 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-indigo-50/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-10 w-[30rem] h-[30rem] bg-emerald-50/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <FadeIn delay={0.0} y={15} className="inline-block" animateOnLoad>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100">
                <Sparkles className="w-3.5 h-3.5" />
                Empowering Mid-Market Enterprises
              </div>
            </FadeIn>

            <FadeIn delay={0.1} y={20} animateOnLoad>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Custom ERP, CRM & HRMS Software for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-850">
                  Growing Businesses
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2} y={20} animateOnLoad>
              <p className="text-lg sm:text-xl text-slate-650 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed">
                Ditch generic spreadsheets and rigid seat-locked licenses. Get a secure, fully customizable business management platform configured to your exact operations workflows.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.3} y={20} animateOnLoad>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <CustomButton
                  variant="primary"
                  size="lg"
                  href="?demo=true"
                  className="w-full sm:w-auto shadow-indigo-100 shadow-lg"
                >
                  Request Free Demo
                </CustomButton>
                <CustomButton
                  variant="outline"
                  size="lg"
                  href="/features"
                  className="w-full sm:w-auto"
                >
                  Explore Features
                </CustomButton>
              </div>
            </FadeIn>
          </div>

          {/* Software Mockup Display */}
          <FadeIn
            delay={0.4}
            y={40}
            className="mt-16 max-w-5xl mx-auto border-4 border-slate-100 rounded-3xl overflow-hidden shadow-2xl bg-slate-950"
            animateOnLoad
          >
            <SoftwareMockup />
          </FadeIn>

          {/* Trust Badges */}
          <div className="mt-16 md:mt-24 border-t border-slate-100 dark:border-slate-800/85 pt-10">
            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
              Trust indicators and platform guarantees
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto justify-center">
              {trustBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <FadeIn
                    delay={idx * 0.08}
                    y={15}
                    key={badge.name}
                    className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-650 flex items-center justify-center mb-2.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-205 leading-tight">
                      {badge.name}
                    </span>
                    <span className="text-[10px] text-slate-450 dark:text-slate-350 mt-1">
                      {badge.desc}
                    </span>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <TrustedPartners partners={trustedPartners} />

      {/* ERP + CRM Overview Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Unified Platform"
            title="ERP Operations, CRM Relationships & HRMS People Management"
            subtitle="One connected platform for your entire business. Link customer-facing sales cycles, back-office supply chains, and your full HR lifecycle — no toggling between separate databases."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* ERP Card Summary */}
            <FadeIn
              delay={0}
              y={20}
              className="bg-white dark:bg-slate-905 p-8 rounded-3xl border border-slate-105 dark:border-slate-800/80 shadow-sm space-y-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-650 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Custom ERP Software</h3>
              <p className="text-sm text-slate-655 dark:text-slate-350 leading-relaxed">
                Automate your internal company machinery. Track every inventory receipt, schedule shift rosters, compile payroll slips, and balance accounts automatically in compliance with local regulations.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-350">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>HR & Attendance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Payroll Processor</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Stocks & Warehouse</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Finance & Ledger</span>
                </li>
              </ul>
              <div className="pt-4">
                <CustomButton variant="outline" size="sm" href="/erp-software">
                  Explore ERP Modules
                  <ArrowRight className="w-4 h-4 ml-2" />
                </CustomButton>
              </div>
            </FadeIn>

            {/* CRM Card Summary */}
            <FadeIn
              delay={0.1}
              y={20}
              className="bg-white dark:bg-slate-905 p-8 rounded-3xl border border-slate-105 dark:border-slate-800/80 shadow-sm space-y-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-650 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Custom CRM Software</h3>
              <p className="text-sm text-slate-655 dark:text-slate-350 leading-relaxed">
                Drive pipeline velocity and customer satisfaction. Capture leads, assign inquiries, record communication logs, configure trigger follow-up alerts, and monitor sales metrics on interactive boards.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-350">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Lead Pipeline Kanban</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Smart Follow-up Alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Customer 360 Logs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Quota Achievement Charts</span>
                </li>
              </ul>
              <div className="pt-4">
                <CustomButton variant="outline" size="sm" href="/crm-software">
                  Explore CRM Features
                  <ArrowRight className="w-4 h-4 ml-2" />
                </CustomButton>
              </div>
            </FadeIn>

            {/* HRMS Card Summary */}
            <FadeIn
              delay={0.2}
              y={20}
              className="bg-white dark:bg-slate-905 p-8 rounded-3xl border border-slate-105 dark:border-slate-800/80 shadow-sm space-y-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Custom HRMS Software</h3>
              <p className="text-sm text-slate-655 dark:text-slate-350 leading-relaxed">
                Manage your entire people operations lifecycle. Automate recruitment, onboarding, attendance, payroll with statutory compliance (PF/ESI/TDS), performance appraisals, and L&amp;D tracking in one platform.
              </p>
              <ul className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-350">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Recruitment & ATS</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Payroll & Compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Attendance & Leave</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Performance Appraisals</span>
                </li>
              </ul>
              <div className="pt-4">
                <CustomButton variant="outline" size="sm" href="/hrms-software">
                  Explore HRMS Modules
                  <ArrowRight className="w-4 h-4 ml-2" />
                </CustomButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Modules Grid */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Modular System"
            title="SaaS Capabilities Tailored to Your Needs"
            subtitle="Start with a single department module and integrate more as your operations scale. No software bloat, no unused widgets."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewModules.map((mod, idx) => (
              <ModuleCard
                key={mod.id}
                title={mod.title}
                description={mod.description}
                iconName={mod.iconName}
                details={mod.details}
                index={idx}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <CustomButton variant="primary" href="/features">
              View All 15 Modules & Features
              <ArrowRight className="w-4 h-4 ml-2" />
            </CustomButton>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.08),transparent_40%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-indigo-400 bg-slate-800 border border-slate-700 uppercase">
                The YourCompany Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Software Configured to Your Workflows, Not the Other Way Around
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Generic ERPs force your staff to modify how they work, leading to frustration and data leaks. Our custom platform adapts perfectly to your pre-existing operations, combining the quick start of a SaaS with the flexibility of custom builds.
              </p>
              
              <div className="space-y-4">
                {[
                  { t: "No Rigid User Seat Locks", d: "Add new employees, warehouse managers, or auditors without scaling license fees." },
                  { t: "Unified Database Structure", d: "Zero integration delays or APIs failing. One centralized DB for HR, Sales, and Warehouse." },
                  { t: "Bank-Grade Encryption Protocols", d: "Role-based scopes, IP restrict keys, 2FA codes, and database backups." },
                ].map((item) => (
                  <div key={item.t} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-1 border border-indigo-500/20">
                      <Zap className="w-3 h-3 fill-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.t}</h4>
                      <p className="text-xs text-slate-450 mt-1 leading-normal">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80">
                <span className="text-4xl font-extrabold text-indigo-500">99.99%</span>
                <h4 className="text-sm font-bold text-white mt-1">Platform Uptime SLA</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Our AWS enterprise setup features load balancers and automated server restorations.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80">
                  <span className="text-4xl font-extrabold text-emerald-500">30%</span>
                  <h4 className="text-sm font-bold text-white mt-1">Operational Savings</h4>
                  <p className="text-xs text-slate-550 mt-1 leading-normal">Substantially reduce admin reconciliation and duplicate data entry logs.</p>
                </div>
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80">
                  <span className="text-4xl font-extrabold text-indigo-500">100%</span>
                  <h4 className="text-sm font-bold text-white mt-1">Custom Ownership</h4>
                  <p className="text-xs text-slate-550 mt-1 leading-normal">Tailor-made tables and configurations belong to your company.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Preview Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Vertical Solutions"
            title="Optimized for Your Industry"
            subtitle="Every business sector has distinct rules. Our ERP & CRM setups are optimized with layouts specifically for manufacturing, trading, services, logistics, and more."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewIndustries.map((ind) => (
              <div
                key={ind.id}
                className="bg-white dark:bg-slate-905 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md dark:hover:border-slate-700 transition-all group"
              >
                <div className="space-y-3">
                  <span className="text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors inline-block">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {ind.description}
                  </p>
                </div>
                <Link
                  href={`/industries#${ind.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 mt-4 hover:gap-1.5 transition-all"
                >
                  Learn More
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <CustomButton variant="outline" href="/industries">
              View All 10 Supported Industries
              <ArrowRight className="w-4 h-4 ml-2" />
            </CustomButton>
          </div>
        </div>
      </section>

      {/* Step by Step Workflow */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Implementation Process"
            title="How We Get Your Software Configured & Live"
            subtitle="Transitioning your operations shouldn't trigger chaos. Our systematic B2B methodology guarantees a smooth migration timeline."
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="absolute top-12 left-8 right-8 h-0.5 bg-slate-100 dark:bg-slate-800 hidden md:block -z-10" />

            {steps.map((step) => (
              <div key={step.num} className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-indigo-650 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-450 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Customer Success"
            title="Trusted by Fast-Growing Companies"
            subtitle="See how operators are consolidating their databases and saving admin hours."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentTestimonials.map((test, idx) => (
              <TestimonialCard
                key={test.id}
                name={test.name}
                role={test.role}
                company={test.company}
                content={test.content}
                avatar={test.avatar}
                rating={test.rating}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="FAQ"
            title="Frequently Asked Questions"
            subtitle="Have questions about customizable deployments, support services, or billing matrices? We have answers."
          />

          <FAQAccordion items={faqs} />

          <div className="text-center mt-12">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Still have questions about integrations, security logs, or custom schemas?
            </p>
            <CustomButton variant="outline" href="/contact">
              Talk to Our Software Architects
            </CustomButton>
          </div>
        </div>
      </section>

      {/* Final pre-footer CTA section */}
      <CTASection />
    </div>
  );
}
