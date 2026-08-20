"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import { ease } from "@/lib/motion";
import ProjectCursor from "@/components/projects/ProjectCursor";

type Project = {
  number: string;
  category: string;
  name: string;
  description: string;
  image: string;
  href: string;
};

const projects: Project[] = [
  {
    number: "01",
    category: "Systems / Database",
    name: "Offline Expense Management System",
    description: "Local, offline-first expense tracking for a Municipal Treasurer's Office",
    image: "/images/projects/expense-1.png",
    href: "https://github.com/L3V1TH5N/Expense-Management-System"
  },
  {
    number: "02",
    category: "3D / Simulation",
    name: "CvSUHimay",
    description: "FSM-based 3D bangus deboning simulator for fisheries education",
    image: "/images/projects/cvsuhimay-1.png",
    href: "https://github.com/L3V1TH5N/CvSUHimay",
  },
  {
    number: "03",
    category: "Web / Workflow",
    name: "ODCI Document Management System",
    description: "Document workflow platform from submission to approval",
    image: "/images/projects/odci-1.png",
    href: "https://github.com/L3V1TH5N/ODCI-Document-Management-System",
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [tappedMobile, setTappedMobile] = useState<number | null>(null);

  return (
    <section id="projects" className="relative px-6 py-32 md:px-16">
      <ProjectCursor active={hovered !== null} />
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
        Real Sites, Seen Differently
      </p>
      <h2
        className="mt-4 max-w-2xl font-black uppercase leading-[0.9] tracking-tight text-text"
        style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
      >
        <RevealText as="div">Selected Work</RevealText>
      </h2>

      <div className="relative mt-16 border-t border-line">
        {projects.map((project, i) => (
          <a
            key={project.number}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={(e) => {
              if (window.innerWidth < 768 && tappedMobile !== i) {
                e.preventDefault();
                setTappedMobile(i);
              }
            }}
            className="group relative flex items-center justify-between gap-6 border-b border-line py-7 transition-colors hover:border-accent/40 md:cursor-none"
          >
            <div className="flex items-baseline gap-6">
              <motion.span
                animate={{
                  color: hovered === i ? "var(--color-accent)" : "var(--color-text-muted)",
                }}
                className="font-mono text-sm"
              >
                {project.number}
              </motion.span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-signal">
                  {project.category}
                </p>
                <p className="mt-1 font-display text-2xl font-medium text-text transition-colors group-hover:text-accent md:text-4xl">
                  {project.name}
                </p>
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={
                    tappedMobile === i
                      ? { opacity: 1, height: "auto" }
                      : { opacity: 0, height: 0 }
                  }
                  transition={{ duration: 0.3, ease: ease.out }}
                  className="overflow-hidden text-sm text-text-muted md:hidden"
                >
                  {project.description}
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-wide text-accent">
                    Tap again to open ↗
                  </span>
                </motion.p>
              </div>
            </div>

            <span className="hidden shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wide text-text-muted md:flex">
              Hover to reveal
              <motion.span
                animate={{ x: hovered === i ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ↗
              </motion.span>
            </span>

            <motion.div
              initial={{ clipPath: "inset(0% 100% 0% 0%)", x: 20 }}
              animate={
                hovered === i
                  ? { clipPath: "inset(0% 0% 0% 0%)", x: 0 }
                  : { clipPath: "inset(0% 100% 0% 0%)", x: 20 }
              }
              transition={{ duration: 0.5, ease: ease.out }}
              className="pointer-events-none absolute right-6 top-1/2 z-10 hidden w-64 -translate-y-1/2 overflow-hidden rounded-xl border border-line bg-surface-raised shadow-2xl md:block"
            >
              <motion.div
                className="relative aspect-video"
                initial={{ scale: 1.15 }}
                animate={{ scale: hovered === i ? 1 : 1.15 }}
                transition={{ duration: 0.6, ease: ease.out }}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={
                  hovered === i
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 6 }
                }
                transition={{ duration: 0.3, delay: hovered === i ? 0.2 : 0, ease: ease.out }}
                className="p-3 text-xs leading-relaxed text-text-muted"
              >
                {project.description}
              </motion.p>
            </motion.div>
          </a>
        ))}
      </div>
    </section>
  );
}