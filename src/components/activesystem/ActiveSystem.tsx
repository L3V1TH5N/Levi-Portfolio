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
  { id: "idea", label: "Idea", detail: "Start from a real problem worth solving, not just a feature to add." },
  { id: "research", label: "Research", detail: "Understand the problem before writing the solution." },
  { id: "design", label: "Design", detail: "Sketch the structure — data, flow, and interface — before touching code." },
  { id: "build", label: "Build", detail: "Write the system in small, testable pieces." },
  { id: "test", label: "Test", detail: "Break it on purpose before someone else does by accident." },
  { id: "ship", label: "Ship", detail: "Put it in front of real use, then keep it working." },
];

export default function ActiveSystem() {
  const [active, setActive] = useState<string>(nodes[0].id);
  const activeNode = nodes.find((n) => n.id === active)!;

  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
        Active System
      </p>
      <h2
        className="mt-4 max-w-2xl font-black uppercase leading-[0.9] tracking-tight text-text"
        style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
      >
        <RevealText as="div">How I Turn Ideas Into Systems</RevealText>
      </h2>

      <div className="relative mt-20 flex flex-col items-center">
        <div className="pointer-events-none absolute left-1/2 top-6 h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-line md:top-8 md:h-[calc(100%-4rem)]" />

        <div className="relative flex w-full max-w-md flex-col gap-8 md:max-w-lg">
          {nodes.map((node, i) => {
            const isActive = node.id === active;
            return (
              <motion.button
                key={node.id}
                onClick={() => setActive(node.id)}
                onMouseEnter={() => setActive(node.id)}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: ease.out }}
                className="group relative z-10 flex items-center gap-4 self-center"
              >
                <motion.span
                  animate={{
                    scale: isActive ? 1.3 : 1,
                    backgroundColor: isActive
                      ? "var(--color-accent)"
                      : "var(--color-surface-raised)",
                    borderColor: isActive
                      ? "var(--color-accent)"
                      : "var(--color-line)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-3.5 w-3.5 shrink-0 rounded-full border-2"
                />
                <span
                  className={`font-mono text-sm uppercase tracking-wide transition-colors ${
                    isActive ? "text-accent" : "text-text-muted group-hover:text-text"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}. {node.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.div
        key={activeNode.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: ease.out }}
        className="mx-auto mt-16 max-w-sm rounded-2xl border border-line bg-surface px-6 py-5 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
          {activeNode.label}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {activeNode.detail}
        </p>
      </motion.div>
    </section>
  );
}