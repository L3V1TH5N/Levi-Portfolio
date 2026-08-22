"use client";

import { motion } from "framer-motion";
import Marquee from "@/components/Marquee";
import { ease } from "@/lib/motion";
import {
  SiMysql,
  SiHtml5,
  SiCss,
  SiReact,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiOpenjdk,
  SiJavascript,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiPhp,
  SiGit,
  SiGithub,
  SiThreedotjs,
  SiGodotengine,
  SiBlender,
} from "react-icons/si";

/* =====================================================================
   FONT
   ONE font family is used for this entire section — the "Hello, I'm"
   headline, the intro paragraph, the Experience/Skills headers and rows,
   and the polaroid captions. It's a casual, rounded HANDWRITTEN font
   (not a geometric sans like Poppins — compare the paragraph text and
   "Experience"/"Skills" headers to the headline: same family, just
   lighter weight and smaller size for body copy, bold + huge for the
   headline).

   Kalam is the closest easy-to-install match — it has the right
   moderate, legible handwriting character at both small body sizes and
   large bold headline sizes. Caveat/Shantell Sans are close backups if
   Kalam doesn't read casual/bold enough once installed.
     npm install @fontsource/kalam
   and add to layout.tsx (replacing the Poppins imports, which aren't
   used anywhere else in this project):
     import "@fontsource/kalam/400.css";
     import "@fontsource/kalam/700.css";
===================================================================== */
const DISPLAY_FONT = "'Kalam', 'Caveat', cursive";

const experience = [
  {
    period: "2025",
    role: "Full Stack Dev (Intern)",
    note: "Municipal Treasurer's Office, Ternate — built their expense management system",
  },
  {
    period: "2025",
    role: "Full Stack Dev (OJT)",
    note: "ODCI — document management system with role-based access",
  },
  {
    period: "2025–26",
    role: "Full Stack Developer",
    note: "CvSUHimay — 3D fish deboning simulator for CvSU's Fisheries program, built with React Three Fiber",
  },
  {
    period: "Now",
    role: "Freelancing",
    note: "Full stack + AI work, including GetUp (AI-verified alarm app)",
  },
];

