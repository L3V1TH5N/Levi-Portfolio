"use client";

import { motion, type Variants } from "framer-motion";
import { ease, timing } from "@/lib/motion";

type RevealTextProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  className?: string;
  once?: boolean;
};

const wrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.02 } },
};

const line: Variants = {
  hidden: { y: "100%" },
  show: {
    y: "0%",
    transition: { duration: timing.base, ease: ease.out },
  },
};

export default function RevealText({
  children,
  as: Tag = "div",
  delay = 0,
  className,
  once = true,
}: RevealTextProps) {
  return (
    <Tag className={className} style={{ overflow: "hidden" }}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={{ once }}
        variants={wrap}
        transition={{ delayChildren: delay }}
        style={{ display: "inline-block" }}
      >
        <motion.span variants={line} style={{ display: "inline-block" }}>
          {children}
        </motion.span>
      </motion.span>
    </Tag>
  );
}