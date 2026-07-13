import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Page Title Hero */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            badge="Legal Documentation"
            title="Privacy Policy"
            subtitle="Last updated: July 7, 2026. This policy outlines how YourCompany Software Solutions manages and protects corporate databases and client inputs."
            align="center"
            className="mb-0"
          />
        </div>
      </section>

      {/* Legal terms content */}
      <section className="py-16 text-left">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">1. Data Controller and Ownership</h3>
          <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed mb-6">
            Unlike standard consumer SaaS networks, YourCompany Software Solutions acts primarily as a Data Processor. Under our customizable ERP and CRM setups, your enterprise retains 100% legal ownership of uploaded customer databases, employee files, shifts rosters, inventory logs, and accounting books.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">2. Collection of Information</h3>
          <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed mb-4">
            We only collect company data necessary to configure your custom workspace and provide customer support, which includes:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-650 dark:text-slate-350 space-y-2 mb-6">
            <li>Account registration data (Full name, work email, corporate phone lines).</li>
            <li>Workspace preferences (Modules enabled, custom tables, user count).</li>
            <li>Support telemetry (Audit trail logs, browser metadata to troubleshoot errors).</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">3. Security and Storage Architecture</h3>
          <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed mb-6">
            All customer data is encrypted in transit using TLS 1.3 and at rest using AES-256 protocols. Cloud databases are housed in secure AWS/Azure VPC nodes configured with geofencing. For enterprises requiring on-premises setups, data is stored locally behind your company&apos;s firewall.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">4. Compliance Frameworks</h3>
          <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed mb-6">
            Our systems architecture is built to help your business maintain compliance with key standards, including General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and Health Insurance Portability and Accountability Act (HIPAA) for healthcare configurations.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">5. Contact Information</h3>
          <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
            If you have questions about our data security setups, private cloud hosting options, or databases migration protocols, please contact our Data Protection Officer at <span className="font-semibold text-slate-900 dark:text-white">dpo@ultimateenterprise.org</span>.
          </p>
        </div>
      </section>
    </div>
  );
}
