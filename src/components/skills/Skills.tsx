"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import { ease } from "@/lib/motion";

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

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="relative overflow-hidden px-6 py-32 md:px-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
        Capability System
      </p>
      <h2
        className="mt-4 max-w-2xl font-black uppercase leading-[0.9] tracking-tight text-text"
        style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
      >
        <RevealText as="div">Skills in Motion</RevealText>
      </h2>

      <div className="relative mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-3 md:gap-4">
        {skills.map((skill, i) => {
          const { y, r } = layout[i % layout.length];
          const isDimmed =
            hoveredCategory !== null && hoveredCategory !== skill.category;
          const isHighlighted = hoveredCategory === skill.category;

          return (
            <motion.button
              key={skill.name}
              type="button"
              onMouseEnter={() => setHoveredCategory(skill.category)}
              onMouseLeave={() => setHoveredCategory(null)}
              initial={{ opacity: 0, y: y + 20, rotate: r }}
              whileInView={{ opacity: 1, y, rotate: r }}
              viewport={{ once: true, amount: 0.3 }}
              animate={{
                opacity: isDimmed ? 0.35 : 1,
                scale: isHighlighted ? 1.08 : 1,
                rotate: isHighlighted ? 0 : r,
                y: isHighlighted ? 0 : y,
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.035,
                ease: ease.out,
              }}
              className="cursor-default select-none rounded-full border border-line bg-surface px-5 py-2 font-mono text-sm text-text-muted transition-colors hover:border-accent hover:text-accent hover:shadow-lg hover:shadow-accent/10"
            >
              {skill.name}
            </motion.button>
          );
        })}
      </div>

      <motion.p
        animate={{ opacity: hoveredCategory ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="mt-10 text-center font-mono text-xs uppercase tracking-[0.15em] text-accent"
      >
        {hoveredCategory ?? ""}
      </motion.p>
    </section>
  );
}