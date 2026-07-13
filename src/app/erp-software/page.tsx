import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import ModuleCard from "@/components/shared/ModuleCard";
import CustomButton from "@/components/shared/CustomButton";
import CTASection from "@/components/shared/CTASection";
import { erpModules } from "@/data/siteData";
import { Database, Calendar, BarChart3, ShieldCheck } from "lucide-react";
import JsonLd, { getSoftwareSchema } from "@/components/shared/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customizable ERP Software Modules | YourCompany Software Solutions",
  description: "Connect and automate your operations with 11 custom modules, including HR, Employee tracking, geofenced Attendance check-ins, Payroll processing, Inventory, and Finance.",
};

export default function ERPSoftwarePage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      <JsonLd schema={getSoftwareSchema("ERP")} />
      {/* Page Hero */}
      <section className="-mt-20 pt-36 pb-10 md:pt-44 md:pb-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left max-w-xl">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 uppercase">
                Operations Platform
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Enterprise Resource Planning (ERP) Suite
              </h1>
              <p className="text-sm sm:text-base text-slate-655 dark:text-slate-350 leading-relaxed">
                Connect and automate your entire company operations. Our customizable ERP brings HR, attendance check-ins, inventory control, purchase sourcing, automated invoicing, and compliance finance books into a single database.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <CustomButton
                  variant="primary"
                  size="md"
                  href="?demo=erp"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book ERP Demo
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
              {/* Graphic container simulating database integration */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-xl text-slate-350 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-850 pb-4">
                  <div className="p-2 rounded bg-indigo-600 text-white">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-none">YourCompany ERP</h4>
                    <span className="text-[10px] text-slate-500">v4.0.2 Stable Release</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[
                    { name: "Global Financial Ledgers", icon: BarChart3, status: "Fully Synced" },
                    { name: "Multi-Warehouse Inventory", icon: Database, status: "Auto-Reorder On" },
                    { name: "Role Access & 2FA Tokens", icon: ShieldCheck, status: "Active Shields" },
                  ].map((sys) => {
                    const Icon = sys.icon;
                    return (
                      <div key={sys.name} className="flex items-center justify-between text-xs p-2.5 rounded bg-slate-950/80">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-indigo-400" />
                          <span className="font-medium text-slate-300">{sys.name}</span>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">{sys.status}</span>
                      </div>
                    );
                  })}
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
            badge="11 Integrated Modules"
            title="Smarter Operations Under One Hood"
            subtitle="Explore our comprehensive collection of pre-designed modules. Our systems engineers can modify columns, validation scopes, and reporting layouts to fit your exact processes."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {erpModules.map((mod, idx) => (
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
        </div>
      </section>

      {/* Pre-footer CTA */}
      <CTASection />
    </div>
  );
}
