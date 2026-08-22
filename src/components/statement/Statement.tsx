"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import { ease } from "@/lib/motion";

export default function Statement() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-bg px-6 py-20 md:px-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e8e6e1 1px, transparent 1px), linear-gradient(to bottom, #e8e6e1 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <h2
          className="font-display font-bold uppercase leading-[0.95] tracking-tight text-text"
          style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
        >
          <RevealText as="div">Curious</RevealText>
          <RevealText as="div" delay={0.08}>by nature.</RevealText>
          <RevealText as="div" delay={0.16}>Building</RevealText>
          <RevealText as="div" delay={0.24}>
            by <span className="text-signal">choice.</span>
          </RevealText>
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: ease.out }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden sm:max-w-md md:max-w-lg"
        >
          <div
            className="relative h-full w-full"
            style={{ filter: "grayscale(1) contrast(1.3) brightness(0.85)" }}
          >
            <Image
              src="/images/profile.png"
              alt="Gavriell Pangan"
              fill
              className="object-cover"
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
            className="pointer-events-none absolute inset-0 bg-bg"
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
      </div>
    </section>
  );
}