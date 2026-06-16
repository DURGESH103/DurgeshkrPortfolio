'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Trophy, Star, GitBranch, Flame, Target, Code2 } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { siteConfig } from '@/data/config';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/* ─── Animated counter ──────────────────────────────────── */
function Counter({
  target,
  suffix = '',
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const isFloat = !Number.isInteger(target);
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(isFloat ? parseFloat((e * target).toFixed(2)) : Math.floor(e * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {Number.isInteger(target) ? count.toLocaleString() : count.toFixed(2)}
      {suffix}
    </span>
  );
}

/* ─── SVG logos ─────────────────────────────────────────── */
const LeetCodeSVG = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const GFGSvg = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-2.694.189 4.69 4.69 0 0 1-1.065-.377l-.308.127a3.42 3.42 0 0 1-3.428 0l-.308-.127a4.69 4.69 0 0 1-1.065.377 4.51 4.51 0 0 1-2.694-.189 3.691 3.691 0 0 1-1.104-.695 2.845 2.845 0 0 1-.565-.745C.758 13.81 0 11.966 0 10.05c0-.765.145-1.52.427-2.22a5.793 5.793 0 0 1 3.486-3.335 6.26 6.26 0 0 1 2.038-.338c.75 0 1.495.13 2.198.384.703.254 1.35.629 1.897 1.107.255.222.49.467.701.73.21-.263.446-.508.701-.73a6.063 6.063 0 0 1 1.897-1.107 6.26 6.26 0 0 1 2.198-.384c.695 0 1.385.114 2.038.338a5.793 5.793 0 0 1 3.486 3.335c.282.7.427 1.455.427 2.22 0 1.916-.758 3.76-2.05 4.265z" />
  </svg>
);

const CodeChefSVG = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path d="M11.257.004C5.146.218.164 5.06.003 11.17c-.097 3.598 1.517 6.835 4.08 8.98.398.334.637.82.637 1.335V22a2 2 0 0 0 2 2h10.56a2 2 0 0 0 2-2v-.515c0-.515.239-1.001.637-1.335 2.563-2.145 4.177-5.382 4.08-8.98C23.836 5.06 18.854.218 12.743.004a11.573 11.573 0 0 0-1.486 0z" />
  </svg>
);

const GitHubSVG = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

/* ─── Data ───────────────────────────────────────────────── */
// Real GitHub stats — update LeetCode/GFG/CodeChef once API is integrated
const DASHBOARD_STATS = [
  { icon: Code2,     label: 'Problems Solved', value: 0,   suffix: '',  color: '#FFA116' },
  { icon: Trophy,    label: 'Contest Rating',  value: 0,   suffix: '',  color: '#3B82F6' },
  { icon: GitBranch, label: 'Repositories',    value: 32,  suffix: '',  color: '#6e40c9' },
  { icon: Star,      label: 'GitHub Stars',    value: 44,  suffix: '',  color: '#F59E0B' },
  { icon: Flame,     label: 'Contributions',   value: 205, suffix: '',  color: '#10B981' },
  { icon: Target,    label: 'Projects Built',  value: 20,  suffix: '+', color: '#EC4899' },
];

const ACHIEVEMENTS = [
  { year: '2024', label: '20+ Projects Built',   sub: 'Full Stack',     color: '#10B981', icon: '🚀' },
  { year: '2024', label: '32 Repositories',       sub: 'github.com/DURGESH103', color: '#6e40c9', icon: '📦' },
  { year: '2024', label: '205+ Contributions',    sub: 'GitHub',         color: '#3B82F6', icon: '⚡' },
  { year: '2024', label: 'Active on LeetCode',    sub: 'leetcode.com/u/Durgesh_8', color: '#FFA116', icon: '🏆' },
];

/* Featured LeetCode */
const LEETCODE = {
  name: 'LeetCode',
  href: siteConfig.leetcode,          // https://leetcode.com/u/Durgesh_8
  accent: '#FFA116',
  glow: 'rgba(255,161,22,0.15)',
  border: 'rgba(255,161,22,0.30)',
  iconBg: 'rgba(255,161,22,0.10)',
  gradient: 'from-[#FFA116]/20 via-transparent to-transparent',
  Logo: LeetCodeSVG,
  stats: [
    { label: 'Problems Solved', value: '—' },
    { label: 'Contest Rating',  value: '—' },
    { label: 'Badge',           value: '—' },
    { label: 'Contests',        value: '—' },
  ],
  tags: ['DSA', 'Algorithms', 'Data Structures'],
};

