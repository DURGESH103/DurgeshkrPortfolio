'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { siteConfig } from '@/data/config';

/* ─── Platform data ──────────────────────────────────────── */
const platforms = [
  {
    name: 'LeetCode',
    href: siteConfig.leetcode,
    gradient: 'from-[#FFA116] to-[#FF6B00]',
    glow: 'rgba(255,161,22,0.18)',
    border: 'rgba(255,161,22,0.25)',
    iconBg: 'rgba(255,161,22,0.1)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ),
    badges: ['500+ Problems Solved', 'Knight Badge', 'DSA & Algorithms'],
    accentColor: '#FFA116',
  },
  {
    name: 'GeeksforGeeks',
    href: 'https://auth.geeksforgeeks.org/user/durgeshkumar',
    gradient: 'from-[#2F8D46] to-[#1a6b30]',
    glow: 'rgba(47,141,70,0.18)',
    border: 'rgba(47,141,70,0.25)',
    iconBg: 'rgba(47,141,70,0.1)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-2.694.189 4.69 4.69 0 0 1-1.065-.377l-.308.127a3.42 3.42 0 0 1-3.428 0l-.308-.127a4.69 4.69 0 0 1-1.065.377 4.51 4.51 0 0 1-2.694-.189 3.691 3.691 0 0 1-1.104-.695 2.845 2.845 0 0 1-.565-.745C.758 13.81 0 11.966 0 10.05c0-.765.145-1.52.427-2.22a5.793 5.793 0 0 1 3.486-3.335 6.26 6.26 0 0 1 2.038-.338c.75 0 1.495.13 2.198.384.703.254 1.35.629 1.897 1.107.255.222.49.467.701.73.21-.263.446-.508.701-.73a6.063 6.063 0 0 1 1.897-1.107 6.26 6.26 0 0 1 2.198-.384c.695 0 1.385.114 2.038.338a5.793 5.793 0 0 1 3.486 3.335c.282.7.427 1.455.427 2.22 0 1.916-.758 3.76-2.05 4.265zM12 13.99l.738-.616a3.697 3.697 0 0 0 .764 1.064 3.63 3.63 0 0 0 2.613.881 3.55 3.55 0 0 0 1.972-.618 3.204 3.204 0 0 0 1.146-1.65c.14-.518.14-1.066 0-1.584a3.204 3.204 0 0 0-1.146-1.65 3.55 3.55 0 0 0-1.972-.618 3.63 3.63 0 0 0-2.613.881c-.284.27-.52.588-.701.94L12 13.99zm0 0l-.738-.616a3.697 3.697 0 0 1-.764 1.064 3.63 3.63 0 0 1-2.613.881 3.55 3.55 0 0 1-1.972-.618 3.204 3.204 0 0 1-1.146-1.65c-.14-.518-.14-1.066 0-1.584a3.204 3.204 0 0 1 1.146-1.65 3.55 3.55 0 0 1 1.972-.618 3.63 3.63 0 0 1 2.613.881c.284.27.52.588.701.94L12 13.99z"/>
      </svg>
    ),
    badges: ['Active Problem Solver', 'DSA Practice', 'Interview Prep'],
    accentColor: '#2F8D46',
  },
  {
    name: 'CodeChef',
    href: siteConfig.codechef,
    gradient: 'from-[#5B4638] to-[#3d2e24]',
    glow: 'rgba(91,70,56,0.22)',
    border: 'rgba(91,70,56,0.3)',
    iconBg: 'rgba(91,70,56,0.12)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M11.257.004C5.146.218.164 5.06.003 11.17c-.097 3.598 1.517 6.835 4.08 8.98.398.334.637.82.637 1.335V22a2 2 0 0 0 2 2h10.56a2 2 0 0 0 2-2v-.515c0-.515.239-1.001.637-1.335 2.563-2.145 4.177-5.382 4.08-8.98C23.836 5.06 18.854.218 12.743.004a11.573 11.573 0 0 0-1.486 0zm.705 1.96c.08 0 .158.002.237.005 5.197.192 9.424 4.28 9.557 9.476.082 3.032-1.274 5.77-3.445 7.6a3.016 3.016 0 0 0-1.038 2.275V22H6.727v-.68c0-.866-.4-1.685-1.038-2.276-2.17-1.83-3.527-4.567-3.445-7.6.133-5.197 4.36-9.284 9.557-9.476.054-.002.107-.003.16-.005zM9.14 7.98c-.426.001-.852.165-1.175.495l-1.44 1.44a1.66 1.66 0 0 0 0 2.348l1.44 1.44a1.66 1.66 0 0 0 2.348 0l.24-.24-.84-.84-.24.24a.5.5 0 0 1-.708 0l-1.44-1.44a.5.5 0 0 1 0-.708l1.44-1.44a.5.5 0 0 1 .708 0l.24.24.84-.84-.24-.24A1.658 1.658 0 0 0 9.14 7.98zm5.72 0c-.426 0-.852.165-1.174.495l-.24.24.84.84.24-.24a.5.5 0 0 1 .708 0l1.44 1.44a.5.5 0 0 1 0 .708l-1.44 1.44a.5.5 0 0 1-.708 0l-.24-.24-.84.84.24.24a1.66 1.66 0 0 0 2.348 0l1.44-1.44a1.66 1.66 0 0 0 0-2.348l-1.44-1.44A1.657 1.657 0 0 0 14.86 7.98zm-2.86.76-1.2 4.8h.96l1.2-4.8z"/>
      </svg>
    ),
    badges: ['Competitive Programmer', 'Contest Participant', 'Problem Solving'],
    accentColor: '#8B6354',
  },
  {
    name: 'GitHub',
    href: siteConfig.github,
    gradient: 'from-[#6e40c9] to-[#2d1b69]',
    glow: 'rgba(110,64,201,0.18)',
    border: 'rgba(110,64,201,0.25)',
    iconBg: 'rgba(110,64,201,0.1)',
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
    badges: ['30+ Repositories', 'Open Source', 'Full Stack Dev'],
    accentColor: '#6e40c9',
  },
];

