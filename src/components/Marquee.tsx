"use client";

import { motion } from "framer-motion";

type MarqueeProps = {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
};

function Separator() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 text-white/60"
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line x1="12" y1="2.5" x2="12" y2="21.5" stroke="currentColor" strokeWidth="2" />
      <line x1="2.5" y1="12" x2="21.5" y2="12" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

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
            className="inline-flex items-center gap-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-text-muted"
          >
            {item}
            <Separator />
          </span>
        ))}
      </motion.div>
    </div>
  );
}