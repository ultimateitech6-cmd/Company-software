"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  id?: string;
  animateOnLoad?: boolean;
}

export default function FadeIn({ children, delay = 0, y = 25, className, id, animateOnLoad = false }: FadeInProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y }}
      animate={animateOnLoad ? { opacity: 1, y: 0 } : undefined}
      whileInView={!animateOnLoad ? { opacity: 1, y: 0 } : undefined}
      viewport={!animateOnLoad ? { once: true, margin: "-10px" } : undefined}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
