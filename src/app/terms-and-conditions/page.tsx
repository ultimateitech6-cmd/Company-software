import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Page Title Hero */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            badge="Legal Documentation"
            title="Terms and Conditions"
            subtitle="Last updated: July 7, 2026. These terms govern the license use, custom deployments, and support services of YourCompany Software Solutions."
            align="center"
            className="mb-0"
          />
        </div>
      </section>

      {/* Terms contents */}
      <section className="py-16 text-left">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">1. Scope of Agreement</h3>
          <p className="text-sm text-slate-655 dark:text-slate-350 leading-relaxed mb-6">
            These terms govern the delivery, configuration, and maintenance of customizable ERP & CRM software modules by YourCompany Software Solutions to your enterprise. By signing a Service Specification Sheet or requesting a custom sandbox demo, you agree to these terms.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">2. Module Licensing & Ownership</h3>
          <p className="text-sm text-slate-655 dark:text-slate-350 leading-relaxed mb-6">
            We grant your enterprise a non-exclusive, transferable right to deploy our pre-built ERP and CRM core modules. While the core platform architecture is proprietary to YourCompany Software Solutions, all custom fields, specific database tables, and unique workflows configured for your organization belong entirely to your enterprise.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">3. Support & Service Level Agreement (SLA)</h3>
          <p className="text-sm text-slate-655 dark:text-slate-350 leading-relaxed mb-4">
            We guarantee 99.9% platform uptime for all AWS cloud-hosted configurations. In the event of system interruptions:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-655 dark:text-slate-350 space-y-2 mb-6">
            <li>Starter Plan: Support response within 24 hours.</li>
            <li>Professional Plan: Priority email and WhatsApp response within 4 hours.</li>
            <li>Enterprise Plan: Dedicated 24/7 account manager with a 1-hour critical response SLA.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">4. Billing & Customization Cost Sheets</h3>
          <p className="text-sm text-slate-655 dark:text-slate-350 leading-relaxed mb-6">
            Monthly base subscriptions are billed in advance. Custom schemas, data imports from legacy files, and custom API builds are subject to a separate statement of work, billed upon milestone completions.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">5. Governing Law</h3>
          <p className="text-sm text-slate-655 dark:text-slate-350 leading-relaxed">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to conflicts of law principles.
          </p>
        </div>
      </section>
    </div>
  );
}
