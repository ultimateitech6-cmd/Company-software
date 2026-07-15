import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Blog Posts", href: "/blog" },
    { name: "Contact Support", href: "/contact" },
    { name: "Success Stories", href: "/case-studies" },
  ];

  const productLinks = [
    { name: "ERP Software", href: "/erp-software" },
    { name: "CRM Software", href: "/crm-software" },
    { name: "HRMS Software", href: "/hrms-software" },
    { name: "Core Features", href: "/features" },
    { name: "Pricing Options", href: "/pricing" },
  ];

  const industryLinks = [
    { name: "Manufacturing", href: "/industries#manufacturing" },
    { name: "Trading & Logistics", href: "/industries#trading" },
    { name: "Real Estate", href: "/industries#real-estate" },
    { name: "Service Industries", href: "/industries#service-companies" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-10 pb-6 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 xl:gap-10 mb-6">
          {/* Logo & Description */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center group mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ultimate-itech-logo-white-v2.png"
                alt="Ultimate iTech Logo"
                className="h-12 md:h-16 lg:h-18 w-auto object-contain contrast-[1.10]"
                style={{ imageRendering: "-webkit-optimize-contrast" }}
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Ultimate iTech builds customizable ERP, CRM, and HRMS systems engineered to automate manual business workflows, increase operations visibility, and drive growth.
            </p>
          </div>

          {/* Product Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2.5">
              Solutions
            </h3>
            <ul className="space-y-2 text-sm">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2.5">
              Industries
            </h3>
            <ul className="space-y-2 text-sm">
              {industryLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2.5">
              Company
            </h3>
            <ul className="space-y-2 text-sm mb-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2.5">
              Contact Us
            </h3>
            <div className="space-y-2.5 text-sm text-left">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/place/28%C2%B029'28.2%22N+77%C2%B008'22.5%22E/@28.4911514,77.1370193,17z/data=!3m1!4b1!4m4!3m3!8m2!3d28.4911514!4d77.1395942?hl=en&entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors leading-relaxed"
                >
                  GF 4, 672, Behind- MCD School, MG Road, Ghitorni, New Delhi, Delhi 110030
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block font-semibold text-slate-350 text-xs uppercase tracking-wider">Business Hours</span>
                  <span className="block text-slate-400 text-xs mt-0.5">Mon - Sat: 9:30 AM to 7:00 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block font-semibold text-slate-350 text-xs uppercase tracking-wider">Call Us</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a href="tel:+917290000451" className="hover:text-indigo-400 transition-colors">7290000451</a>
                    <span className="text-slate-700">|</span>
                    <a href="tel:+917290000453" className="hover:text-indigo-400 transition-colors">7290000453</a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <a href="mailto:hello@ultimateenterprise.org" className="hover:text-indigo-400 transition-colors">hello@ultimateenterprise.org</a>
                  <a href="mailto:Bd@ultimateenterprise.org" className="hover:text-indigo-400 transition-colors">Bd@ultimateenterprise.org</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800/80 pt-5 mt-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Ultimate iTech Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