/* Secondary cards */
const SECONDARY = [
  {
    name: 'GeeksforGeeks',
    href: siteConfig.geeksforgeeks,   // https://www.geeksforgeeks.org/profile/durgesh108
    accent: '#2F8D46',
    glow: 'rgba(47,141,70,0.15)',
    border: 'rgba(47,141,70,0.28)',
    iconBg: 'rgba(47,141,70,0.10)',
    Logo: GFGSvg,
    stats: [
      { label: 'Problems', value: '—' },
      { label: 'Score',    value: '—' },
    ],
    tags: ['DSA Practice', 'Interview Prep'],
  },
  {
    name: 'CodeChef',
    href: siteConfig.codechef,        // https://www.codechef.com/users/klu2300032812
    accent: '#c97b4b',
    glow: 'rgba(201,123,75,0.15)',
    border: 'rgba(201,123,75,0.28)',
    iconBg: 'rgba(201,123,75,0.10)',
    Logo: CodeChefSVG,
    stats: [
      { label: 'Contests', value: '—' },
      { label: 'Rating',   value: '—' },
    ],
    tags: ['Competitive', 'Contests'],
  },
  {
    name: 'GitHub',
    href: siteConfig.github,          // https://github.com/DURGESH103
    accent: '#8b5cf6',
    glow: 'rgba(139,92,246,0.15)',
    border: 'rgba(139,92,246,0.28)',
    iconBg: 'rgba(139,92,246,0.10)',
    Logo: GitHubSVG,
    stats: [
      { label: 'Repos',        value: '32'  },
      { label: 'Contributions', value: '205' },
    ],
    tags: ['Open Source', 'Full Stack'],
  },
];

/* ─── Spotlight effect hook ─────────────────────────────── */
function useSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--sx', `${x}%`);
    el.style.setProperty('--sy', `${y}%`);
  };
  return { ref, onMove };
}

