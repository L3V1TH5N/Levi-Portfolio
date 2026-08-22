"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import RevealText from "@/components/motion/RevealText";
import { ease } from "@/lib/motion";

export default function Statement() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden md:flex-row">
      {/* border frame — inset matches the image's margin below exactly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 z-30 border border-white/10 md:inset-4"
      />

      {/* name, top-left — same pattern as Hero */}
      <div className="absolute left-6 top-6 z-40 md:left-8 md:top-8">
        <Nav />
      </div>

      {/* text — intrinsic height/width, doesn't grow */}
      <div className="relative z-10 flex flex-none items-center px-6 py-20 md:w-[40%] md:px-16 md:py-0">
        <h2
          className="font-display font-black uppercase leading-[0.95] tracking-tight text-text"
          style={{ fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)" }}
        >
          <RevealText as="div">Curious</RevealText>
          <RevealText as="div" delay={0.08}>by nature.</RevealText>
          <RevealText as="div" delay={0.16}>Building</RevealText>
          <RevealText as="div" delay={0.24}>
            by <span className="text-signal">choice.</span>
          </RevealText>
        </h2>
      </div>

      {/* image — flex-1 fills remaining space; margin matches border inset exactly */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: ease.out }}
        className="relative z-10 mx-3 mb-3 flex-1 overflow-hidden md:ml-0 md:mb-4 md:mr-4 md:mt-4"
      >
        <div
          className="relative h-full w-full"
          style={{ filter: "grayscale(1) contrast(1.3) brightness(0.85)" }}
        >
          <Image
            src="/images/profile.png"
            alt="Gavriell Pangan"
            fill
            className="object-cover object-top"
            sizes="(min-width: 768px) 60vw, 100vw"
            priority
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1.4px)",
            backgroundSize: "5px 5px",
            mixBlendMode: "multiply",
            opacity: 0.85,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#0a0a0a]"
          style={{ mixBlendMode: "color-burn", opacity: 0.25 }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #3ddc97, #3ddc97, transparent)",
            boxShadow: "0 0 8px 1px rgba(61, 220, 151, 0.6)",
          }}
          animate={{ top: ["8%", "92%", "8%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}