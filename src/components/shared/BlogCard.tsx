"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  index?: number;
}

export default function BlogCard({
  slug,
  title,
  description,
  category,
  publishedAt,
  readTime,
  image,
  author,
  index = 0,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="rounded-2xl bg-white border border-slate-105 dark:border-slate-800/80 overflow-hidden flex flex-col justify-between hover:shadow-xl dark:bg-slate-900 dark:border-slate-800 transition-all group"
    >
      {/* Blog post cover image */}
      <Link href={`/blog/${slug}`} className="block overflow-hidden aspect-video relative bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase text-indigo-650 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300">
          {category}
        </span>
      </Link>

      {/* Blog summary content */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Metadata dates */}
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readTime}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
            <Link href={`/blog/${slug}`}>{title}</Link>
          </h3>
          
          <p className="text-sm text-slate-650 dark:text-slate-400 line-clamp-2 leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Card Footer (Author + Read Link) */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-850">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={author.avatar}
              alt={author.name}
              className="w-7 h-7 rounded-full object-cover bg-slate-100"
            />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-350">
              {author.name}
            </span>
          </div>

          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:gap-1.5 transition-all"
          >
            Read Article
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
