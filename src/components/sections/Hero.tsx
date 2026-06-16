'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, ArrowDown, Download, ExternalLink, Code2, ChefHat, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const socials = [
  { icon: Github,   href: siteConfig.github,              label: 'GitHub',   color: '#ffffff',  dark: 'hover:text-white' },
  { icon: Linkedin, href: siteConfig.linkedin,            label: 'LinkedIn', color: '#0A66C2',  dark: 'hover:text-[#0A66C2]' },
  { icon: Code2,    href: siteConfig.leetcode,            label: 'LeetCode', color: '#FFA116',  dark: 'hover:text-[#FFA116]' },
  { icon: ChefHat,  href: siteConfig.codechef,            label: 'CodeChef', color: '#6B3F26',  dark: 'hover:text-amber-500' },
  { icon: Mail,     href: `mailto:${siteConfig.email}`,  label: 'Email',    color: '#ef4444',  dark: 'hover:text-red-400' },
];

const heroStats = [
  { val: '8.86', label: 'CGPA',       color: '#3b82f6' },
  { val: '500+', label: 'DSA Solved', color: '#f59e0b' },
  { val: '15+',  label: 'Projects',   color: '#10b981' },
  { val: '8+',   label: 'Certs',      color: '#8b5cf6' },
];

const floatingBadges = [
  { text: '🎓 CGPA 8.86',    pos: '-top-4 -right-2 sm:-right-10', delay: 0,   drift: -6 },
  { text: '⚡ 500+ DSA',     pos: 'top-1/3 -right-2 sm:-right-12', delay: 0.5, drift: 6 },
  { text: '💡 15+ Projects', pos: '-bottom-2 -right-2 sm:-right-10', delay: 1,   drift: -5 },
  { text: '🏆 Knight LC',    pos: 'top-1/2 -left-2 sm:-left-12', delay: 1.5, drift: 7 },
];

function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let raf: number;

    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.4, a: Math.random() * 0.5 + 0.1,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.a * 0.35})`;
        ctx.fill();
      });
      pts.forEach((a, i) => {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(a.x - pts[j].x, a.y - pts[j].y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${(1 - d / 110) * 0.05})`;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [shouldReduce]);

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden />;
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
const up = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.75 } },
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg)]">
      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid opacity-[0.035] dark:opacity-[0.05] pointer-events-none" />

      {/* Gradient spotlight */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 55% at 50% -10%, rgba(59,130,246,0.10) 0%, transparent 70%)' }} />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/5 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.07), transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-1/4 right-1/5 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)', filter: 'blur(80px)' }} />

      <ParticleCanvas />

      <div className="section-container relative z-10 pt-20 pb-10">
        <motion.div
          variants={stagger} initial="hidden" animate="show"
          className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20"
        >
          {/* ── TEXT ── */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

            {/* Status pill */}
            <motion.div variants={up}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-emerald-400 text-xs font-semibold mb-6 select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to Work — SWE Internships &amp; Full-time Roles
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={up}
              className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-tight mb-5">
              <span className="block font-light" style={{ color: 'var(--text-muted)' }}>Building scalable</span>
              <span className="block font-black gradient-text">web applications</span>
              <span className="block font-light" style={{ color: 'var(--text-muted)' }}>that people love.</span>
            </motion.h1>

            {/* Type animation */}
            <motion.div variants={up}
              className="flex items-center gap-2 justify-center lg:justify-start mb-5 h-8">
              <Sparkles size={16} className="text-blue-500 flex-shrink-0" />
              <span className="text-lg font-semibold" style={{ color: 'var(--text-muted)' }}>
                <TypeAnimation
                  sequence={['Software Engineer', 2200, 'Full Stack Developer', 2200, 'React Developer', 2200, 'Problem Solver', 2200]}
                  wrapper="span" repeat={Infinity} cursor
                />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
  variants={up}
  className="text-base sm:text-lg leading-[1.85] mb-8 max-w-lg mx-auto lg:mx-0"
  style={{ color: 'var(--text-muted)' }}
>
  Final-year CSE student building scalable full-stack applications with a passion for clean architecture and exceptional user experiences.
</motion.p>

            {/* CTA buttons */}
            <motion.div variants={up} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary px-7 py-3 text-base">
                View Projects <ExternalLink size={15} />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                href={siteConfig.resume} download className="btn-secondary px-7 py-3 text-base">
                <Download size={15} /> Resume
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-ghost px-6 py-3 border border-[var(--border)] rounded-xl text-base">
                <Mail size={15} /> Contact
              </motion.button>
            </motion.div>

            {/* Socials */}
            <motion.div variants={up} className="flex gap-2.5 justify-center lg:justify-start mb-10">
              {socials.map(({ icon: Icon, href, label, dark }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label} whileHover={{ y: -4, scale: 1.12 }} whileTap={{ scale: 0.93 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--border)] bg-[var(--card)] transition-all duration-200 ${dark}`}
                  style={{ color: 'var(--text-muted)' }}>
                  <Icon size={17} />
                </motion.a>
              ))}
            </motion.div>

            {/* Inline stats */}
            <motion.div variants={up}
              className="inline-flex flex-wrap gap-5 justify-center lg:justify-start px-5 py-4 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              {heroStats.map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-black" style={{ color: s.color }}>{s.val}</p>
                  <p className="text-[11px] font-medium mt-0.5" style={{ color: 'var(--text-subtle)' }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── AVATAR ── */}
          <motion.div variants={up} className="relative flex-shrink-0">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-[spin_35s_linear_infinite]" />
              <div className="absolute inset-[10px] rounded-full border border-cyan-400/10 animate-[spin_25s_linear_infinite_reverse]" />
              <div className="absolute inset-[22px] rounded-full border border-indigo-500/10 animate-[spin_20s_linear_infinite]" />

              {/* Gradient border avatar */}
              <div className="absolute inset-[40px] gradient-border rounded-full overflow-hidden shadow-2xl"
                style={{ boxShadow: '0 0 60px rgba(59,130,246,0.2), 0 0 120px rgba(59,130,246,0.08)' }}>
                <div className="relative w-full h-full">
                  <Image
                    src="/images/profile.png"
                    alt="Durgesh Kumar"
                    fill
                    className="object-cover object-top"
                    sizes="256px"
                    priority
                  />
                </div>
              </div>

              {/* Available badge */}
              <motion.div
                animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute top-[42px] left-[42px] card px-3 py-1.5 text-xs font-bold shadow-xl flex items-center gap-1.5"
                style={{ color: 'var(--success)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </motion.div>

              {/* Floating badges */}
              {floatingBadges.map((b, i) => (
                <motion.div key={b.text}
                  className={`absolute ${b.pos} card px-3 py-1.5 text-xs font-semibold shadow-lg whitespace-nowrap z-20`}
                  animate={{ y: [0, b.drift, 0] }}
                  transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}>
                  {b.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          className="flex flex-col items-center gap-2 mt-14 mx-auto w-fit"
          style={{ color: 'var(--text-subtle)' }}>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Scroll to explore</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
