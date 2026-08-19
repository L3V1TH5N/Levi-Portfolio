"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const FloatingShapes = dynamic(() => import("./FloatingShapes"), {
  ssr: false,
});

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 md:px-12"
    >
      <FloatingShapes />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <h2
          className="font-display font-bold uppercase leading-[0.9] tracking-tight text-text"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
        >
          About Me
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
          I&apos;m a full stack developer focused on software that holds up
          where it matters most — offline-first systems for places without
          reliable internet, simulations that teach real skills, and tools
          built to survive real-world use rather than just a demo.
        </p>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 inline-block rounded-full bg-gradient-to-r from-accent to-signal px-8 py-3.5 font-mono text-sm font-medium text-bg shadow-lg shadow-accent/20"
        >
          Let&apos;s create something together
        </motion.a>
      </motion.div>
    </section>
  );
}