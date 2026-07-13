"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import LucideIcon from "./LucideIcon";

interface IndustryCardProps {
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
  index?: number;
  id?: string;
}

export default function IndustryCard({ title, description, iconName, benefits, index = 0, id }: IndustryCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="p-6 rounded-2xl bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-emerald-100 dark:hover:border-slate-700 transition-all scroll-mt-24 group"
    >
      <div className="space-y-4">
        {/* Industry Title + Icon */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-650 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
            <LucideIcon name={iconName} className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
            {title}
          </h3>
        </div>

        {/* Short info */}
        <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
          {description}
        </p>

        {/* Benefits list */}
        <div className="space-y-2.5 pt-4 border-t border-slate-50 dark:border-slate-800/80">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Key Software Benefits
          </span>
          <ul className="space-y-2">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-750 dark:text-slate-350 leading-normal">
                <div className="w-4 h-4 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
