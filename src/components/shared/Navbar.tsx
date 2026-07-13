"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ShieldCheck, Database, Layers, Sun, Moon } from "lucide-react";
import { useDemoModal } from "./DemoModalContext";
import CustomButton from "./CustomButton";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { openDemoModal } = useDemoModal();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Sync with initial theme loaded by layout.tsx script
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  // Scroll detection for styling Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Industries", href: "/industries" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const productLinks = [
    {
      name: "Custom ERP Software",
      href: "/erp-software",
      desc: "Complete enterprise workflow automation modules.",
      icon: Database,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400",
    },
    {
      name: "Custom CRM Software",
      href: "/crm-software",
      desc: "Lead pipeline and customer relationship manager.",
      icon: Layers,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400",
    },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full border-b border-transparent",
        isScrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-slate-100 dark:border-slate-800/80"
          : "bg-transparent"
      )}
    >
      {/* Top Bar (Only visible on desktop and when not scrolled) */}
      <div
        className={cn(
          "bg-slate-900 dark:bg-slate-950 text-slate-350 dark:text-slate-400 text-xs transition-all duration-300 border-b border-slate-800/50 hidden lg:block overflow-hidden",
          isScrolled ? "h-0 py-0 opacity-0 border-none" : "h-9 opacity-100 py-2"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-medium text-slate-400 dark:text-slate-400">
              <span className="text-indigo-400 font-bold">★</span> Global Customizable ERP & CRM Solutions
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:hello@ultimateenterprise.org" className="hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
              <span>✉</span> hello@ultimateenterprise.org
            </a>
            <span className="text-slate-750">|</span>
            <div className="flex items-center gap-3">
              <a href="tel:+917290000451" className="hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
                <span>📞</span> 7290000451
              </a>
              <span className="text-slate-800">/</span>
              <a href="tel:+917290000453" className="hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
                7290000453
              </a>
              <a href="https://wa.me/917290000451" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-450 text-emerald-500 font-semibold transition-colors flex items-center gap-1">
                <span>💬</span> WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300",
        isScrolled ? "py-2" : "py-3"
      )}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={theme === "dark" ? "/ultimate-itech-logo-white-v2.png" : "/ultimate-itech-logo-dark-v2.png"}
              alt="Ultimate iTech Logo"
              className="h-13 md:h-18 lg:h-20 w-auto object-contain transition-transform group-hover:scale-102 contrast-[1.10]"
              style={{ imageRendering: "-webkit-optimize-contrast" }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                  pathname === "/erp-software" || pathname === "/crm-software"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white"
                )}
              >
                Products
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Products Dropdown Menu */}
              {isProductsDropdownOpen && (
                <div className="absolute top-full -left-4 w-80 mt-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl shadow-xl p-3 grid gap-1 z-50">
                  {productLinks.map((prod) => {
                    const IconComp = prod.icon;
                    return (
                      <Link
                        key={prod.name}
                        href={prod.href}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                        onClick={() => setIsProductsDropdownOpen(false)}
                      >
                        <div className={cn("p-2 rounded-lg mt-0.5", prod.color)}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-855 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {prod.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {prod.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Standard Links */}
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <CustomButton
              variant="primary"
              size="sm"
              onClick={() => openDemoModal()}
            >
              Request Demo
            </CustomButton>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-350 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-350 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 z-30 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div
            className="w-full max-h-screen bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Products Submenu */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Products
              </p>
              <div className="grid gap-3">
                {productLinks.map((prod) => {
                  const Icon = prod.icon;
                  return (
                    <Link
                      key={prod.name}
                      href={prod.href}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className={cn("p-1.5 rounded-lg", prod.color)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {prod.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Standard Navigation links */}
            <div className="flex flex-col gap-4 border-t border-slate-100 dark:border-slate-850 pt-4 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-base font-medium transition-colors py-1",
                    pathname === link.href
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <CustomButton
                variant="primary"
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  openDemoModal();
                }}
              >
                Request Demo
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
