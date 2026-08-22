"use client";

import RevealText from "@/components/motion/RevealText";
import ScrollReveal from "@/components/motion/ScrollReveal";

const socials = [
  { label: "GitHub", href: "https://github.com/L3V1TH5N" },
  { label: "Instagram", href: "https://www.instagram.com/gaavrielll/" },
  { label: "Facebook", href: "https://www.facebook.com/gav.pangan" },
];

const focusPoints = [
  { number: "01", label: "Think", title: ["Clear", "Direction"] },
  { number: "02", label: "Build", title: ["Useful", "Systems"] },
  { number: "03", label: "Ship", title: ["Real", "Outcomes"] },
];

const EMAIL = "gavriell.pangann@gmail.com";
const SUBJECT = "Portfolio project inquiry";
const BODY = [
  "Hi Gavriell,",
  "",
  "I'd like to start a conversation about:",
  "",
  "Project or idea: ",
  "Timeline: ",
  "Budget range: ",
  "",
  "Thanks!",
].join("\n");

// Gmail's web compose URL — opens straight into a Gmail compose tab with
// recipient/subject/body pre-filled, instead of relying on whatever the
// visitor's OS has registered as the default mailto: handler.
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  EMAIL
)}&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-line">
      <div className="px-6 pt-8 md:px-16">
        {/* =====================================================
            STATUS BAR
        ===================================================== */}
        <ScrollReveal>
          <div className="flex flex-col gap-3 pb-6 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              Available for ideas with a point of view
            </span>
            <span>Philippines Based / Building Worldwide</span>
          </div>
        </ScrollReveal>
      </div>

      {/* full-width divider under status bar */}
      <div className="border-t border-line" />

      <div className="px-6 py-16 md:px-16 md:py-20">
        {/* =====================================================
            EYEBROW
        ===================================================== */}
        <ScrollReveal delay={0.05}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
            The Next System Starts With a Conversation
          </p>
        </ScrollReveal>

        {/* =====================================================
            HEADLINE + INTAKE CARD
            items-end: the card keeps its own natural/compact size
            and gets pushed down so its BOTTOM edge lines up with the
            focus row's bottom edge — extra space sits above the card,
            not stretched inside the mail box.
        ===================================================== */}
        <div className="mt-8 grid grid-cols-1 items-end gap-14 md:grid-cols-[1fr_380px] md:gap-10 lg:grid-cols-[1fr_420px]">
          {/* ---------------- LEFT: headline + focus row ---------------- */}
          <div>
            <h2
              className="font-display font-bold leading-[0.95] tracking-tight text-text"
              style={{ fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)" }}
            >
              <RevealText as="div">Let&apos;s make</RevealText>
              <RevealText as="div" delay={0.08}>
                something worth
              </RevealText>
              <RevealText as="div" delay={0.16}>
                <span
                  style={{
                    WebkitTextStroke: "1.5px var(--color-text)",
                    color: "transparent",
                  }}
                >
                  remembering.
                </span>
              </RevealText>
            </h2>

            {/* focus row — boxed grid (border-t + border-l on container,
                border-r + border-b per cell) so every cell is a closed box */}
            <div className="mt-16 grid grid-cols-1 border-l border-t border-line sm:grid-cols-3">
              {focusPoints.map((point, i) => (
                <ScrollReveal key={point.number} delay={0.1 + i * 0.06}>
                  <div className="h-full border-b border-r border-line p-6">
                    <p className="font-mono text-xs uppercase tracking-wide text-text-muted">
                      {point.number} / {point.label}
                    </p>
                    <p className="mt-0 font-display text-xl font-bold uppercase leading-[1.05] text-text sm:text-2xl">
                      {point.title[0]}
                      <br />
                      {point.title[1]}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ---------------- RIGHT: intake card — natural height,
              bottom-aligned to the row via items-end above ---------------- */}
          <ScrollReveal delay={0.2}>
            <div className="relative border border-line p-4">
              {/* corner brackets */}
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

              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-text-muted">
                <span>Project Intake / Open</span>
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              </div>

              {/* opens a Gmail compose tab, pre-filled */}
              <a
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-4 flex flex-col justify-between gap-8 px-5 py-5 transition-colors"
                style={{ backgroundColor: "#f2ede3", color: "#171717" }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 border border-transparent transition-colors duration-200 group-hover:border-black/70"
                />
                <span className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wide">
                  Start a Conversation
                  <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </span>
                <span className="block break-all font-mono text-lg font-bold sm:text-xl">
                  {EMAIL}
                </span>
              </a>

              <div className="mt-4 grid grid-cols-2 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-wide">
                <div className="border-r border-line pr-4">
                  <p className="text-text-muted">Response</p>
                  <p className="mt-1 text-text">24–48 Hours</p>
                </div>
                <div className="pl-4">
                  <p className="text-text-muted">Work Mode</p>
                  <p className="mt-1 text-text">Remote / Worldwide</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* =====================================================
            SOCIAL LINKS ROW — boxed grid; hover inverts the whole
            cell to a cream fill with dark text, matching reference
        ===================================================== */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 grid grid-cols-1 border-l border-t border-line font-mono text-xs uppercase tracking-wide text-text-muted sm:grid-cols-3">
            {socials.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 border-b border-r border-line px-6 py-5 transition-colors duration-200 hover:bg-[#f2ede3] hover:text-[#171717]"
              >
                <span>
                  {String(i + 1).padStart(2, "0")}. {s.label}
                </span>
                <span>↗</span>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* =====================================================
          FOOTER BAR
      ===================================================== */}
      <div className="border-t border-line px-6 py-5 md:px-16">
        <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>Design / Data / AI / Automation</span>
          <span>Gavriell Pangan © 2026</span>
        </div>
      </div>
    </section>
  );
}