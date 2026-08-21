"use client";

import { motion } from "framer-motion";

export default function GrainOverlay() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.06] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "120px 120px",
      }}
      animate={{ backgroundPosition: ["0px 0px", "-120px 120px"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    />
  );
}