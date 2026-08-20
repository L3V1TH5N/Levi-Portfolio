"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Nav from "@/components/Nav";
import RevealText from "@/components/motion/RevealText";
import { ease, timing } from "@/lib/motion";

type FloatObj = {
  src: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate: number;
  width: number;
  delay: number;
};

const objects: FloatObj[] = [
  { src: "/images/objects/item-1.png", top: "2%", left: "-2%", rotate: -16, width: 340, delay: 0.6 },
  { src: "/images/objects/item-2.png", top: "0%", right: "-2%", rotate: 8, width: 400, delay: 0.75 },
  { src: "/images/objects/item-3.png", bottom: "6%", left: "-3%", rotate: -8, width: 320, delay: 0.9 },
  { src: "/images/objects/item-4.png", bottom: "8%", right: "-1%", rotate: 6, width: 360, delay: 1.05 },
  { src: "/images/objects/item-5.png", bottom: "2%", left: "43%", rotate: -6, width: 220, delay: 1.2 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const objectsY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const objectsOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex h-screen flex-col overflow-hidden bg-bg"
    >
      {/* grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e8e6e1 1px, transparent 1px), linear-gradient(to bottom, #e8e6e1 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* subtle motion path */}
      <motion.svg
        aria-hidden="true"
        style={{ opacity: objectsOpacity }}
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 120 480 C 300 420, 380 320, 500 340 C 620 360, 680 260, 860 160"
          stroke="#5a5f66"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.4, ease: ease.out }}
        />
      </motion.svg>

      {/* identity — hero-only, fades on scroll */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: timing.base, ease: ease.out }}
        style={{ opacity: navOpacity }}
        className="absolute left-6 top-6 z-40 md:left-10 md:top-8"
      >
        <Nav />
      </motion.div>

      {/* three dots, top-center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ opacity: navOpacity }}
        className="absolute left-1/2 top-6 z-40 flex -translate-x-1/2 gap-1.5 md:top-8"
      >
        <span className="h-2 w-2 rounded-full bg-red-500" />
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        <span className="h-2 w-2 rounded-full bg-blue-500" />
      </motion.div>

      {/* floating objects, no border, recede on scroll */}
      {objects.map(({ src, top, left, right, bottom, rotate, width, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.75, rotate: rotate - 6 }}
          animate={{ opacity: 1, scale: 1, rotate }}
          transition={{ duration: 0.9, delay, ease: ease.out }}
          style={{
            top,
            left,
            right,
            bottom,
            width,
            y: objectsY,
            opacity: objectsOpacity,
          }}
          className="pointer-events-none absolute z-10 hidden drop-shadow-2xl md:block"
        >
          <Image
            src={src}
            alt=""
            width={0}
            height={0}
            sizes="400px"
            style={{ width: "100%", height: "auto" }}
            className="object-contain"
          />
        </motion.div>
      ))}

      {/* mobile: two small anchored objects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -14 }}
        animate={{ opacity: 1, scale: 1, rotate: -14 }}
        transition={{ duration: 0.8, delay: 0.5, ease: ease.out }}
        style={{ width: 110 }}
        className="pointer-events-none absolute left-0 top-0 z-10 drop-shadow-xl md:hidden"
      >
        <Image
          src="/images/objects/item-1.png"
          alt=""
          width={0}
          height={0}
          sizes="110px"
          style={{ width: "100%", height: "auto" }}
          className="object-contain"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 10 }}
        transition={{ duration: 0.8, delay: 0.65, ease: ease.out }}
        style={{ width: 100 }}
        className="pointer-events-none absolute bottom-0 right-0 z-10 drop-shadow-xl md:hidden"
      >
        <Image
          src="/images/objects/item-3.png"
          alt=""
          width={0}
          height={0}
          sizes="100px"
          style={{ width: "100%", height: "auto" }}
          className="object-contain"
        />
      </motion.div>

      {/* headline: Ideas + Into on one line, Systems below, name tag beside it */}
      <motion.div
        style={{ scale: contentScale, opacity: contentOpacity, y: contentY }}
        className="relative z-20 flex flex-1 flex-col items-center justify-center px-6"
      >
        <div className="flex items-start gap-4">
          <motion.span
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: timing.base, delay: 0.15, ease: ease.out }}
            className="mt-1 h-[3.2em] w-1.5 shrink-0 origin-top bg-accent md:h-[3.6em]"
          />

          <h1
            className="uppercase leading-[0.92] tracking-normal text-accent"
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
            }}
          >
            <span className="flex flex-wrap items-baseline gap-x-4">
              <RevealText as="span" delay={0.15}>Ideas</RevealText>
              <RevealText as="span" delay={0.25}>Into</RevealText>
            </span>
            <span className="relative inline-block">
              <RevealText as="div" delay={0.35}>Systems</RevealText>
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute left-full top-1/2 ml-4 -translate-y-1/2 whitespace-nowrap rounded-sm px-3 py-1 font-mono text-[10px] font-light tracking-wide shadow-md"
                style={{ backgroundColor: "#1a1a1a", color: "#d8d2c2" }}
              >
                Gavriell C. Pangan
              </motion.span>
            </span>
          </h1>
        </div>
      </motion.div>

      {/* bottom-center label */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        style={{ opacity: navOpacity }}
        className="pointer-events-auto absolute bottom-4 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] font-light uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-accent"
      >
        Works / Projects
      </motion.a>
    </section>
  );
}