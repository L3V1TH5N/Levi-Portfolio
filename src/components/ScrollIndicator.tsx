"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const indicatorLeft = useTransform(scrollYProgress, [0, 1], ["0%", "82%"]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 hidden h-5 w-40 items-end gap-[3px] overflow-hidden rounded-sm md:flex">
      {Array.from({ length: 28 }).map((_, i) => (
        <span
          key={i}
          style={{
            height: 3 + Math.sin(i * 0.75) * 6 + 6,
            backgroundColor: "#4a4a4a",
          }}
          className="w-[2px] shrink-0"
        />
      ))}
      <motion.span
        style={{ left: indicatorLeft }}
        className="absolute top-0 h-full w-[7px] rounded-sm"
      >
        <span
          className="block h-full w-full rounded-sm"
          style={{ backgroundColor: "var(--color-accent)" }}
        />
      </motion.span>
    </div>
  );
}