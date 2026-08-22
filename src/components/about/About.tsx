"use client";

import { motion } from "framer-motion";
import Marquee from "@/components/Marquee";
import { ease } from "@/lib/motion";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiThreedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiFirebase,
  SiGit,
  SiGithub,
} from "react-icons/si";

const experience = [
  {
    period: "2021—25",
    role: "Computer Science",
    note: "Cavite State University",
  },
  {
    period: "2024",
    role: "Freelance Developer",
    note: "Independent full stack work",
  },
  {
    period: "Now",
    role: "Building",
    note: "Systems, simulations, and practical tools",
  },
];

const skills = [
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F0DB4F" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#111111" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#111111" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
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

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#e8e2d4",
        color: "#171717",
      }}
    >
      {/* =========================================================
          PAPER GRID
      ========================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 0.34,
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(30, 30, 30, 0.12) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(30, 30, 30, 0.12) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* =========================================================
          PAPER GRAIN / NOISE
      ========================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.16] mix-blend-multiply"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.42'/%3E%3C/svg%3E")
          `,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />

      {/* =========================================================
          VERY SUBTLE PAPER LIGHT / DARK VARIATION
      ========================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255,255,255,.22), transparent 55%), radial-gradient(circle at 15% 80%, rgba(0,0,0,.035), transparent 35%)",
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
        className="absolute right-6 top-5 z-30 hidden border px-3 py-1.5 md:block"
        style={{
          borderColor: "rgba(20,20,20,.22)",
          backgroundColor: "rgba(239,235,225,.75)",
          boxShadow: "0 1px 2px rgba(0,0,0,.04)",
          fontFamily: "monospace",
          fontSize: "9px",
          letterSpacing: "0.06em",
          transform: "rotate(1deg)",
        }}
      >
        EVERY FRAME IS ART.
      </motion.div>

      {/* =========================================================
          MAIN POSTER
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
      >
        {/* =======================================================
            LEFT SIDE — ARTWORK
        ======================================================= */}
        <div className="relative hidden overflow-visible md:block">
          <motion.img
            src="/images/about-illustration.png"
            alt=""
            aria-hidden="true"
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: ease.out,
            }}
            className="
              absolute
              bottom-0
              left-[-7%]
              z-10
              h-[99%]
              w-[120%]
              max-w-none
              object-contain
              object-bottom
            "
          />

          {/* Blue offset/shadow accent behind artwork */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-[7%]
              left-[7%]
              z-[5]
              h-[78%]
              w-[78%]
              opacity-20
              blur-3xl
            "
            style={{
              background:
                "radial-gradient(circle, #315fc4 0%, transparent 68%)",
            }}
          />

          {/* =====================================================
              ARTWORK QUOTE
          ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: 10,
              rotate: -3,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              rotate: -3,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.35,
            }}
            className="
              absolute
              bottom-[14%]
              right-[10%]
              z-30
              max-w-[240px]
              border
              px-3
              py-2.5
            "
            style={{
              borderColor: "rgba(49,95,196,0.35)",
              backgroundColor: "rgba(255,255,255,0.4)",
              boxShadow: "3px 4px 0px rgba(49,95,196,0.08)",
            }}
          >
            <p
              className="text-[12.5px] leading-[1.6]"
              style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
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
          {/* =====================================================
              ABOUT ME LABEL
          ===================================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <span
              className="inline-block px-2.5 py-1 text-white"
              style={{
                backgroundColor: "#315fc4",
                fontFamily: "monospace",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              ABOUT ME
            </span>
          </motion.div>

          {/* =====================================================
              HERO TITLE
          ===================================================== */}
          <motion.h2
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease: ease.out,
            }}
            className="
              relative
              z-20
              mt-3
              whitespace-nowrap
            "
            style={{
              fontFamily:
                "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
              fontSize: "clamp(2.6rem, 4.9vw, 6rem)",
              fontWeight: 700,
              lineHeight: 0.92,
            }}
          >
            Hello! I&apos;m{" "}
            <span
              style={{
                color: "#315fc4",
              }}
            >
              Gavriell Pangan.
            </span>
          </motion.h2>

          {/* =====================================================
              CONTENT AREA
          ===================================================== */}
          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-12
              md:grid-cols-[1fr_1.75fr]
              lg:grid-cols-[1fr_1.85fr]
            "
          >
            {/* ===================================================
                INTRODUCTION
            =================================================== */}
            <div>
              <motion.p
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.15,
                }}
                className="
                  max-w-[380px]
                  text-[19px]
                  leading-[1.5]
                  lg:text-[22px]
                "
                style={{
                  color: "#55514c",
                  fontFamily:
                    "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                }}
              >
                Whether it&apos;s a serious project or a late-night
                experiment, I&apos;m usually designing, testing, or building
                something. I enjoy turning ideas into functional systems
                while exploring the intersection of software engineering,
                interaction design, and creative technology.
              </motion.p>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.22,
                }}
                className="
                  mt-8
                  max-w-[380px]
                  text-[19px]
                  leading-[1.5]
                  lg:text-[22px]
                "
                style={{
                  color: "#55514c",
                  fontFamily:
                    "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                }}
              >
                I care about offline-first reliability, clear interfaces,
                and tools that hold up under real use — not just in a demo.
              </motion.p>
            </div>

            {/* ===================================================
                EXPERIENCE + SKILLS
            =================================================== */}
            <div className="grid grid-cols-2 gap-10">
              {/* EXPERIENCE */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
              >
                <h3
                  className="text-[34px] leading-[1.05] sm:text-[42px] lg:text-[52px] font-bold"
                  style={{
                    fontFamily:
                      "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                  }}
                >
                  Experience
                </h3>

                <div className="mt-6 flex flex-col gap-7">
                  {experience.map((e) => (
                    <div
                      key={e.period}
                      className="grid grid-cols-[64px_1fr] gap-3"
                    >
                      <span
                        className="text-[18px] sm:text-[20px] font-semibold"
                        style={{
                          color: "#315fc4",
                          fontFamily: "monospace",
                          fontStyle: "italic",
                        }}
                      >
                        {e.period}
                      </span>

                      <div>
                        <p
                          className="text-[26px] sm:text-[32px] lg:text-[38px] font-semibold leading-[1.05]"
                          style={{
                            fontFamily:
                              "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                          }}
                        >
                          {e.role}
                        </p>

                        <p
                          className="mt-1.5 text-[16px] sm:text-[18px] leading-[1.3]"
                          style={{
                            color: "#77716a",
                            fontFamily:
                              "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                          }}
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
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.26,
                }}
              >
                <h3
                  className="text-[34px] leading-[1.05] sm:text-[42px] lg:text-[52px] font-bold"
                  style={{
                    fontFamily:
                      "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                  }}
                >
                  Skills
                </h3>

                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
                  {skills.map(({ name, Icon, color }) => (
                    <span
                      key={name}
                      className="flex items-center gap-2 text-[15px] sm:text-[17px]"
                      style={{
                        color: "#2c2a26",
                        fontFamily:
                          "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                      }}
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.65)",
                          boxShadow: "0 1px 3px rgba(0,0,0,.1)",
                        }}
                      >
                        <Icon size={15} style={{ color }} />
                      </span>
                      {name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* =====================================================
              POLAROIDS
          ===================================================== */}
          <div className="mt-auto pt-8">
            <div
              className="
                flex
                items-end
                justify-start
                gap-6
                sm:gap-8
                lg:gap-10
                xl:gap-11
              "
            >
              {polaroids.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: i * 0.1,
                    ease: ease.out,
                  }}
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
                    className="
                      absolute
                      -top-3
                      left-1/2
                      h-6
                      w-16
                      -translate-x-1/2
                    "
                    style={{
                      backgroundColor: "#e4d5b9",
                      opacity: 0.82,
                      boxShadow: "0 1px 2px rgba(0,0,0,.06)",
                    }}
                  />

                  {/* IMAGE */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.caption}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* CAPTION */}
                  <p
                    className="mt-3 text-center text-[15px] sm:text-[16px]"
                    style={{
                      color: "#4f4a45",
                      fontFamily:
                        "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                    }}
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
      <div
        className="
          relative
          z-40
          overflow-hidden
          border-t
          border-white/10
          bg-[#111111]
          py-3
        "
      >
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