/* ─── Featured LeetCode card ────────────────────────────── */
function FeaturedCard() {
  const { ref, onMove } = useSpotlight();

  return (
    <motion.a
      href={LEETCODE.href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref as React.RefObject<HTMLAnchorElement>}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative lg:col-span-2 rounded-2xl border overflow-hidden flex flex-col sm:flex-row gap-0"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = LEETCODE.border;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 64px -16px ${LEETCODE.glow}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Spotlight gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(300px circle at var(--sx, 50%) var(--sy, 50%), ${LEETCODE.glow}, transparent 70%)`,
        }}
      />

      {/* Left: logo + badge */}
      <div className="relative flex flex-col items-center justify-center p-8 sm:w-52 flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${LEETCODE.iconBg}, transparent)` }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 12px,rgba(255,161,22,.08) 12px,rgba(255,161,22,.08) 13px)' }} />
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ background: LEETCODE.iconBg, color: LEETCODE.accent, border: `1px solid ${LEETCODE.border}`, boxShadow: `0 0 24px ${LEETCODE.glow}` }}
        >
          <LEETCODE.Logo />
        </div>
        <span
          className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border"
          style={{ color: LEETCODE.accent, borderColor: LEETCODE.border, background: LEETCODE.iconBg }}
        >
          Featured
        </span>
      </div>

      {/* Right: content */}
      <div className="flex flex-col justify-center p-7 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-2xl font-black leading-tight">{LEETCODE.name}</h3>
            <p className="text-sm font-semibold mt-0.5" style={{ color: LEETCODE.accent }}>
              Competitive Programming Platform
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400">Profile Verified</span>
            </div>
          </div>
          <ExternalLink size={16} style={{ color: 'var(--text-subtle)' }} className="flex-shrink-0 mt-1 group-hover:text-orange-400 transition-colors" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {LEETCODE.stats.map(s => (
            <div key={s.label} className="text-center p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
              <p className="text-base font-black" style={{ color: LEETCODE.accent }}>{s.value}</p>
              <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'var(--text-subtle)' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {LEETCODE.tags.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-semibold"
              style={{ background: LEETCODE.iconBg, color: LEETCODE.accent, border: `1px solid ${LEETCODE.border}` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

/* ─── Secondary card ────────────────────────────────────── */
function SecondaryCard({ p, index }: { p: (typeof SECONDARY)[0]; index: number }) {
  const { ref, onMove } = useSpotlight();

  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref as React.RefObject<HTMLAnchorElement>}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col rounded-2xl border p-6 overflow-hidden"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = p.border;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px -12px ${p.glow}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Spotlight */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(200px circle at var(--sx, 50%) var(--sy, 50%), ${p.glow}, transparent 70%)` }} />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent}30)` }} />

      {/* Header */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: p.iconBg, color: p.accent, border: `1px solid ${p.border}`, boxShadow: `0 0 16px ${p.glow}` }}
        >
          <div className="w-6 h-6">
            <p.Logo />
          </div>
        </div>
        <ExternalLink size={14} style={{ color: 'var(--text-subtle)' }} className="group-hover:opacity-100 opacity-40 transition-opacity" />
      </div>

      <h3 className="font-black text-base mb-0.5 relative z-10">{p.name}</h3>
      <div className="flex items-center gap-1 mb-3 relative z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="text-[10px] font-bold text-emerald-400">Profile Verified</span>
      </div>

      {/* Stats */}
      <div className="flex gap-3 mb-4 relative z-10">
        {p.stats.map(s => (
          <div key={s.label} className="text-center px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] flex-1">
            <p className="text-sm font-black" style={{ color: p.accent }}>{s.value}</p>
            <p className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 relative z-10">
        {p.tags.map(t => (
          <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-semibold"
            style={{ background: p.iconBg, color: p.accent, border: `1px solid ${p.border}` }}>
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

/* ─── Achievement timeline ──────────────────────────────── */
function AchievementTimeline() {
  return (
    <Reveal delay={0.35}>
      <div className="card mt-10 p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] mb-6" style={{ color: 'var(--text-subtle)' }}>
          Achievement Timeline
        </p>
        <div className="relative">
          {/* Spine */}
          <div className="absolute left-[18px] top-3 bottom-3 w-px"
            style={{ background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6, rgba(139,92,246,0.1))' }} />

          <div className="space-y-5">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4"
              >
                {/* Node */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 relative z-10"
                  style={{ background: `${a.color}15`, border: `1px solid ${a.color}35`, boxShadow: `0 0 12px ${a.color}20` }}
                >
                  {a.icon}
                </div>

                {/* Content */}
                <div className="flex-1 flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-sm font-bold">{a.label}</p>
                    <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>{a.sub}</p>
                  </div>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-lg flex-shrink-0"
                    style={{ background: `${a.color}12`, color: a.color, border: `1px solid ${a.color}25` }}
                  >
                    {a.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export default function CodingProfiles() {
  return (
    <section id="coding-profiles">
      <div className="section-container">
        <Reveal>
          <p className="section-label">Coding Profiles</p>
          <h2 className="section-title">
            Developer{' '}
            <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="section-subtitle">
            My competitive programming journey, open-source activity, and real metrics across every platform.
          </p>
        </Reveal>

        {/* ── Stats dashboard ── */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
            {DASHBOARD_STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36,1] }}
                  whileHover={{ y: -3 }}
                  className="text-center p-4 rounded-2xl border transition-all duration-300"
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${s.color}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px -6px ${s.color}20`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <Icon size={16} className="mx-auto mb-2" style={{ color: s.color }} />
                  <p className="text-xl font-black mb-0.5" style={{ color: s.color }}>
                    <Counter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[10px] font-semibold leading-tight" style={{ color: 'var(--text-subtle)' }}>
                    {s.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Reveal>

        {/* ── Cards: featured + secondary ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured LeetCode spans 2 cols on lg */}
          <FeaturedCard />
          {/* Secondary cards */}
          {SECONDARY.map((p, i) => (
            <SecondaryCard key={p.name} p={p} index={i} />
          ))}
        </div>

        {/* ── Achievement timeline ── */}
        <AchievementTimeline />
      </div>
    </section>
  );
}
