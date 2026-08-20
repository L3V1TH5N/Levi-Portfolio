"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProjectCursor({ active }: { active: boolean }) {
  const [mounted, setMounted] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const springX = useSpring(mx, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(my, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mx, my]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
      transition={{ duration: 0.25 }}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 md:block"
    >
      <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-accent text-center font-mono text-[10px] font-bold uppercase leading-tight text-bg shadow-xl">
        <span>View</span>
        <span>Project</span>
        <span className="mt-0.5">↗</span>
      </div>
    </motion.div>
  );
}