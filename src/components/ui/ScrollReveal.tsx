"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 20,
  duration = 0.45,
  once = true,
  amount = 0.2
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASING }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