// Two explicit columns so the order matches the reference layout exactly —
// left column top-to-bottom, then right column top-to-bottom. Sourced
// directly from the resume's Technical Skills section (dropped a few
// items — Dart, Flutter/Expo, scikit-learn/TensorFlow, Unity, Postman,
// VS Code, Bootstrap — to keep the grid at a readable 18 entries; swap
// any of these back in if you'd rather feature them over what's here).
const skillsLeft = [
  { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#d4b106" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "React / RN", Icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", Icon: SiExpress, color: "#6b6b6b" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
];

const skillsRight = [
  { name: "Java", Icon: SiOpenjdk, color: "#437291" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#1a1a1a" },
  { name: "Godot Engine", Icon: SiGodotengine, color: "#478CBF" },
  { name: "Blender", Icon: SiBlender, color: "#E87D0D" },
  { name: "GitHub", Icon: SiGithub, color: "#181717" },
];

const polaroids = [
  {
    image: "/images/image-1.jpg",
    caption: "where curiosity began ♡",
    rotate: -5,
  },
  {
    image: "/images/image-2.jpg",
    caption: "always collecting stories",
    rotate: 3,
  },
  {
    image: "/images/image-3.jpg",
    caption: "still curious :)",
    rotate: -2,
  },
];

function SkillRow({
  name,
  Icon,
  color,
  abbr,
}: {
  name: string;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }> | null;
  color: string;
  abbr?: string;
}) {
  return (
    <span
      className="flex items-center gap-2 text-[14px]"
      style={{ color: "#2c2a26", fontFamily: DISPLAY_FONT, fontWeight: 500 }}
    >
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
        style={{
          backgroundColor: "rgba(255,255,255,0.65)",
          boxShadow: "0 1px 3px rgba(0,0,0,.1)",
        }}
      >
        {Icon ? (
          <Icon size={13} style={{ color }} />
        ) : (
          <span className="font-mono text-[9px] font-bold" style={{ color }}>
            {abbr}
          </span>
        )}
      </span>
      {name}
    </span>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#e8e2d4", color: "#171717" }}
    >
      {/* =========================================================
          PAPER GRID — slightly larger/lighter cells + a soft
          vignette so the paper reads as scanned rather than flat.
      ========================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 0.3,
          backgroundImage: `
            linear-gradient(to right, rgba(30,30,30,0.11) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(30,30,30,0.11) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(30,28,22,0.06) 100%)",
        }}
      />

      {/* =========================================================
          PAPER GRAIN / NOISE — z-1, isolated from the content grid
          below (which forms its own stacking context via `isolate`),
          so it can never blend on top of the photos.
      ========================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.14] mix-blend-multiply"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.42'/%3E%3C/svg%3E")
          `,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />

      {/* =========================================================
          TOP RIGHT NOTE
      ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: -5, rotate: 1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute right-8 top-6 z-30 hidden border px-3.5 py-2 md:block"
        style={{
          borderColor: "rgba(20,20,20,.22)",
          backgroundColor: "rgba(239,235,225,.75)",
          boxShadow: "0 1px 2px rgba(0,0,0,.04)",
          fontFamily: "monospace",
          fontSize: "14px",
          letterSpacing: "0.06em",
          transform: "rotate(-2deg)",
        }}
      >
        EVERY FRAME IS ART.
      </motion.div>

      {/* =========================================================
          MAIN POSTER — `isolate` gives this its own stacking
          context so the grain/vignette layers above can never
          paint over anything inside it (photos included).
      ========================================================= */}
      <div
        className="
          relative
          z-10
          grid
          min-h-[calc(100svh-52px)]
          grid-cols-1
          md:grid-cols-[40%_60%]
        "
        style={{ isolation: "isolate" }}
      >
        {/* =======================================================
            LEFT SIDE — ARTWORK
        ======================================================= */}
        <div className="relative hidden overflow-visible md:block">
          <motion.img
            src="/images/about-illustration.png"
            alt=""
            aria-hidden="true"
            data-no-grain
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: ease.out }}
            className="
              absolute
              inset-0
              left-[-5%]
              z-10
              h-full
              w-[112%]
              max-w-none
              object-cover
              object-top
            "
            style={{ filter: "none", mixBlendMode: "normal" }}
          />

          {/* Blue offset/shadow accent behind artwork */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[7%] left-[7%] z-[5] h-[78%] w-[78%] opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #315fc4 0%, transparent 68%)",
            }}
          />

          {/* ARTWORK QUOTE */}
          <motion.div
            initial={{ opacity: 0, x: 10, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="absolute bottom-[14%] right-[10%] z-30 max-w-[240px] border px-3 py-2.5"
            style={{
              borderColor: "rgba(49,95,196,0.35)",
              backgroundColor: "rgba(255,255,255,0.4)",
              boxShadow: "3px 4px 0px rgba(49,95,196,0.08)",
            }}
          >
            <p
              className="text-[12.5px] leading-[1.6]"
              style={{
                fontFamily: DISPLAY_FONT,
                fontWeight: 500,
                color: "#1f1f1f",
                textDecorationLine: "underline",
                textDecorationColor: "#315fc4",
                textUnderlineOffset: "3px",
                textDecorationThickness: "1px",
              }}
            >
              Remember, every model is a human opinion embedded in
              mathematics.
            </p>
          </motion.div>
        </div>

        {/* =======================================================
            RIGHT SIDE — INFORMATION
        ======================================================= */}
        <div
          className="
            relative
            flex
            min-h-full
            flex-col
            px-6
            pb-7
            pt-7
            sm:px-8
            md:px-7
            lg:px-10
            xl:px-12
          "
        >
          {/* ABOUT ME LABEL */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block px-3 py-1.5 text-white"
              style={{
                backgroundColor: "#315fc4",
                fontFamily: "monospace",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              ABOUT ME
            </span>
          </motion.div>

          {/* HERO TITLE — same handwritten font as the rest of the section,
              just bold and much larger */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.08, ease: ease.out }}
            className="relative z-20 mt-3 whitespace-nowrap"
            style={{
              fontFamily: DISPLAY_FONT,
              fontSize: "clamp(2.1rem, 3.6vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Hello! I&apos;m{" "}
            <span style={{ color: "#315fc4" }}>Gavriell Pangan.</span>
          </motion.h2>

          {/* CONTENT AREA */}
          <div
            className="
              mt-8
              grid
              grid-cols-1
              gap-10
              md:grid-cols-[0.95fr_0.75fr_0.95fr]
              lg:gap-12
            "
          >
            {/* INTRODUCTION — same font, regular weight */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-[340px] text-[22px] leading-[1.55]"
              style={{ color: "#55514c", fontFamily: DISPLAY_FONT, fontWeight: 400 }}
            >
              Whether it is a serious project or a late-night experiment, I
              am usually designing, testing, or building. I enjoy turning
              complex systems into experiences that feel clear, expressive
              and human. I care about fast, accessible interfaces, reliable
              data tools and thoughtful micro-interactions. I follow unusual
              ideas until they become useful, real things.
            </motion.p>

            {/* EXPERIENCE */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3
                className="text-[26px] leading-[1.1] sm:text-[28px]"
                style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, color: "#171717" }}
              >
                Experience
              </h3>

              <div className="mt-5 flex flex-col gap-5">
                {experience.map((e) => (
                  <div key={e.period} className="grid grid-cols-[46px_1fr] gap-2">
                    <span
                      className="text-[12px] sm:text-[13px]"
                      style={{
                        color: "#315fc4",
                        fontFamily: "monospace",
                        fontWeight: 600,
                        fontStyle: "italic",
                      }}
                    >
                      {e.period}
                    </span>

                    <div>
                      <p
                        className="text-[15px] leading-[1.2] sm:text-[16px]"
                        style={{ fontFamily: DISPLAY_FONT, fontWeight: 600, color: "#171717" }}
                      >
                        {e.role}
                      </p>
                      <p
                        className="mt-1 text-[12.5px] leading-[1.35] sm:text-[13px]"
                        style={{ color: "#77716a", fontFamily: DISPLAY_FONT, fontWeight: 400 }}
                      >
                        {e.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* SKILLS */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.26 }}
            >
              <h3
                className="text-[26px] leading-[1.1] sm:text-[28px]"
                style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, color: "#171717" }}
              >
                Skills
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
                <div className="flex flex-col gap-2.5">
                  {skillsLeft.map((s) => (
                    <SkillRow key={s.name} {...s} />
                  ))}
                </div>
                <div className="flex flex-col gap-2.5">
                  {skillsRight.map((s) => (
                    <SkillRow key={s.name} {...s} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* =====================================================
              POLAROIDS — isolate + explicit no-filter/no-blend so
              nothing from the paper/grain layers can wash them out.
          ===================================================== */}
          <div className="mt-auto pt-8">
            <div className="flex items-end justify-start gap-6 sm:gap-8 lg:gap-10 xl:gap-11">
              {polaroids.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: ease.out }}
                  style={{ rotate: p.rotate, isolation: "isolate" }}
                  className="
                    relative
                    w-[230px]
                    shrink-0
                    bg-[#f8f6f0]
                    p-3.5
                    pb-6
                    shadow-[0_5px_12px_rgba(0,0,0,.12)]
                    sm:w-[275px]
                    lg:w-[310px]
                    xl:w-[335px]
                  "
                >
                  {/* TAPE */}
                  <span
                    className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2"
                    style={{
                      backgroundColor: "#e4d5b9",
                      opacity: 0.82,
                      boxShadow: "0 1px 2px rgba(0,0,0,.06)",
                    }}
                  />

                  {/* IMAGE — data-no-grain excludes it from the global
                      GrainOverlay; no filter/blend-mode is applied here
                      so colors stay true to the source photo. */}
                  <div
                    className="aspect-[4/3] overflow-hidden bg-white"
                    style={{ isolation: "isolate" }}
                  >
                    <img
                      src={p.image}
                      alt={p.caption}
                      data-no-grain
                      className="h-full w-full object-cover"
                      style={{ filter: "none", mixBlendMode: "normal" }}
                    />
                  </div>

                  {/* CAPTION */}
                  <p
                    className="mt-3 text-center text-[14.5px] sm:text-[15px]"
                    style={{ color: "#4f4a45", fontFamily: DISPLAY_FONT, fontWeight: 500 }}
                  >
                    {p.caption}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM MARQUEE
      ========================================================= */}
      <div className="relative z-40 overflow-hidden border-t border-white/10 bg-[#111111] py-3">
        <Marquee
          items={[
            "DESIGN",
            "DATA",
            "AI",
            "AUTOMATION",
            "CREATIVE TECHNOLOGY",
            "TECHNOLOGY",
          ]}
          duration={22}
        />
      </div>
    </section>
  );
}