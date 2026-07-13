import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import ContactForm from "@/components/forms/ContactForm";
import { Phone, Mail, MapPin, MessageSquare, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Book Demo | YourCompany Software Solutions",
  description: "Get in touch with our solutions architects. Request a custom sandbox ERP/CRM demo, call sales, or start a WhatsApp chat.",
};

export default function ContactPage() {
  const contactDetails = [
    {
      title: "Direct Sales Lines",
      desc: "Talk to our solution architects about pricing and custom modules.",
      val: "7290000451, 7290000453",
      href: "tel:+917290000451",
      icon: Phone,
    },
    {
      title: "WhatsApp Chat Support",
      desc: "Instantly chat with our integrations team on the go.",
      val: "Start WhatsApp Chat",
      href: "https://wa.me/917290000451",
      icon: MessageSquare,
    },
    {
      title: "Email Queries",
      desc: "Send us your technical specs sheets or RFP files directly.",
      val: "hello@ultimateenterprise.org, Bd@ultimateenterprise.org",
      href: "mailto:hello@ultimateenterprise.org",
      icon: Mail,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Page Title Hero */}
      <section className="-mt-20 pt-36 pb-10 md:pt-44 md:pb-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-105 dark:border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeading
            badge="Contact Us"
            title="Talk to Our Systems Specialists"
            subtitle="Let's align your database. Submit the inquiry form or contact us directly to set up a custom sandbox demo for your operations team."
            align="center"
            className="mb-0"
          />
        </div>
      </section>

      {/* Main Grid */}
      <section className="pt-10 pb-20 md:pt-12 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact details: Left Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6 text-left">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  Reach Us Directly
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Have questions about AWS private deployments, data imports, or custom module engine capabilities? Contact our team directly.
                </p>
              </div>

              {/* Direct channels list */}
              <div className="space-y-6">
                {contactDetails.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div key={channel.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-650 flex items-center justify-center flex-shrink-0 mt-1 border border-indigo-100 dark:bg-slate-900 dark:border-slate-800">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-1">
                          {channel.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
                          {channel.desc}
                        </p>
                        <a
                          href={channel.href}
                          target={channel.href.startsWith("http") ? "_blank" : undefined}
                          rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm font-bold text-indigo-650 hover:underline"
                        >
                          {channel.val}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Office Address & Business hours */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-8 space-y-4 text-left text-xs">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-white">Company Headquarters</h5>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                      <a
                        href="https://www.google.com/maps/place/28%C2%B029'28.2%22N+77%C2%B008'22.5%22E/@28.4911514,77.1370193,17z/data=!3m1!4b1!4m4!3m3!8m2!3d28.4911514!4d77.1395942?hl=en&entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors underline"
                      >
                        GF 4, 672, Behind- MCD School, MG Road, Ghitorni, New Delhi, Delhi 110030
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-white">Business Hours</h5>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                      Mon - Sat: 9:30 AM to 7:00 PM
                    </p>
                    <p className="text-slate-450 dark:text-slate-500 mt-0.5">
                      Sales and support responses are prioritized during business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form: Right Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
