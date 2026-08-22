"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import { ease, stagger } from "@/lib/motion";
import {
  SiPython,
  SiTypescript,
  SiSupabase,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiClaude,
  SiGooglegemini,
  SiOpenjdk,
  SiMysql,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiMake,
  SiVite,
  SiFirebase,
  SiGithub,
  SiCursor,
  SiGithubcopilot,
  SiPerplexity,
} from "react-icons/si";

/* =====================================================================
   SHARED CURSIVE HEADLINE FONT — used for both "Tools that move ideas."
   and "Skills in Orbit". Kalam is self-hosted (imported once, globally,
   in layout.tsx) so it renders identically everywhere.
===================================================================== */
const HEADLINE_FONT = "'Kalam', 'Caveat', cursive";

/* =====================================================================
   ACTIVE CONSTELLATION BANNER
===================================================================== */
const processSteps = ["Question", "Prototype", "Intelligence", "Ship"];

const CREDIT_NAME = "Gavriell Pangan";
const CREDIT_TAGLINE = ["Design", "Data", "AI", "Automation"];

/* =====================================================================
   ORBIT DATA — four concentric rings sharing a pivot at the diagram's
   bottom-CENTER. Radii are expressed in an internal 1000×520 coordinate
   system (BOX_W / BOX_H below), independent of however the diagram is
   actually framed on screen.
===================================================================== */

type RingIcon = {
  id: string;
  label: string;
  color: string;
  icon: ReactNode;
};

type Ring = {
  id: string;
  radius: number;
  size: number;
  duration: number;
  direction: 1 | -1;
  phase: number;
  icons: RingIcon[];
};

const rings: Ring[] = [
  {
    id: "ring-inner",
    radius: 150,
    size: 52,
    duration: 9,
    direction: 1,
    phase: 25,
    icons: [
      { id: "python", label: "Python", color: "#3776AB", icon: <SiPython size={22} /> },
      { id: "typescript", label: "TypeScript", color: "#3178C6", icon: <SiTypescript size={22} /> },
      { id: "supabase", label: "Supabase", color: "#3ECF8E", icon: <SiSupabase size={22} /> },
      {
        id: "codex",
        label: "Codex",
        color: "#e8e6e1",
        icon: <span className="font-mono text-[12px] font-bold">CX</span>,
      },
    ],
  },
  {
    id: "ring-two",
    radius: 225,
    size: 48,
    duration: 11,
    direction: -1,
    phase: 20,
    icons: [
      { id: "react", label: "React", color: "#61DAFB", icon: <SiReact size={22} /> },
      { id: "node", label: "Node.js", color: "#339933", icon: <SiNodedotjs size={22} /> },
      { id: "express", label: "Express.js", color: "#e8e6e1", icon: <SiExpress size={20} /> },
      { id: "claude", label: "Claude", color: "#D97757", icon: <SiClaude size={20} /> },
      { id: "gemini", label: "Gemini", color: "#4285F4", icon: <SiGooglegemini size={20} /> },
    ],
  },
  {
    id: "ring-three",
    radius: 300,
    size: 44,
    duration: 13,
    direction: 1,
    phase: 15,
    icons: [
      { id: "java", label: "Java", color: "#437291", icon: <SiOpenjdk size={22} /> },
      { id: "mysql", label: "MySQL", color: "#4479A1", icon: <SiMysql size={20} /> },
      { id: "javascript", label: "JavaScript", color: "#F0DB4F", icon: <SiJavascript size={20} /> },
      { id: "html5", label: "HTML", color: "#E34F26", icon: <SiHtml5 size={20} /> },
      { id: "tailwind", label: "Tailwind CSS", color: "#38BDF8", icon: <SiTailwindcss size={20} /> },
      { id: "make", label: "Make", color: "#A177FF", icon: <SiMake size={20} /> },
    ],
  },
  {
    id: "ring-outer",
    radius: 375,
    size: 40,
    duration: 15,
    direction: -1,
    phase: 10,
    icons: [
      { id: "vite", label: "Vite", color: "#646CFF", icon: <SiVite size={20} /> },
      { id: "firebase", label: "Firebase", color: "#FFCA28", icon: <SiFirebase size={20} /> },
      {
        id: "vscode",
        label: "VS Code",
        color: "#3C99D4",
        icon: <span className="font-mono text-[10px] font-bold">VS</span>,
      },
      { id: "github", label: "GitHub", color: "#e8e6e1", icon: <SiGithub size={20} /> },
      {
        id: "antigravity",
        label: "Antigravity",
        color: "#4285F4",
        icon: <span className="font-mono text-[10px] font-bold">AG</span>,
      },
      { id: "cursor", label: "Cursor", color: "#e8e6e1", icon: <SiCursor size={18} /> },
      { id: "copilot", label: "GitHub Copilot", color: "#e8e6e1", icon: <SiGithubcopilot size={18} /> },
      { id: "perplexity", label: "Perplexity", color: "#20B8CD", icon: <SiPerplexity size={18} /> },
    ],
  },
];

