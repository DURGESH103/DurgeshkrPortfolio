'use client';

import { certifications } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import { ExternalLink, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

type Cert = (typeof certifications)[0];

/* Category → pill style */
const categoryStyle: Record<string, { bg: string; text: string }> = {
  'Cloud & CRM':               { bg: 'rgba(0,161,224,0.10)',  text: '#00A1E0' },
  'Database':                  { bg: 'rgba(248,0,0,0.10)',    text: '#F84040' },
  'Automation':                { bg: 'rgba(255,109,0,0.10)',  text: '#FF6D00' },
  'Professional Communication':{ bg: 'rgba(0,48,135,0.10)',  text: '#5B8DD9' },
};

/* Issuer logo block — SVG-text initials styled per brand */
function IssuerLogo({ cert }: { cert: Cert }) {
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm tracking-tight flex-shrink-0 border shadow-sm"
      style={{
        background: `linear-gradient(135deg, ${cert.accent}18, ${cert.accent}08)`,
        borderColor: `${cert.accent}30`,
        color: cert.accent,
        boxShadow: `0 2px 12px ${cert.accent}15`,
      }}
    >
      {cert.issuerAbbr}
    </div>
  );
}

function CertCard({ cert, index }: { cert: Cert; index: number }) {
  const cat = categoryStyle[cert.category] ?? { bg: 'rgba(59,130,246,0.10)', text: '#3b82f6' };

  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -5 }}
        className="relative group flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all duration-300"
        style={{
          ['--hover-border' as string]: `${cert.accent}40`,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = `${cert.accent}35`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px -12px ${cert.accent}20`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-[3px] w-full"
          style={{ background: `linear-gradient(90deg, ${cert.accent}, ${cert.accent}40)` }}
        />

        {/* Subtle glow blob */}
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${cert.accent}12, transparent 70%)` }}
        />

        <div className="flex flex-col flex-1 p-6 relative z-10">
          {/* Header row */}
          <div className="flex items-start gap-4 mb-5">
            <IssuerLogo cert={cert} />
            <div className="flex-1 min-w-0">
              {/* Category pill */}
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full mb-2"
                style={{ background: cat.bg, color: cat.text }}
              >
                {cert.category}
              </span>
              <h3 className="font-black text-base leading-snug">{cert.title}</h3>
            </div>
          </div>

          {/* Issuer + year row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <BadgeCheck size={13} style={{ color: cert.accent }} />
              <span className="text-sm font-semibold" style={{ color: cert.accent }}>
                {cert.issuer}
              </span>
            </div>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-lg"
              style={{ background: 'var(--bg)', color: 'var(--text-subtle)', border: '1px solid var(--border)' }}
            >
              {cert.year}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--text-muted)' }}>
            {cert.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {cert.skills.map(s => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors duration-150"
                style={{
                  background: `${cert.accent}10`,
                  color: cert.accent,
                  border: `1px solid ${cert.accent}20`,
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              borderColor: `${cert.accent}35`,
              color: cert.accent,
              background: `${cert.accent}08`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${cert.accent}16`;
              (e.currentTarget as HTMLElement).style.borderColor = `${cert.accent}55`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = `${cert.accent}08`;
              (e.currentTarget as HTMLElement).style.borderColor = `${cert.accent}35`;
            }}
          >
            <ExternalLink size={13} />
            View Credential
          </a>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Certifications() {
  /* Derive unique categories in order */
  const categories = Array.from(new Set(certifications.map(c => c.category)));

  return (
    <section id="certifications" className="section-alt">
      <div className="section-container">
        <Reveal>
          <p className="section-label">Certifications</p>
          <h2 className="section-title">
            Verified{' '}
            <span className="gradient-text">Credentials</span>
          </h2>
          <p className="section-subtitle">
            Industry-recognized certifications from global organizations that validate
            my technical expertise and professional skills.
          </p>
        </Reveal>

        {/* Category legend */}
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map(cat => {
              const s = categoryStyle[cat] ?? { bg: 'rgba(59,130,246,0.10)', text: '#3b82f6' };
              return (
                <span key={cat}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: s.bg, color: s.text }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {cat}
                </span>
              );
            })}
          </div>
        </Reveal>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {certifications.map((cert, i) => (
            <CertCard key={cert.slug} cert={cert} index={i} />
          ))}
        </div>

        {/* Bottom trust signal */}
        <Reveal delay={0.35}>
          <div className="mt-10 flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--text-subtle)' }}>
            <BadgeCheck size={13} className="text-emerald-500" />
            All credentials are issued by globally recognized organizations and verifiable online.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
