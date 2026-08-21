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
  { src: "/images/objects/item-1.png", top: "-2%", left: "4%", rotate: -18, width: 460, delay: 0.5 },
  { src: "/images/objects/item-2.png", top: "4%", right: "2%", rotate: 9, width: 540, delay: 0.65 },
  { src: "/images/objects/item-3.png", bottom: "10%", left: "1%", rotate: -9, width: 440, delay: 0.8 },
  { src: "/images/objects/item-4.png", bottom: "8%", right: "3%", rotate: 7, width: 480, delay: 0.95 },
  { src: "/images/objects/item-5.png", bottom: "5%", left: "40%", rotate: -6, width: 360, delay: 1.1 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const objectsY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const objectsOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const uiOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const indicatorLeft = useTransform(scrollYProgress, [0, 1], ["0%", "82%"]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex h-screen flex-col overflow-hidden bg-bg"
    >
      {/* subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e8e6e1 1px, transparent 1px), linear-gradient(to bottom, #e8e6e1 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* multiple sweeping motion paths, drawn once */}
      <motion.svg
        aria-hidden="true"
        style={{ opacity: objectsOpacity }}
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 40 560 C 200 500, 280 380, 420 390 C 560 400, 610 280, 760 240 C 860 215, 890 160, 950 90"
          stroke="#5a5f66"
          strokeWidth="0.75"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.28 }}
          transition={{ duration: 2.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M 60 120 C 220 180, 340 260, 480 320 C 600 370, 640 460, 780 500 C 850 520, 900 500, 960 470"
          stroke="#5a5f66"
          strokeWidth="0.6"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 2.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>

      {/* identity — hero-only, fades on scroll, not fixed */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: timing.base, ease: ease.out }}
        style={{ opacity: uiOpacity }}
        className="absolute left-6 top-6 z-40 md:left-10 md:top-8"
      >
        <Nav />
      </motion.div>

      {/* three dots, subtle breathing glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ opacity: uiOpacity }}
        className="absolute left-1/2 top-6 z-40 flex -translate-x-1/2 gap-1.5 md:top-8"
      >
        {["#ef4444", "#facc15", "#3b82f6"].map((color, i) => (
          <motion.span
            key={color}
            animate={{
              boxShadow: [
                `0 0 0px ${color}00`,
                `0 0 4px ${color}99`,
                `0 0 0px ${color}00`,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            style={{ backgroundColor: color }}
            className="h-1.5 w-1.5 rounded-full"
          />
        ))}
      </motion.div>

      {/* floating objects: large, edge-cropped, static until hovered */}
      {objects.map(({ src, top, left, right, bottom, rotate, width, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.97, rotate: rotate - 3 }}
          animate={{ opacity: 1, scale: 1, rotate }}
          whileHover={{ scale: 1.04, rotate: rotate + 0.8 }}
          transition={{
            duration: 1,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            top,
            left,
            right,
            bottom,
            width,
            y: objectsY,
            opacity: objectsOpacity,
          }}
          className="pointer-events-auto absolute z-10 hidden origin-center cursor-pointer drop-shadow-2xl md:block"
        >
          <Image
            src={src}
            alt=""
            width={0}
            height={0}
            sizes="540px"
            style={{ width: "100%", height: "auto" }}
            className="object-contain"
          />
        </motion.div>
      ))}

      {/* mobile: two small anchored objects, static */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, rotate: -17 }}
        animate={{ opacity: 1, scale: 1, rotate: -14 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: 100 }}
        className="pointer-events-none absolute left-0 top-0 z-10 drop-shadow-xl md:hidden"
      >
        <Image
          src="/images/objects/item-1.png"
          alt=""
          width={0}
          height={0}
          sizes="100px"
          style={{ width: "100%", height: "auto" }}
          className="object-contain"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97, rotate: 13 }}
        animate={{ opacity: 1, scale: 1, rotate: 10 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: 92 }}
        className="pointer-events-none absolute bottom-0 right-0 z-10 drop-shadow-xl md:hidden"
      >
        <Image
          src="/images/objects/item-3.png"
          alt=""
          width={0}
          height={0}
          sizes="92px"
          style={{ width: "100%", height: "auto" }}
          className="object-contain"
        />
      </motion.div>

      {/* headline: dense, tight, oversized shared "I" */}
      <motion.div
        style={{ scale: contentScale, opacity: contentOpacity, y: contentY }}
        className="relative z-20 flex flex-1 flex-col items-center justify-center px-6"
      >
        <h1
          className="text-center text-accent"
          style={{
            fontFamily: "'Anton', var(--font-display), sans-serif",
            fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)",
            lineHeight: 0.95,
            letterSpacing: "0",
          }}
        >
          <RevealText as="div" delay={0.15}>
            <span className="relative inline-flex items-baseline">
              <span
                aria-hidden="true"
                className="inline-block bg-accent"
                style={{
                  width: "0.13em",
                  height: "1.15em",
                  marginRight: "0.03em",
                  transform: "translateY(0.08em)",
                }}
              />
              <span>deas</span>
            </span>
          </RevealText>

          <span className="relative inline-block">
            <RevealText as="div" delay={0.3}>
              <span className="relative inline-flex items-baseline">
                <span
                  aria-hidden="true"
                  className="inline-block bg-accent"
                  style={{
                    width: "0.13em",
                    height: "1.15em",
                    marginRight: "0.03em",
                    transform: "translateY(0.08em)",
                  }}
                />
                <span>nto</span>
              </span>
            </RevealText>
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="absolute left-full top-1/2 ml-4 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-wide"
              style={{ backgroundColor: "#f2ede3", color: "#1a1a1a" }}
            >
              Gavriell C. Pangan
            </motion.span>
          </span>

          <RevealText as="div" delay={0.45}>
            Systems
          </RevealText>
        </h1>
      </motion.div>

      {/* bottom-center: arrow only, tiny secondary label */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        style={{ opacity: uiOpacity }}
        className="pointer-events-auto absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-sm text-white/70"
        >
          ↓
        </motion.span>
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
          Works
        </span>
      </motion.a>

      {/* bottom-right: compact scroll progress indicator, larger */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        style={{ opacity: uiOpacity }}
        className="pointer-events-none absolute bottom-6 right-6 z-20 hidden h-6 w-44 items-end gap-[3px] overflow-hidden rounded-sm md:flex"
      >
        {Array.from({ length: 32 }).map((_, i) => (
          <span
            key={i}
            style={{
              height: 4 + Math.sin(i * 0.7) * 8 + 8,
              backgroundColor: "#4a4a4a",
            }}
            className="w-[2px] shrink-0"
          />
        ))}
        <motion.span
          style={{ left: indicatorLeft }}
          className="absolute top-0 h-full w-[8px] rounded-sm"
        >
          <span
            className="block h-full w-full rounded-sm"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
        </motion.span>
      </motion.div>
    </section>
  );
}