/* ─── Top stats ──────────────────────────────────────────── */
const stats = [
  { value: '500+', label: 'Problems Solved' },
  { value: '30+',  label: 'Repositories'    },
  { value: '20+',  label: 'Projects'        },
  { value: '8.86', label: 'CGPA'            },
];

/* ─── Card ───────────────────────────────────────────────── */
function ProfileCard({
  platform,
  index,
}: {
  platform: (typeof platforms)[0];
  index: number;
}) {
  return (
    <motion.a
      href={platform.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${platform.name} profile`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative flex flex-col rounded-2xl p-6 border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      style={{
        background: 'var(--card)',
        borderColor: 'var(--border)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = platform.border;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px -12px ${platform.glow}, 0 0 0 1px ${platform.border}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Subtle gradient orb behind icon */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${platform.glow} 0%, transparent 70%)`,
          transform: 'translate(30%, -30%)',
        }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: platform.iconBg,
          color: platform.accentColor,
          border: `1px solid ${platform.border}`,
        }}
      >
        {platform.icon}
      </div>

      {/* Name */}
      <h3 className="text-lg font-black mb-4 tracking-tight">{platform.name}</h3>

      {/* Badges */}
      <div className="flex flex-col gap-2 mb-6 flex-1">
        {platform.badges.map(badge => (
          <span
            key={badge}
            className="inline-flex items-center gap-1.5 text-xs font-semibold w-fit px-2.5 py-1 rounded-lg"
            style={{
              background: platform.iconBg,
              color: platform.accentColor,
              border: `1px solid ${platform.border}`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: platform.accentColor }}
            />
            {badge}
          </span>
        ))}
      </div>

      {/* CTA button */}
      <div
        className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all duration-200 w-fit"
        style={{
          borderColor: platform.border,
          color: platform.accentColor,
          background: platform.iconBg,
        }}
      >
        View Profile
        <ExternalLink size={13} aria-hidden="true" />
      </div>
    </motion.a>
  );
}

/* ─── Section ────────────────────────────────────────────── */
export default function CodingProfiles() {
  return (
    <section id="coding-profiles" aria-label="Coding Profiles">
      <div className="section-container">

        {/* Header */}
        <Reveal>
          <p className="section-label">Coding Profiles</p>
          <h2 className="section-title">
            Competitive Programming &amp;{' '}
            <span className="gradient-text">Coding Profiles</span>
          </h2>
          <p className="section-subtitle">
            Track my problem-solving journey across coding platforms.
          </p>
        </Reveal>

        {/* Stats row */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="text-center p-5 rounded-2xl border"
                style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <p className="text-3xl font-black gradient-text mb-1">{s.value}</p>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {platforms.map((platform, i) => (
            <ProfileCard key={platform.name} platform={platform} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
