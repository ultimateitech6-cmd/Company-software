"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatBoxProps {
  val: string;
  label: string;
  index: number;
}

export default function StatBox({ val, label, index }: StatBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:border-indigo-100 transition-colors"
    >
      <span className="block text-3xl sm:text-4xl font-extrabold text-indigo-660 text-indigo-600">
        {val}
      </span>
      <span className="block text-xs font-semibold text-slate-500 mt-2">
        {label}
      </span>
    </motion.div>
  );
}
