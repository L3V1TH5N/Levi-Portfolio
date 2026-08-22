"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Any element on the page can opt out of the grain texture by adding a
// `data-no-grain` attribute (e.g. real photos, where paper-grain-on-top-of-
// photo-grain just reads as noisy). This overlay finds those elements and
// cuts holes for them out of its own mask, so the rest of the page keeps
// the grain while marked photos stay clean.
export default function GrainOverlay() {
  const [maskImage, setMaskImage] = useState<string | undefined>(undefined);
  const rafRef = useRef(0);

  useEffect(() => {
    const updateMask = () => {
      const excluded = Array.from(
        document.querySelectorAll<HTMLElement>("[data-no-grain]")
      );

      if (excluded.length === 0) {
        setMaskImage(undefined);
        return;
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const holes = excluded
        .map((el) => {
          const r = el.getBoundingClientRect();
          if (r.width <= 0 || r.height <= 0) return "";
          return `<rect x="${r.left.toFixed(1)}" y="${r.top.toFixed(
            1
          )}" width="${r.width.toFixed(1)}" height="${r.height.toFixed(
            1
          )}" rx="3" fill="black" />`;
        })
        .join("");

      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${vw}' height='${vh}'><rect width='100%' height='100%' fill='white'/>${holes}</svg>`;

      setMaskImage(`url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
    };

    const schedule = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateMask);
    };

    updateMask();

    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, { passive: true });

    // Images/layout can shift slightly after mount (fonts, lazy-loaded
    // photos), so re-check a few times early on to avoid a stale mask.
    const settleTimers = [150, 500, 1200].map((t) =>
      setTimeout(updateMask, t)
    );

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule);
      settleTimers.forEach(clearTimeout);
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.025] mix-blend-soft-light"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
        backgroundSize: "140px 140px",
        WebkitMaskImage: maskImage,
        maskImage: maskImage,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
      animate={{ backgroundPosition: ["0px 0px", "-140px 140px"] }}
      transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
    />
  );
}