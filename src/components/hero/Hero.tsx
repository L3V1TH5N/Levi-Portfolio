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
  { src: "/images/objects/item-1.png", top: "-8%", left: "4%", rotate: -11, width: 550, delay: 0.5 },
  { src: "/images/objects/item-2.png", top: "-3%", right: "1%", rotate: 9, width: 650, delay: 0.65 },
  { src: "/images/objects/item-3.png", bottom: "5%", left: "2%", rotate: -9, width: 490, delay: 0.8 },
  { src: "/images/objects/item-4.png", bottom: "9%", right: "-1%", rotate: 7, width: 530, delay: 0.95 },
  { src: "/images/objects/item-5.png", bottom: "5%", left: "36%", rotate: -6, width: 510, delay: 1.1 },
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

      {/* organic signal thread, drawn once, then still */}
      <motion.svg
        aria-hidden="true"
        style={{ opacity: objectsOpacity }}
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M -20 548 C 104 468, 220 582, 350 506 C 418 466, 412 401, 448 338 C 501 244, 630 242, 684 330 C 739 421, 669 520, 568 518 C 468 516, 410 436, 438 350 C 483 211, 695 206, 796 326 C 874 419, 901 171, 1020 68"
          stroke="#6b7078"
          strokeWidth="0.8"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
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

      {/* floating objects: static by default, respond only to hover */}
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
            sizes="580px"
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

      {/* headline: single shared "I" bar spanning "deas" + "nto" */}
      <motion.div
        style={{ scale: contentScale, opacity: contentOpacity, y: contentY }}
        className="relative z-20 flex flex-1 flex-col items-center justify-center px-6"
      >
        <div
          className="text-accent"
          style={{
            fontFamily: "'Anton', var(--font-display), sans-serif",
            fontSize: "clamp(3.2rem, 4.8vw, 7.6rem)",
          }}
        >
          <div className="flex items-stretch" style={{ gap: "0.04em" }}>
            <motion.span
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: ease.out }}
              className="inline-block origin-top bg-accent"
              style={{ width: "0.15em" }}
            />
            <div
              className="flex flex-col"
              style={{ lineHeight: 0.92, paddingBottom: "0.1em" }}
            >
              <RevealText as="div" delay={0.2}>
                deas
              </RevealText>
              <span className="relative">
                <RevealText as="div" delay={0.32}>
                  nto
                </RevealText>
                <motion.span
                  initial={{ opacity: 0, y: -9 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute left-34 top-1/2 ml-4 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-wide"
                  style={{ backgroundColor: "#f2ede3", color: "#1a1a1a" }}
                >
                  Gavriell Pangan
                </motion.span>
              </span>
            </div>
          </div>

          <div style={{ lineHeight: 1, paddingBottom: "0.5em" }}>
            <RevealText as="div" delay={0.42}>
              Systems
            </RevealText>
          </div>
        </div>
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
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          className="text-sm text-white/70"
        >
          ↓
        </motion.span>
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
          Works
        </span>
      </motion.a>
    </section>
  );
}