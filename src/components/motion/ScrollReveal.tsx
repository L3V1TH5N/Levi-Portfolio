"use client";

import { motion } from "framer-motion";
import { ease, timing } from "@/lib/motion";

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

export default function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration: timing.base, delay, ease: ease.out }}
      className={className}
    >
      {children}
    </motion.div>
  );
}