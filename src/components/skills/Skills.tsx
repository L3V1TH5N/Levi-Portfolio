"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import { ease, stagger } from "@/lib/motion";
import {
  SiGithub,
  SiGit,
  SiThreedotjs,
  SiMongodb,
  SiGodotengine,
  SiDart,
  SiFirebase,
  SiTailwindcss,
  SiExpress,
  SiMysql,
  SiNodedotjs,
  SiHtml5,
  SiReact,
  SiPostgresql,
  SiPython,
  SiPhp,
  SiPostman,
  SiTypescript,
  SiNextdotjs,
  SiJavascript,
} from "react-icons/si";

/* =====================================================================
   ORBIT DATA — each node sits along one of the concentric arcs drawn
   behind it. Positions are percentages of the diagram box, derived from
   the reference layout (center of the arcs sits at the box's
   bottom-left corner, radius growing toward the upper right).
===================================================================== */

type OrbitNode = {
  id: string;
  label: string;
  left: number;
  top: number;
  size: number;
  color: string;
  icon: ReactNode;
};

const orbitNodes: OrbitNode[] = [
  { id: "github", label: "GitHub", left: 45, top: 6, size: 64, color: "#e8e6e1", icon: <SiGithub size={26} /> },
  { id: "git", label: "Git", left: 69, top: 11, size: 46, color: "#F05032", icon: <SiGit size={20} /> },
  { id: "threejs", label: "Three.js", left: 23, top: 16, size: 48, color: "#e8e6e1", icon: <SiThreedotjs size={20} /> },
  { id: "mongodb", label: "MongoDB", left: 45, top: 24, size: 46, color: "#47A248", icon: <SiMongodb size={20} /> },
  { id: "godot", label: "Godot", left: 70, top: 30, size: 52, color: "#478CBF", icon: <SiGodotengine size={22} /> },
  { id: "dart", label: "Dart", left: 89, top: 29, size: 56, color: "#0175C2", icon: <SiDart size={24} /> },
  { id: "firebase", label: "Firebase", left: 4, top: 38, size: 52, color: "#FFCA28", icon: <SiFirebase size={22} /> },
  { id: "tailwind", label: "Tailwind CSS", left: 21, top: 38, size: 56, color: "#38BDF8", icon: <SiTailwindcss size={24} /> },
  { id: "express", label: "Express", left: 57, top: 43, size: 48, color: "#e8e6e1", icon: <SiExpress size={20} /> },
  { id: "mysql", label: "MySQL", left: 89, top: 55, size: 56, color: "#4479A1", icon: <SiMysql size={24} /> },
  { id: "node", label: "Node.js", left: 34, top: 47, size: 58, color: "#339933", icon: <SiNodedotjs size={26} /> },
  { id: "html5", label: "HTML5", left: 5, top: 69, size: 56, color: "#E34F26", icon: <SiHtml5 size={24} /> },
  { id: "react", label: "React", left: 17, top: 71, size: 60, color: "#61DAFB", icon: <SiReact size={26} /> },
  { id: "postgresql", label: "PostgreSQL", left: 48, top: 58, size: 44, color: "#336791", icon: <SiPostgresql size={20} /> },
  { id: "python", label: "Python", left: 64, top: 65, size: 58, color: "#3776AB", icon: <SiPython size={26} /> },
  { id: "php", label: "PHP", left: 77, top: 60, size: 48, color: "#777BB4", icon: <SiPhp size={22} /> },
  { id: "postman", label: "Postman", left: 29, top: 74, size: 46, color: "#FF6C37", icon: <SiPostman size={20} /> },
  { id: "typescript", label: "TypeScript", left: 76, top: 93, size: 54, color: "#3178C6", icon: <SiTypescript size={24} /> },
  { id: "nextjs", label: "Next.js", left: 87, top: 93, size: 46, color: "#e8e6e1", icon: <SiNextdotjs size={20} /> },
  { id: "javascript", label: "JavaScript", left: 97, top: 92, size: 52, color: "#F0DB4F", icon: <SiJavascript size={22} /> },
];

// deterministic "starfield" scatter tucked inside the innermost arc — fixed
// seed via sine so the markup matches between server and client renders.
const starDots = Array.from({ length: 55 }).map((_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12543.123;
  const rx = Math.abs(a - Math.floor(a));
  const ry = Math.abs(b - Math.floor(b));
  return {
    left: 30 + rx * 38,
    top: 64 + ry * 34,
    size: 1.4 + (i % 3) * 0.8,
    color:
      i % 6 === 0
        ? "var(--color-accent)"
        : i % 5 === 0
        ? "var(--color-signal)"
        : "rgba(232,230,225,0.5)",
  };
});

const proofBadges = [
  "OFFLINE-FIRST SYSTEMS",
  "3D SIMULATION / FSM",
  "DOCUMENT WORKFLOWS",
  "FULL STACK DELIVERY",
];

/* =====================================================================
   MOBILE FALLBACK — the orbit diagram is a wide-viewport piece, so small
   screens get the original pill cloud instead of a squeezed-in diagram.
===================================================================== */

type Skill = {
  name: string;
  category: "Languages" | "Frameworks" | "Database" | "Tools" | "Game Dev";
};

const skills: Skill[] = [
  { name: "JavaScript", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "PHP", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "Dart", category: "Languages" },
  { name: "GDScript", category: "Languages" },
  { name: "React", category: "Frameworks" },
  { name: "Next.js", category: "Frameworks" },
  { name: "Node.js", category: "Frameworks" },
  { name: "Express", category: "Frameworks" },
  { name: "MySQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Firebase", category: "Database" },
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "Godot", category: "Game Dev" },
];

