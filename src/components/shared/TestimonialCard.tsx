"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating?: number;
  index?: number;
}

export default function TestimonialCard({
  name,
  role,
  company,
  content,
  avatar,
  rating = 5,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-2xl bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 transition-all"
    >
      <div className="space-y-4">
        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Content */}
        <p className="text-slate-650 dark:text-slate-300 text-sm leading-relaxed italic">
          &ldquo;{content}&rdquo;
        </p>
      </div>

      {/* Author Profile */}
      <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-slate-50 dark:border-slate-800/80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover bg-slate-100"
        />
        <div className="text-left">
          <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
            {name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-none">
            {role}, <span className="font-medium text-slate-600 dark:text-slate-350">{company}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
