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
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Python", Icon: SiPython },
  { name: "Three.js", Icon: SiThreedotjs },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
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
              bottom-[15%]
              right-[-3%]
              z-30
              max-w-[225px]
              px-2
              py-1
            "
          >
            <p
              className="text-[11px] leading-[1.25]"
              style={{
                fontFamily:
                  "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                color: "#171717",
              }}
            >
              Remember, every model is a human opinion embedded in
              mathematics.
            </p>

            <div
              className="mt-1 h-[2px] w-[92%]"
              style={{
                backgroundColor: "#315fc4",
              }}
            />
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
              tracking-tight
            "
            style={{
              fontFamily:
                "'Arial', 'Helvetica Neue', sans-serif",
              fontSize: "clamp(2.4rem, 4.25vw, 4.6rem)",
              fontWeight: 800,
              lineHeight: 0.92,
            }}
          >
            Hello! I&apos;m{" "}
            <span
              style={{
                color: "#315fc4",
                fontFamily:
                  "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                fontStyle: "italic",
                fontWeight: 600,
                letterSpacing: "-0.045em",
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
              mt-5
              grid
              grid-cols-1
              gap-7
              md:grid-cols-[1.02fr_1fr]
              lg:grid-cols-[1.04fr_1fr]
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
                  max-w-[310px]
                  text-[14px]
                  leading-[1.47]
                  lg:text-[15px]
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
                  mt-5
                  max-w-[310px]
                  text-[14px]
                  leading-[1.47]
                  lg:text-[15px]
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
            <div className="grid grid-cols-2 gap-5">
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
                  className="text-[22px] font-bold"
                  style={{
                    fontFamily:
                      "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                  }}
                >
                  Experience
                </h3>

                <div className="mt-4 flex flex-col gap-4">
                  {experience.map((e) => (
                    <div
                      key={e.period}
                      className="grid grid-cols-[48px_1fr] gap-2"
                    >
                      <span
                        className="text-[10px] font-semibold"
                        style={{
                          color: "#315fc4",
                          fontFamily: "monospace",
                        }}
                      >
                        {e.period}
                      </span>

                      <div>
                        <p
                          className="text-[13px] font-semibold leading-tight"
                          style={{
                            fontFamily:
                              "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                          }}
                        >
                          {e.role}
                        </p>

                        <p
                          className="mt-1 text-[9px] leading-[1.25]"
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
                  className="text-[22px] font-bold"
                  style={{
                    fontFamily:
                      "'Comic Sans MS', 'Segoe Print', 'Bradley Hand', cursive",
                  }}
                >
                  Skills
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                  {skills.map(({ name, Icon }) => (
                    <span
                      key={name}
                      className="flex items-center gap-1.5 text-[9px]"
                      style={{
                        color: "#403d39",
                        fontFamily: "monospace",
                      }}
                    >
                      <Icon
                        size={12}
                        style={{
                          color: "#77736d",
                        }}
                      />
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
                gap-3
                sm:gap-4
                lg:gap-5
              "
            >
              {polaroids.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 20,
                    rotate: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotate: p.rotate,
                  }}
                  whileHover={{
                    y: -6,
                    rotate: 0,
                    scale: 1.025,
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
                    w-[150px]
                    shrink-0
                    bg-[#f8f6f0]
                    p-2
                    pb-5
                    shadow-[0_5px_12px_rgba(0,0,0,.12)]
                    sm:w-[165px]
                    lg:w-[190px]
                    xl:w-[205px]
                  "
                >
                  {/* TAPE */}
                  <span
                    className="
                      absolute
                      -top-2
                      left-1/2
                      h-4
                      w-11
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
                    className="mt-2 text-center text-[9px]"
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