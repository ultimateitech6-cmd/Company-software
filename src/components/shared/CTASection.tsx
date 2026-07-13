"use client";

import React from "react";
import { useDemoModal } from "./DemoModalContext";
import CustomButton from "./CustomButton";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

export default function CTASection() {
  const { openDemoModal } = useDemoModal();

  return (
    <section className="relative py-20 overflow-hidden bg-slate-900 border-y border-slate-800 text-white">
      {/* Background visual effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_40%)]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-indigo-400 text-xs font-semibold mb-6 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Enterprise-Grade Automation
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          Ready to Automate Your Business Operations?
        </h2>
        
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-350 max-w-2xl mx-auto leading-relaxed">
          Request a personalized demo to see how our customizable ERP & CRM modules can eliminate manual processes and scale with your company.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <CustomButton
            variant="secondary"
            size="lg"
            onClick={() => openDemoModal()}
            className="w-full sm:w-auto"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Request Free Demo
          </CustomButton>
          
          <CustomButton
            variant="outline"
            size="lg"
            href="/contact"
            className="w-full sm:w-auto text-white border-slate-750 bg-slate-800 hover:bg-slate-750"
          >
            Contact Sales
            <ArrowRight className="w-5 h-5 ml-2" />
          </CustomButton>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          No credit card required. Our experts will set up a demo tailored to your workflows.
        </p>
      </div>
    </section>
  );
}
