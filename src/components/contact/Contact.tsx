"use client";

import RevealText from "@/components/motion/RevealText";
import ScrollReveal from "@/components/motion/ScrollReveal";

const socials = [
  { label: "GitHub", href: "https://github.com/L3V1TH5N" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Instagram", href: "https://instagram.com/" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-line px-6 py-32 md:px-16">
      <h2
        className="mx-auto max-w-3xl text-center font-black uppercase leading-[0.92] tracking-tight text-text"
        style={{ fontSize: "clamp(2rem, 6.5vw, 5rem)" }}
      >
        <RevealText as="div">Let&apos;s make</RevealText>
        <RevealText as="div" delay={0.1}>
          <span className="text-accent">something worth</span>
        </RevealText>
        <RevealText as="div" delay={0.2}>remembering.</RevealText>
      </h2>

      <ScrollReveal delay={0.35}>
        <div className="mt-10 flex justify-center">
          <a
            href="mailto:hello@example.com"
            className="group inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-accent"
          >
            Start a conversation
            <span className="transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.45}>
        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 border-t border-line pt-8 font-mono text-xs uppercase tracking-wide text-text-muted">
          {socials.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              {String(i + 1).padStart(2, "0")}. {s.label} ↗
            </a>
          ))}
          <span className="text-text-muted/50">Gavriell Pangan © 2026</span>
        </div>
      </ScrollReveal>
    </section>
  );
}