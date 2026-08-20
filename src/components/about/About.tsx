"use client";

import RevealText from "@/components/motion/RevealText";
import ScrollReveal from "@/components/motion/ScrollReveal";

const experience = [
  {
    period: "2021 — Present",
    role: "Computer Science",
    note: "Cavite State University",
  },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
        About Me
      </p>

      <h2
        className="mt-4 max-w-3xl font-black uppercase leading-[0.92] tracking-tight text-text"
        style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
      >
        <RevealText as="div">Hello, I&apos;m</RevealText>
        <RevealText as="div" delay={0.1}>
          <span className="text-accent">Gavriell Pangan.</span>
        </RevealText>
      </h2>

      <ScrollReveal delay={0.15}>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
          I build software, interactive systems, and digital experiences.
          I enjoy turning ideas into functional systems while exploring
          the intersection between software engineering, interaction
          design, and creative technology.
        </p>
      </ScrollReveal>

      <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2">
        <ScrollReveal delay={0.05}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
            Experience
          </p>
          <div className="mt-5 flex flex-col gap-5">
            {experience.map((e) => (
              <div key={e.period} className="border-b border-line pb-5">
                <p className="font-mono text-xs text-accent">{e.period}</p>
                <p className="mt-1 font-display text-lg font-medium text-text">
                  {e.role}
                </p>
                <p className="mt-0.5 text-sm text-text-muted">{e.note}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
            Currently
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-muted md:text-base">
            Building web systems, software projects, interactive
            experiences, and experimental applications.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}