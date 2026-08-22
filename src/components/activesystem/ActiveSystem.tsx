"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import { ease } from "@/lib/motion";

type Node = {
  id: string;
  label: string;
  detail: string;
};

const nodes: Node[] = [
  {
    id: "idea",
    label: "Idea",
    detail:
      "Start from a real problem worth solving, not just a feature to add. If I can't explain why it matters in one sentence, it's not ready yet.",
  },
  {
    id: "research",
    label: "Research",
    detail:
      "Understand the problem before writing the solution. I look at what already exists, where it breaks, and who's actually affected by it.",
  },
  {
    id: "design",
    label: "Design",
    detail:
      "Sketch the structure — data, flow, and interface — before touching code. Wrong architecture is expensive to fix once it's already built.",
  },
  {
    id: "build",
    label: "Build",
    detail:
      "Write the system in small, testable pieces. Each one should work on its own before it has to work with everything else.",
  },
  {
    id: "test",
    label: "Test",
    detail:
      "Break it on purpose before someone else does by accident. Edge cases, bad input, and worst-case load all get a turn.",
  },
  {
    id: "ship",
    label: "Ship",
    detail:
      "Put it in front of real use, then keep it working. Shipping isn't the finish line — maintenance is where a system actually proves itself.",
  },
];

export default function ActiveSystem() {
  const [active, setActive] = useState<string>(nodes[0].id);
  const activeIndex = nodes.findIndex((n) => n.id === active);
  const progress = activeIndex / (nodes.length - 1);

  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-16">
      {/* border frame, matches Statement's outer canvas edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 z-30 border border-white/10 md:inset-4"
      />

      <div className="relative z-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
          Active System
        </p>
        <h2
          className="mt-4 max-w-2xl font-black uppercase leading-[0.9] tracking-tight text-text"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
        >
          <RevealText as="div">How I Turn Ideas Into Systems</RevealText>
        </h2>

        <div className="relative mt-20 grid gap-6 md:grid-cols-[48px_1fr] md:gap-10">
          {/* ============================================
              PROGRESS RAIL — tracks position through the list
          ============================================ */}
          <div className="relative hidden md:block">
            <div className="absolute left-1/2 top-1 bottom-1 w-px -translate-x-1/2 bg-line" />
            <motion.div
              className="absolute left-1/2 top-1 w-px -translate-x-1/2 bg-accent"
              animate={{ height: `${progress * 100}%` }}
              transition={{ duration: 0.4, ease: ease.out }}
              style={{
                boxShadow: "0 0 6px 1px rgba(217, 107, 62, 0.5)",
              }}
            />
            {nodes.map((node, i) => {
              const reached = i <= activeIndex;
              return (
                <motion.span
                  key={node.id}
                  animate={{
                    color: reached ? "var(--color-accent)" : "var(--color-text-muted)",
                    scale: node.id === active ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-1 font-mono text-[10px]"
                  style={{ top: `${(i / (nodes.length - 1)) * 100}%` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
              );
            })}
          </div>

          {/* ============================================
              EDITORIAL INDEX — large stacked, expands in place
          ============================================ */}
          <div className="flex flex-col divide-y divide-line border-y border-line">
            {nodes.map((node, i) => {
              const isActive = node.id === active;
              return (
                <motion.button
                  key={node.id}
                  onClick={() => setActive(node.id)}
                  onMouseEnter={() => setActive(node.id)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: ease.out }}
                  className="group relative flex w-full flex-col py-6 text-left md:py-7"
                >
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="shrink-0 font-mono text-xs text-text-muted md:hidden">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <motion.span
                      animate={{
                        color: isActive ? "var(--color-accent)" : "var(--color-text)",
                        x: isActive ? 8 : 0,
                      }}
                      transition={{ duration: 0.3, ease: ease.out }}
                      className="font-black uppercase leading-none tracking-tight"
                      style={{ fontSize: "clamp(1.6rem, 4.2vw, 3.2rem)" }}
                    >
                      {node.label}
                    </motion.span>

                    <span className="ml-auto hidden shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-text-muted transition-colors group-hover:text-text md:flex">
                      {isActive ? "Active" : "Expand"}
                      <motion.span
                        animate={{ rotate: isActive ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        →
                      </motion.span>
                    </span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={
                      isActive
                        ? { opacity: 1, height: "auto", marginTop: 14 }
                        : { opacity: 0, height: 0, marginTop: 0 }
                    }
                    transition={{ duration: 0.35, ease: ease.out }}
                    className="overflow-hidden pl-0 md:pl-1"
                  >
                    <p className="max-w-lg text-sm leading-relaxed text-text-muted md:text-base">
                      {node.detail}
                    </p>
                  </motion.div>

                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-px bg-accent"
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: ease.out }}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}