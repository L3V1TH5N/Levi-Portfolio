"use client";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <nav className="absolute top-0 left-0 z-20 flex w-full items-center justify-center px-6 py-8">
      <ul className="flex gap-10">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}