'use client';

import Reveal from '@/components/ui/Reveal';
import { Github, ExternalLink, Star, GitFork, Code2, GitCommitHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const U = 'DURGESH103';
const GITHUB_URL = `https://github.com/${U}`;
const T = 'hide_border=true&theme=transparent&title_color=3b82f6&text_color=8ba3c0&icon_color=38bdf8';

/* ── Fallback stat counters ──────────────────────────────── */
const fallbackStats = [
  { icon: Code2,               label: 'Repositories',  value: '30+',  color: '#3B82F6' },
  { icon: Star,                label: 'GitHub Stars',  value: '50+',  color: '#F59E0B' },
  { icon: GitCommitHorizontal, label: 'Total Commits', value: '300+', color: '#10B981' },
  { icon: GitFork,             label: 'Contributions', value: '300+', color: '#8B5CF6' },
];

/* ── External GitHub image cards (Stats + Streak) ───────── */
const statCards = [
  {
    label: 'GitHub Stats',
    src: `https://github-readme-stats.vercel.app/api?username=${U}&show_icons=true&${T}&count_private=true&include_all_commits=true&rank_icon=github`,
  },
  {
    label: 'Streak Stats',
    src: `https://github-readme-streak-stats.herokuapp.com/?user=${U}&${T}&ring=3b82f6&fire=38bdf8&currStreakLabel=3b82f6&currStreakNum=f0f6ff&sideNums=8ba3c0&sideLabels=4d6b8a&dates=4d6b8a`,
  },
];

function GithubImg({ label, src }: { label: string; src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="card flex flex-col items-center justify-center min-h-[150px] gap-3 text-center">
        <Github size={26} style={{ color: 'var(--text-subtle)' }} />
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-subtle)' }}>
            View at{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              className="text-blue-500 hover:underline">github.com/{U}</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card flex items-center justify-center p-5 min-h-[150px] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        width={500}
        height={200}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    </div>
  );
}

/* ── Top Languages — native component ───────────────────── */

const TOP_LANGS = [
  { name: 'JavaScript', pct: 74, color: '#F7DF1E', bg: '#F7DF1E18' },
  { name: 'TypeScript', pct: 11, color: '#3178C6', bg: '#3178C618' },
  { name: 'Python',     pct:  6, color: '#3776AB', bg: '#3776AB18' },
  { name: 'CSS',        pct:  5, color: '#264DE4', bg: '#264DE418' },
  { name: 'HTML',       pct:  4, color: '#E34F26', bg: '#E34F2618' },
];

const STACK_PILLS = [
  { icon: '⚡', label: 'Frontend Heavy' },
  { icon: '🚀', label: 'Full Stack'     },
  { icon: '💻', label: 'JS Ecosystem'   },
  { icon: '🤖', label: 'Python Projects'},
];

function LangBar({ lang, animate }: { lang: typeof TOP_LANGS[0]; animate: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      className="relative flex flex-col gap-2 rounded-xl p-3.5 border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all duration-300 cursor-default"
      style={{ minHeight: 88 }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${lang.color}40`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px -6px ${lang.color}22`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Soft glow bg */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${lang.color}08, transparent 70%)` }} />

      {/* Language dot + name */}
      <div className="flex items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: lang.color, boxShadow: `0 0 6px ${lang.color}60` }}
          />
          <span className="text-sm font-semibold truncate">{lang.name}</span>
        </div>
        <span className="text-xs font-bold flex-shrink-0" style={{ color: lang.color }}>
          {lang.pct}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 h-1.5 rounded-full overflow-hidden"
        style={{ background: 'var(--border)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${lang.color}, ${lang.color}99)`,
            boxShadow: `0 0 6px ${lang.color}50`,
          }}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${lang.pct}%` : 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
    </motion.div>
  );
}

function TechStackDistribution() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref} className="card p-6 space-y-5">
      {/* Section header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500 mb-1">
            Tech Stack Distribution
          </p>
          <p className="text-sm" style={{ color: 'var(--text-subtle)' }}>
            Top languages across public repositories
          </p>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1"
        >
          <Github size={12} /> @{U}
        </a>
      </div>

      {/* Stack pills */}
      <div className="flex flex-wrap gap-2">
        {STACK_PILLS.map(p => (
          <span key={p.label}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border border-[var(--border)] bg-[var(--bg)]"
            style={{ color: 'var(--text-muted)' }}>
            <span>{p.icon}</span>{p.label}
          </span>
        ))}
      </div>

      {/* Language bars — 2 col mobile, up to 5 col on xl */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
        {TOP_LANGS.map(lang => (
          <LangBar key={lang.name} lang={lang} animate={inView} />
        ))}
      </div>

      {/* Footer note */}
      <p className="text-[11px] text-center" style={{ color: 'var(--text-subtle)' }}>
        Based on public GitHub repositories · Batchfile, Dockerfile & config files excluded
      </p>
    </div>
  );
}

/* ── Main section ────────────────────────────────────────── */
export default function GithubDashboard() {
  return (
    <section id="github" className="section-alt">
      <div className="section-container">
        <Reveal>
          <p className="section-label">GitHub</p>
          <h2 className="section-title">
            Open Source{' '}
            <span className="gradient-text">Activity</span>
          </h2>
          <p className="section-subtitle">
            Contributions, streak, and language breakdown for{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              className="text-blue-500 font-semibold hover:underline">
              @{U}
            </a>
          </p>
        </Reveal>

        {/* Always-visible fallback counters */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {fallbackStats.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="card text-center py-4">
                <Icon size={20} className="mx-auto mb-2" style={{ color }} />
                <p className="text-2xl font-black mb-0.5" style={{ color }}>{value}</p>
                <p className="text-xs font-medium" style={{ color: 'var(--text-subtle)' }}>{label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="space-y-5">
          {/* Stats + Streak */}
          <div className="grid md:grid-cols-2 gap-5">
            {statCards.map((c, i) => (
              <Reveal key={c.label} delay={0.1 + i * 0.05}>
                <GithubImg label={c.label} src={c.src} />
              </Reveal>
            ))}
          </div>

          {/* Tech Stack Distribution — replaces the external image */}
          <Reveal delay={0.2}>
            <TechStackDistribution />
          </Reveal>

          {/* Profile CTA */}
          <Reveal delay={0.25}>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              className="card card-hover flex items-center justify-between gap-4 p-5 group">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[var(--border)] flex items-center justify-center flex-shrink-0">
                  <Github size={22} style={{ color: 'var(--text-muted)' }} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-base">github.com/{U}</p>
                  <p className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
                    Explore all repositories, commits &amp; contributions
                  </p>
                </div>
              </div>
              <ExternalLink size={18} style={{ color: 'var(--text-subtle)' }}
                className="group-hover:text-blue-500 transition-colors flex-shrink-0" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
