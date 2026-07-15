import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import ModuleCard from "@/components/shared/ModuleCard";
import CustomButton from "@/components/shared/CustomButton";
import CTASection from "@/components/shared/CTASection";
import { hrmsFeatures } from "@/data/siteData";
import {
  Calendar,
  Users,
  CheckCircle2,
  TrendingUp,
  Shield,
  Award,
} from "lucide-react";
import JsonLd, { getSoftwareSchema } from "@/components/shared/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customizable HRMS Software | Ultimate iTech HR Management System",
  description:
    "Manage your entire HR lifecycle — recruitment, onboarding, attendance, payroll (PF/ESI/TDS), performance appraisals, and learning — from one unified HRMS platform.",
};

export default function HRMSSoftwarePage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      <JsonLd schema={getSoftwareSchema("HRMS")} />

      {/* Page Hero */}
      <section className="-mt-20 pt-36 pb-10 md:pt-44 md:pb-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.07),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left max-w-xl">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-purple-700 bg-purple-50 border border-purple-100 uppercase">
                People Operations Platform
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Human Resource Management System (HRMS) Suite
              </h1>
              <p className="text-sm sm:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
                Unify your entire people operations in one platform. From
                recruitment and onboarding to payroll processing, attendance
                tracking, performance cycles, and statutory compliance — our
                customizable HRMS adapts to your exact HR workflows.
              </p>

              {/* Key stats */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { value: "8+", label: "HR Modules" },
                  { value: "100%", label: "Statutory Compliant" },
                  { value: "< 5 min", label: "Payroll Run" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 rounded-xl p-3 text-center"
                  >
                    <span className="block text-xl font-extrabold text-purple-700 dark:text-purple-400">
                      {stat.value}
                    </span>
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <CustomButton
                  variant="primary"
                  size="md"
                  href="?demo=hrms"
                  className="bg-purple-700 hover:bg-purple-800 shadow-purple-100 shadow-lg border-purple-700"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book HRMS Demo
                </CustomButton>
                <CustomButton variant="outline" size="md" href="/contact">
                  Request Custom Quote
                </CustomButton>
              </div>
            </div>

            {/* Hero Graphic — live HRMS dashboard mockup */}
            <div className="hidden lg:flex justify-center">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-xl text-slate-350 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="p-2 rounded bg-purple-700 text-white">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-none">
                      Ultimate iTech HRMS
                    </h4>
                    <span className="text-[10px] text-slate-500">
                      v2.1.0 Stable Release
                    </span>
                  </div>
                  <span className="ml-auto text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                    Live
                  </span>
                </div>

                <div className="space-y-2">
                  {[
                    {
                      name: "Payroll — June 2026",
                      icon: CheckCircle2,
                      status: "Processed",
                      color: "text-emerald-400",
                    },
                    {
                      name: "Attendance Sync",
                      icon: CheckCircle2,
                      status: "Biometric Active",
                      color: "text-indigo-400",
                    },
                    {
                      name: "Appraisal Cycle Q2",
                      icon: TrendingUp,
                      status: "In Progress",
                      color: "text-amber-400",
                    },
                    {
                      name: "PF / ESI Compliance",
                      icon: Shield,
                      status: "Fully Filed",
                      color: "text-emerald-400",
                    },
                    {
                      name: "Training Completion",
                      icon: Award,
                      status: "87% Achieved",
                      color: "text-purple-400",
                    },
                  ].map((sys) => {
                    const Icon = sys.icon;
                    return (
                      <div
                        key={sys.name}
                        className="flex items-center justify-between text-xs p-2.5 rounded bg-slate-950/80"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${sys.color}`} />
                          <span className="font-medium text-slate-300">
                            {sys.name}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {sys.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why HRMS section */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why HRMS?"
            title="Stop Managing HR in Spreadsheets"
            subtitle="Manual HR processes cost your team hours every week and expose your company to compliance risk. Our HRMS automates the entire employee lifecycle so your HR team can focus on people, not paperwork."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {[
              {
                icon: "🧾",
                title: "Statutory Compliance — Zero Stress",
                desc: "Auto-compute PF, ESI, TDS, gratuity, and professional tax with every payroll run. Generate challan files and Form 16 with one click.",
              },
              {
                icon: "📍",
                title: "Accurate Attendance — Every Day",
                desc: "Biometric, geofenced mobile check-in, or web punch — all methods feed directly into shift rosters, leave balances, and payroll.",
              },
              {
                icon: "🎯",
                title: "Performance That Drives Growth",
                desc: "Align employee goals to company OKRs, run structured 360° appraisal cycles, and identify top performers with data-backed calibration.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 space-y-3"
              >
                <span className="text-3xl">{card.icon}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Listing Grid */}
      <section className="pt-4 pb-20 md:pt-6 md:pb-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="8 HRMS Modules"
            title="Full HR Lifecycle — One Platform"
            subtitle="From the moment a candidate applies to the day an employee retires, every touchpoint is managed, automated, and audited within a single unified HRMS."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hrmsFeatures.map((feat, idx) => (
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
