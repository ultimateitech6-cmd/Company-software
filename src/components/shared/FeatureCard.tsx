"use client";

import React from "react";
import { motion } from "framer-motion";
import LucideIcon from "./LucideIcon";

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string;
  index?: number;
}

export default function FeatureCard({ title, description, iconName, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="p-6 rounded-2xl bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 flex flex-col items-start gap-4 transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
        <LucideIcon name={iconName} className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
