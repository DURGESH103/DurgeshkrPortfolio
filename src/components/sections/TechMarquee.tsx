'use client';

import { techStack } from '@/data/portfolio';

const items = [...techStack, ...techStack]; // duplicate for seamless loop

export default function TechMarquee() {
  return (
    <div className="relative py-6 overflow-hidden border-y border-[var(--border)] bg-[var(--card)]/40">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, var(--bg), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, var(--bg), transparent)' }} />

      <div className="marquee-track gap-0" aria-hidden>
        {items.map((tech, i) => (
          <span key={i}
            className="flex items-center gap-2 px-5 text-sm font-semibold whitespace-nowrap"
            style={{ color: 'var(--text-muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 flex-shrink-0" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
