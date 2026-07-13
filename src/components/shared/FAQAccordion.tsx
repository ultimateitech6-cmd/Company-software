"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQItem } from "@/types";

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3.5">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-slate-100 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-5 text-left font-medium text-slate-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none transition-colors"
            >
              <span className="text-base font-semibold pr-4">{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? "rotate-180 text-indigo-600" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-850 pt-3">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
