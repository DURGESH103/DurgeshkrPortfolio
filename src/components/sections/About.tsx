'use client';

import Reveal from '@/components/ui/Reveal';
import { motion } from 'framer-motion';
import { Code2, Target, Zap, Heart, BookOpen, Coffee } from 'lucide-react';

const cards = [
  {
    icon: Code2,
    title: 'Who I Am',
    text: "Final-year B.Tech CS student at heart, engineer by practice. I obsess over clean code, performant systems, and beautiful UI — the kind that makes users go 'wow'.",
    accent: '#3B82F6',
    bg: 'from-blue-500/10 to-blue-600/5',
  },
  {
    icon: Target,
    title: 'What I Want',
    text: 'Targeting SWE roles at Google, Microsoft, Amazon, Atlassian, and similar product-based companies. I want to build at scale, learn from the best, and ship products used by millions.',
    accent: '#8B5CF6',
    bg: 'from-violet-500/10 to-violet-600/5',
  },
  {
    icon: Zap,
    title: 'What Drives Me',
    text: "Problems. I see a bug as a puzzle, a slow API as a challenge, a messy codebase as an opportunity. I wake up excited to ship code that makes a difference.",
    accent: '#F59E0B',
    bg: 'from-amber-500/10 to-amber-600/5',
  },
  {
    icon: BookOpen,
    title: 'Continuous Learner',
    text: '500+ DSA problems solved, 8 certifications earned, always in the middle of a book or course. Learning is not a phase — it\'s my default state.',
    accent: '#10B981',
    bg: 'from-emerald-500/10 to-emerald-600/5',
  },
  {
    icon: Heart,
    title: 'I Care About',
    text: 'Accessibility, performance, and developer experience. Code should be inclusive, fast, and a joy to work with — not just for users but for the next engineer who reads it.',
    accent: '#EC4899',
    bg: 'from-pink-500/10 to-pink-600/5',
  },
  {
    icon: Coffee,
    title: 'Beyond Code',
    text: 'Hackathon participant, open-source contributor, and occasional tech blogger. When not coding, you\'ll find me solving LeetCode with coffee or mentoring juniors.',
    accent: '#6366F1',
    bg: 'from-indigo-500/10 to-indigo-600/5',
  },
];

const stats = [
  { value: '8.86', label: 'CGPA', sub: '/ 10.0' },
  { value: '15+', label: 'Projects', sub: 'Shipped' },
  { value: '500+', label: 'DSA', sub: 'Problems' },
  { value: '8', label: 'Certs', sub: 'Earned' },
  { value: '2026', label: 'Graduating', sub: 'B.Tech CS' },
];

export default function About() {
  return (
    <section id="about" className="bg-[var(--bg-secondary)]">
      <div className="section-container">
        <Reveal>
          <p className="section-label">About Me</p>
          <h2 className="section-title">
            Crafting Code,{' '}
            <span className="gradient-text">Creating Impact</span>
          </h2>
          <p className="section-subtitle">
            A peek behind the keyboard — who I am, what I build, and why I love engineering.
          </p>
        </Reveal>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {cards.map(({ icon: Icon, title, text, accent, bg }, i) => (
            <Reveal key={title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4 }}
                className="card card-hover h-full group cursor-default overflow-hidden relative"
              >
                {/* Subtle gradient corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-bl ${bg} blur-2xl pointer-events-none`} />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${accent}18`, border: `1px solid ${accent}25` }}>
                  <Icon size={20} style={{ color: accent }} />
                </div>

                <h3 className="font-bold text-base mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Stats bar */}
        <Reveal delay={0.3}>
          <div className="card overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, #3b82f608, transparent 60%)' }} />
            <div className="relative flex flex-wrap gap-6 items-center justify-center py-4">
              {stats.map(({ value, label, sub }, i) => (
                <div key={label} className="text-center px-4">
                  <p className="text-3xl font-black gradient-text leading-none">{value}</p>
                  <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text)' }}>{label}</p>
                  <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