// Internal coordinate system the polar math is computed in. This is
// DELIBERATELY wider than it is tall (1000×520) — the visible on-screen
// container is a separate, narrower/square element (see the render
// section below) that simply crops this wider canvas at its left/right
// edges, which is what produces the "cut off in a square" look from the
// reference instead of showing the whole arc.
const BOX_W = 1000;
const BOX_H = 520;

// how much wider the internal canvas is than the square viewport that
// crops it, expressed as a CSS percentage of the (square) viewport's
// own width. Since the viewport is square, its width == its height, so
// this percentage also equals BOX_W / BOX_H as a height-based ratio —
// no separate aspect-ratio resolution needed on the canvas element.
const CANVAS_WIDTH_PERCENT = (BOX_W / BOX_H) * 100;

// total angular width each ring's icons are spread across
const ANGLE_SPAN = 150;

function polarPosition(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const x = BOX_W / 2 + radius * Math.cos(rad);
  const y = BOX_H - radius * Math.sin(rad);
  return { left: (x / BOX_W) * 100, top: (y / BOX_H) * 100 };
}

// builds a polyline approximation of the arc a ring's icons sit on
function arcPath(radius: number, startDeg: number, endDeg: number, steps = 32) {
  const points: string[] = [];
  for (let s = 0; s <= steps; s++) {
    const deg = startDeg + ((endDeg - startDeg) * s) / steps;
    const rad = (deg * Math.PI) / 180;
    const x = BOX_W / 2 + radius * Math.cos(rad);
    const y = BOX_H - radius * Math.sin(rad);
    points.push(`${s === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(" ");
}

// deterministic "planet" texture — fixed seed via sine so markup matches
// between server and client renders. Sampled uniformly inside a disc.
const GLOBE_DOT_COUNT = 42;
const GLOBE_DOT_RADIUS = 44;
const globeDots = Array.from({ length: GLOBE_DOT_COUNT }).map((_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12543.123;
  const ra = Math.abs(a - Math.floor(a));
  const rb = Math.abs(b - Math.floor(b));
  const r = GLOBE_DOT_RADIUS * Math.sqrt(ra);
  const theta = rb * Math.PI * 2;
  return {
    left: 50 + r * Math.cos(theta),
    top: 50 + r * Math.sin(theta),
    size: 1 + (i % 3) * 0.7,
    color:
      i % 7 === 0
        ? "var(--color-accent)"
        : i % 5 === 0
        ? "var(--color-signal)"
        : "rgba(232,230,225,0.55)",
  };
});

const proofBadges = [
  "9 PUBLIC REPOS",
  "7 PROJECTS SHIPPED",
  "3D / REACT THREE FIBER",
  "AI OBJECT DETECTION",
];

/* =====================================================================
   MOBILE FALLBACK — the orbit diagram needs real width to read, so small
   screens get a simple pill cloud of the same stack instead.
===================================================================== */

type Skill = {
  name: string;
  category: "Languages" | "Frameworks" | "Database" | "Tools";
};

const skills: Skill[] = [
  { name: "Python", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "HTML", category: "Languages" },
  { name: "React", category: "Frameworks" },
  { name: "Node.js", category: "Frameworks" },
  { name: "Express.js", category: "Frameworks" },
  { name: "Tailwind CSS", category: "Frameworks" },
  { name: "Vite", category: "Frameworks" },
  { name: "MySQL", category: "Database" },
  { name: "Supabase", category: "Database" },
  { name: "Firebase", category: "Database" },
  { name: "Google Console", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "GitHub", category: "Tools" },
];

const layout = [
  { y: 0, r: -2 }, { y: 14, r: 1 }, { y: -6, r: -1 }, { y: 8, r: 2 }, { y: -10, r: -3 },
  { y: 6, r: 1 }, { y: -4, r: 2 }, { y: 12, r: -2 }, { y: -8, r: 1 }, { y: 4, r: -1 },
  { y: -12, r: 2 }, { y: 10, r: -2 }, { y: -2, r: 1 }, { y: 6, r: -1 }, { y: -6, r: 2 },
  { y: 8, r: -2 },
];

/* =====================================================================
   TAG — bordered label with a colored highlighter bar underneath
===================================================================== */

function TagLabel({ children, color }: { children: string; color: string }) {
  return (
    <div className="relative inline-flex">
      <span className="relative z-10 rounded-sm border border-line bg-surface px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-text">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute -bottom-1.5 left-1.5 right-1.5 h-2 rounded-sm opacity-80"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

/* =====================================================================
   ORBIT RING — a full-bleed layer, pivoted at the diagram's bottom-
   center. The wrapper drifts back and forth by a small amplitude (NOT
   a full 360° spin) so icons never swing below the box's horizon line
   and get clipped. Each icon counter-rotates so the glyph stays upright.
===================================================================== */

const DRIFT_DEGREES = 7;

function useOrbitRotation(duration: number, direction: 1 | -1) {
  const rotate = useMotionValue(0);
  const counterRotate = useTransform(rotate, (v) => -v);

  useEffect(() => {
    const controls = animate(
      rotate,
      [0, DRIFT_DEGREES * direction, 0, -DRIFT_DEGREES * direction, 0],
      {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }
    );
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { rotate, counterRotate };
}

function OrbitRing({ ring, zIndex }: { ring: Ring; zIndex: number }) {
  const { rotate, counterRotate } = useOrbitRotation(ring.duration, ring.direction);
  const count = ring.icons.length;

  return (
    <motion.div
      style={{ rotate, originX: 0.5, originY: 1, zIndex }}
      className="absolute inset-0"
    >
      {ring.icons.map((iconData, j) => {
        const angle = ring.phase + j * (ANGLE_SPAN / count);
        const { left, top } = polarPosition(ring.radius, angle);
        return (
          <div
            key={iconData.id}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.5, delay: j * stagger.tight, ease: ease.out }}
              style={{ width: ring.size, height: ring.size, rotate: counterRotate }}
              className="flex items-center justify-center rounded-full border border-line bg-surface shadow-lg shadow-black/30"
              aria-label={iconData.label}
            >
              <span style={{ color: iconData.color }} className="flex items-center justify-center">
                {iconData.icon}
              </span>
            </motion.div>
            <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-surface-raised px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {iconData.label}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

/* =====================================================================
   ORBIT GLOBE — the sphere every ring orbits. Sized so its radius
   (11% of BOX_W) sits safely inside the inner ring's radius (15% of
   BOX_W) — previously this was 16% vs 15%, which is why icons like
   Python/TypeScript/JS were rendering on top of the globe instead of
   in front of it. The outer wrapper is a static circular frame
   (border/glow/clip); the lat/long lines + star-field dots sit on
   their own motion.div that spins continuously, so the globe visibly
   rotates in place while the rings drift around it.
===================================================================== */

function OrbitGlobe() {
  return (
    <div
      aria-hidden="true"
      className="absolute z-0 overflow-hidden rounded-full"
      style={{
        left: "50%",
        top: "92%",
        width: "22%",
        aspectRatio: "1 / 1",
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle at 34% 28%, rgba(217,107,62,0.5), rgba(20,23,27,0.92) 55%, rgba(11,13,16,0.98) 78%)",
        border: "1px solid rgba(232,230,225,0.16)",
        boxShadow:
          "0 0 70px 14px rgba(217,107,62,0.16), inset 0 0 28px rgba(0,0,0,0.65)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <ellipse cx="50" cy="50" rx="46" ry="13" fill="none" stroke="rgba(232,230,225,0.2)" strokeWidth="0.6" />
          <ellipse cx="50" cy="50" rx="46" ry="28" fill="none" stroke="rgba(232,230,225,0.14)" strokeWidth="0.6" />
          <ellipse cx="50" cy="50" rx="13" ry="46" fill="none" stroke="rgba(232,230,225,0.14)" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(232,230,225,0.24)" strokeWidth="0.8" />
        </svg>
        {globeDots.map((dot, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="relative overflow-hidden px-3 py-16 sm:px-6 lg:px-8 xl:px-10">
      {/* =========================================================
          OUTER FRAME — this is the section's own bordered box (same
          language as Contact.tsx's intake card), NOT the orbit
          diagram itself. The orbit diagram below is deliberately
          borderless.
      ========================================================= */}
      <div className="relative border border-line p-5 sm:p-7 lg:p-9">
        <span
          aria-hidden="true"
          className="absolute -right-px -top-px h-4 w-4 border-r border-t"
          style={{ borderColor: "rgba(232,230,225,0.4)" }}
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-px -left-px h-4 w-4 border-b border-l"
          style={{ borderColor: "rgba(232,230,225,0.4)" }}
        />

        {/* =========================================================
            ACTIVE CONSTELLATION — intro banner
        ========================================================= */}
        <div className="mb-8 border-b border-line pb-6 md:mb-10 md:pb-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-mono text-xs uppercase tracking-[0.2em] text-signal"
              >
                Active Constellation
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08, ease: ease.out }}
                className="mt-3 text-text"
                style={{
                  fontFamily: HEADLINE_FONT,
                  fontWeight: 700,
                  fontSize: "clamp(1.9rem, 4vw, 3rem)",
                  lineHeight: 1.05,
                }}
              >
                Tools that move ideas.
              </motion.h3>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="hidden items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-text-muted md:flex"
            >
              {processSteps.map((step, i) => (
                <span key={step} className="flex items-center gap-3">
                  {step}
                  {i < processSteps.length - 1 && (
                    <span className="text-accent" aria-hidden="true">
                      ✦
                    </span>
                  )}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted md:text-right"
            >
              {CREDIT_NAME}
              <span className="mx-2 text-text-muted/50">/</span>
              {CREDIT_TAGLINE.map((word, i) => (
                <span key={word}>
                  {i > 0 && (
                    <span className="mx-1.5 text-accent" aria-hidden="true">
                      ·
                    </span>
                  )}
                  {word}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* =========================================================
            MAIN ROW — capability-map text on the left, the orbit
            diagram (with its own proof-in-practice callout) on the
            right, side by side in one row, matching the reference.
        ========================================================= */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-10 xl:grid-cols-[320px_1fr] xl:gap-14">
          <div className="max-w-md">
            <TagLabel color="#3b5bfd">03 / Capability Map</TagLabel>
            <h2
              className="mt-5 leading-[0.95] text-text"
              style={{
                fontFamily: HEADLINE_FONT,
                fontWeight: 700,
                fontSize: "clamp(2.6rem, 6.5vw, 4.75rem)",
              }}
            >
              <RevealText as="div">
                <span style={{ fontStyle: "italic" }}>Skills</span>
              </RevealText>
              <RevealText as="div" delay={0.08}>in</RevealText>
              <RevealText as="div" delay={0.16}>Orbit</RevealText>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.3, ease: ease.out }}
              className="mt-6 max-w-sm text-sm leading-relaxed text-text-muted"
            >
              Languages, frameworks and tools do not sit in separate boxes
              here. They revolve around the same job: turning an unusual
              idea into something useful.
            </motion.p>
          </div>

          {/* orbit column — tablet/desktop only; screens below `lg` get
              the pill cloud further down instead. */}
          <div className="hidden lg:block">
            {/* proof-in-practice callout */}
            <div className="hidden xl:flex xl:flex-col xl:items-end">
              <TagLabel color="#d9503e">Proof in Practice</TagLabel>
              <div className="mt-4 flex flex-col items-end gap-2.5">
                {proofBadges.map((badge, i) => (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: ease.out }}
                    className="block rounded-md border border-line bg-surface px-4 py-2 text-right font-mono text-[11px] uppercase tracking-wide text-text-muted"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* =====================================================
                ORBIT VIEWPORT — a small, SQUARE, BORDERLESS window
                (mx-auto, capped width) that clips the wider internal
                1000×520 canvas at its left/right edges. This is what
                produces the "cut off in a square" framing from the
                reference, and capping its width is what shrinks the
                whole diagram's footprint (height included, since a
                square's height == its width).
            ===================================================== */}
            <div className="relative mx-auto mt-6 aspect-square w-full max-w-[480px] overflow-hidden xl:mt-8">
              {/* internal canvas — deliberately wider than the square
                  viewport (CANVAS_WIDTH_PERCENT ≈ 192% of the
                  viewport's width), centered horizontally so its own
                  center (the rings' pivot column) lines up with the
                  viewport's center. Everything inside keeps using the
                  original 1000×520 percentage-based math untouched. */}
              <div
                className="absolute left-1/2 top-0 h-full -translate-x-1/2"
                style={{ width: `${CANVAS_WIDTH_PERCENT}%` }}
              >
                {/* static guide arcs — one per ring */}
                <svg
                  viewBox={`0 0 ${BOX_W} ${BOX_H}`}
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  {rings.map((r, i) => (
                    <path
                      key={r.id}
                      d={arcPath(r.radius, r.phase - 8, r.phase + ANGLE_SPAN + 8)}
                      fill="none"
                      stroke="var(--color-line)"
                      strokeWidth={1}
                      opacity={0.55 - i * 0.08}
                    />
                  ))}
                </svg>

                {/* the rotating globe every ring orbits around */}
                <OrbitGlobe />

                {rings.map((ring, i) => (
                  <OrbitRing key={ring.id} ring={ring} zIndex={rings.length - i} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* skill cloud — fallback below `lg` */}
        <div className="relative mx-auto mt-12 flex max-w-lg flex-wrap items-center justify-center gap-3 lg:hidden">
          {skills.map((skill, i) => {
            const { y, r } = layout[i % layout.length];
            const isDimmed = hoveredCategory !== null && hoveredCategory !== skill.category;
            const isHighlighted = hoveredCategory === skill.category;

            return (
              <motion.button
                key={skill.name}
                type="button"
                onClick={() =>
                  setHoveredCategory(
                    hoveredCategory === skill.category ? null : skill.category
                  )
                }
                initial={{ opacity: 0, y: y + 20, rotate: r }}
                whileInView={{ opacity: 1, y, rotate: r }}
                viewport={{ once: true, amount: 0.3 }}
                animate={{
                  opacity: isDimmed ? 0.35 : 1,
                  scale: isHighlighted ? 1.08 : 1,
                  rotate: isHighlighted ? 0 : r,
                  y: isHighlighted ? 0 : y,
                }}
                transition={{ duration: 0.6, delay: i * 0.035, ease: ease.out }}
                className="cursor-default select-none rounded-full border border-line bg-surface px-5 py-2 font-mono text-sm text-text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {skill.name}
              </motion.button>
            );
          })}
        </div>
        <motion.p
          animate={{ opacity: hoveredCategory ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-6 text-center font-mono text-xs uppercase tracking-[0.15em] text-accent lg:hidden"
        >
          {hoveredCategory ?? ""}
        </motion.p>
      </div>
    </section>
  );
}