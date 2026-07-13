"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import LucideIcon from "./LucideIcon";

interface ModuleCardProps {
  title: string;
  description: string;
  iconName: string;
  details: string[];
  index?: number;
}

export default function ModuleCard({ title, description, iconName, details, index = 0 }: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="p-6 rounded-2xl bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-indigo-100 dark:hover:border-slate-700 transition-all group"
    >
      <div className="space-y-4">
        {/* Header (Icon + Name) */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
            <LucideIcon name={iconName} className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>

        {/* Bullet points */}
        <ul className="space-y-2.5 pt-2 border-t border-slate-50 dark:border-slate-800/80">
          {details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-350 leading-tight">
              <CheckCircle2 className="w-4 h-4 text-emerald-505 dark:text-emerald-500 mt-0.5 flex-shrink-0 text-emerald-600" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
