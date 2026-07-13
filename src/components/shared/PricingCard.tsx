"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import CustomButton from "./CustomButton";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
  ctaHref?: string;
  onCtaClick?: () => void;
  index?: number;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  ctaText,
  isPopular = false,
  ctaHref,
  onCtaClick,
  index = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative p-8 rounded-3xl bg-white border flex flex-col justify-between transition-all",
        isPopular
          ? "border-indigo-600 shadow-xl shadow-indigo-100 dark:shadow-none dark:border-indigo-500 dark:bg-slate-900 md:scale-105 z-10"
          : "border-slate-100 dark:border-slate-800 shadow-sm dark:bg-slate-900/60 hover:border-slate-200 dark:hover:border-slate-700"
      )}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white bg-indigo-600 uppercase">
          Most Popular
        </span>
      )}

      <div>
        {/* Tier Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 min-h-8">
            {description}
          </p>
        </div>

        {/* Pricing tag */}
        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {price}
          </span>
          {price !== "Custom" && (
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              /{period}
            </span>
          )}
        </div>

        {/* Feature List */}
        <ul className="space-y-3.5 mb-8 border-t border-slate-50 dark:border-slate-800 pt-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-350">
              <Check className="w-4 h-4 text-indigo-650 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <CustomButton
        variant={isPopular ? "primary" : "outline"}
        href={ctaHref}
        onClick={onCtaClick}
        className="w-full mt-4"
      >
        {ctaText}
      </CustomButton>
    </motion.div>
  );
}
