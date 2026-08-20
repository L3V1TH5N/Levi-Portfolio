"use client";

import { motion } from "framer-motion";

type MarqueeProps = {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
};

export default function Marquee({
  items,
  direction = "left",
  duration = 22,
  className = "",
}: MarqueeProps) {
  const track = [...items, ...items, ...items];
  const x =
    direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap"
        animate={{ x }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-text-muted"
          >
            {item} <span className="text-accent">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}