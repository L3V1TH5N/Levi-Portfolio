"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  type Variants,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Nav from "@/components/Nav";

const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const headlineVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: easeOut } },
};

const portraitVariant: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.1, ease: easeOut, delay: 0.2 },
  },
};

const descVariant: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut, delay: 0.6 } },
};

const ctaVariant: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut, delay: 0.6 } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 50, damping: 20 });
  const springY = useSpring(my, { stiffness: 50, damping: 20 });

  const portraitX = useTransform(springX, [-1, 1], [-9, 9]);
  const portraitY = useTransform(springY, [-1, 1], [-9, 9]);
  const headlineX = useTransform(springX, [-1, 1], [3, -3]);
  const headlineY = useTransform(springY, [-1, 1], [3, -3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mx.set(px);
    my.set(py);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-screen flex-col overflow-hidden"
    >
      {/* z-0: background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 55%, rgba(255,138,61,0.07), transparent 70%)",
        }}
      />

      {/* nav: independent top layer */}
      <div className="relative z-30">
        <Nav />
      </div>

      {/* z-10: giant headline, near edge-to-edge, vertically centered */}
      <motion.h1
        initial="hidden"
        animate="show"
        variants={headlineVariant}
        style={{ x: headlineX, y: headlineY }}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 select-none text-center font-display font-bold uppercase leading-[0.82] tracking-tighter text-text"
      >
        <span
          className="block"
          style={{ fontSize: "clamp(4rem, 17vw, 15.5rem)" }}
        >
          Hi, I&apos;m Levi
        </span>
      </motion.h1>

      {/* z-20: portrait, centered, overlapping the headline */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={portraitVariant}
        style={{ x: portraitX, y: portraitY }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 aspect-[4/5] w-[62vw] max-w-[420px] -translate-x-1/2 -translate-y-[52%] md:w-[34vw]"
      >
        <Image
          src="/images/profile.png"
          alt="Gavriell Pangan"
          fill
          className="object-contain object-bottom"
          priority
        />
      </motion.div>

      {/* z-30: description + CTA, independent bottom layer */}
      <div className="relative z-30 mt-auto flex w-full flex-col items-center gap-6 px-6 pb-14 md:flex-row md:items-end md:justify-between md:px-16 md:pb-16">
        <motion.p
          initial="hidden"
          animate="show"
          variants={descVariant}
          className="max-w-[260px] text-center text-sm leading-relaxed text-text-muted md:text-left"
        >
          A full stack developer building offline-first systems, simulations
          that teach real skills, and tools that hold their shape under real
          use.
        </motion.p>

        <motion.a
          initial="hidden"
          animate="show"
          variants={ctaVariant}
          whileHover={{ scale: 1.04, filter: "brightness(1.08)" }}
          whileTap={{ scale: 0.96 }}
          href="#contact"
          className="inline-block shrink-0 rounded-full bg-gradient-to-r from-accent to-signal px-8 py-3.5 font-mono text-sm font-medium text-bg shadow-lg shadow-accent/20"
        >
          Contact Me
        </motion.a>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-text-muted"
      >
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          scroll
          <span className="block h-6 w-px bg-text-muted" />
        </motion.span>
      </motion.div>
    </section>
  );
}