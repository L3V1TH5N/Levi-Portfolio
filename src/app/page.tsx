import React from 'react';
import Hero from '@/components/hero/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/about/About';
import Skills from '@/components/skills/Skills';
import Projects from '@/components/projects/Projects';
import Contact from '@/components/contact/Contact';
import ActiveSystem from "@/components/activesystem/ActiveSystem";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#0a0a0a] text-white font-sans selection:bg-[#FF7F43] selection:text-black overflow-x-hidden">
      
      {/* Background Grid Pattern */}
      <div 
        className="fixed inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #222 1px, transparent 1px),
            linear-gradient(to bottom, #222 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      ></div>

      {/* Sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <ActiveSystem />
        <Projects />
        <Contact />
      </div>

    </main>
  );
}