const layout = [
  { y: 0, r: -2 }, { y: 14, r: 1 }, { y: -6, r: -1 }, { y: 8, r: 2 }, { y: -10, r: -3 },
  { y: 6, r: 1 }, { y: -4, r: 2 }, { y: 12, r: -2 }, { y: -8, r: 1 }, { y: 4, r: -1 },
  { y: -12, r: 2 }, { y: 10, r: -2 }, { y: -2, r: 1 }, { y: 6, r: -1 }, { y: -6, r: 2 },
  { y: 8, r: -2 }, { y: -10, r: 1 }, { y: 2, r: -1 },
];

/* =====================================================================
   TAG — bordered label with a colored highlighter bar underneath, used
   for both "03 / Capability Map" and "Proof in Practice".
===================================================================== */

function TagLabel({ children, color }: { children: string; color: string }) {
  return (
    <div className="relative inline-flex">
      <span className="relative z-10 rounded-sm border border-line bg-surface px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-text">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute -bottom-1.5 left-1.5 right-1.5 h-2 rounded-sm opacity-80"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-32 md:px-16">
      {/* header row: capability map label + heading on the left,
          proof-in-practice badges on the right */}
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <TagLabel color="#3b5bfd">03 / Capability Map</TagLabel>
          <h2
            className="mt-5 leading-[0.95] text-text"
            style={{
              fontFamily: "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
              fontWeight: 700,
              fontSize: "clamp(2.6rem, 6.5vw, 4.75rem)",
            }}
          >
            <RevealText as="div">Skills</RevealText>
            <RevealText as="div" delay={0.08}>in</RevealText>
            <RevealText as="div" delay={0.16}>Orbit</RevealText>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.3, ease: ease.out }}
            className="mt-6 max-w-sm text-sm leading-relaxed text-text-muted"
          >
            Languages, frameworks, and tools don&apos;t sit in separate boxes
            here. They revolve around the same job: turning an unusual idea
            into something useful.
          </motion.p>
        </div>

        <div className="hidden md:block">
          <TagLabel color="#d9503e">Proof in Practice</TagLabel>
          <div className="mt-4 flex flex-col gap-2.5">
            {proofBadges.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: ease.out }}
                className="block rounded-md border border-line bg-surface px-4 py-2 text-right font-mono text-[11px] uppercase tracking-wide text-text-muted"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* orbit diagram — desktop only */}
      <div className="relative mx-auto mt-20 hidden aspect-[25/16] w-full max-w-6xl md:block">
        {/* warm glow anchored where the arcs converge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 0% 100%, rgba(217,107,62,0.10), transparent 55%)",
          }}
        />

        <svg
          viewBox="0 0 1000 640"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {[230, 420, 620, 820, 980].map((r, i) => (
            <circle
              key={r}
              cx="0"
              cy="640"
              r={r}
              fill="none"
              stroke="var(--color-line)"
              strokeWidth={1}
              opacity={0.55 - i * 0.09}
            />
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {starDots.map((dot, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${dot.left}%`,
                top: `${dot.top}%`,
                width: dot.size,
                height: dot.size,
                backgroundColor: dot.color,
              }}
            />
          ))}
        </div>

        {orbitNodes.map((node, i) => (
          <div
            key={node.id}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.left}%`, top: `${node.top}%` }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.5, delay: i * stagger.tight, ease: ease.out }}
              className="flex items-center justify-center rounded-full border border-line bg-surface shadow-lg shadow-black/30"
              style={{ width: node.size, height: node.size }}
              aria-label={node.label}
            >
              <span style={{ color: node.color }} className="flex items-center justify-center">
                {node.icon}
              </span>
            </motion.div>
            <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-surface-raised px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {node.label}
            </span>
          </div>
        ))}
      </div>

      {/* skill cloud — mobile fallback */}
      <div className="relative mx-auto mt-16 flex max-w-lg flex-wrap items-center justify-center gap-3 md:hidden">
        {skills.map((skill, i) => {
          const { y, r } = layout[i % layout.length];
          const isDimmed = hoveredCategory !== null && hoveredCategory !== skill.category;
          const isHighlighted = hoveredCategory === skill.category;

          return (
            <motion.button
              key={skill.name}
              type="button"
              onClick={() =>
                setHoveredCategory(
                  hoveredCategory === skill.category ? null : skill.category
                )
              }
              initial={{ opacity: 0, y: y + 20, rotate: r }}
              whileInView={{ opacity: 1, y, rotate: r }}
              viewport={{ once: true, amount: 0.3 }}
              animate={{
                opacity: isDimmed ? 0.35 : 1,
                scale: isHighlighted ? 1.08 : 1,
                rotate: isHighlighted ? 0 : r,
                y: isHighlighted ? 0 : y,
              }}
              transition={{ duration: 0.6, delay: i * 0.035, ease: ease.out }}
              className="cursor-default select-none rounded-full border border-line bg-surface px-5 py-2 font-mono text-sm text-text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {skill.name}
            </motion.button>
          );
        })}
      </div>
      <motion.p
        animate={{ opacity: hoveredCategory ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="mt-6 text-center font-mono text-xs uppercase tracking-[0.15em] text-accent md:hidden"
      >
        {hoveredCategory ?? ""}
      </motion.p>
    </section>
  );
}