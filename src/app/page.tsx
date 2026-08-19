import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-bg">
      <Hero />
      <About />
    </main>
  );
}