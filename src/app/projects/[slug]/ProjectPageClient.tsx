'use client';

import { projects } from '@/data/portfolio';
import {
  Github, ExternalLink, ArrowLeft, Calendar,
  Tag, Layers, CheckCircle2, ChevronRight,
  ArrowRight, Zap, Lightbulb,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Project = (typeof projects)[0];

const statusStyle: Record<string, string> = {
  Live:          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'In Progress': 'bg-amber-500/10  text-amber-400  border-amber-500/20',
  Archived:      'bg-slate-500/10  text-slate-400  border-slate-500/20',
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const up = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 } },
};

export default function ProjectPageClient({ project }: { project: Project }) {
  const others = projects.filter(p => p.slug !== project.slug).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero banner */}
      <div className={`relative h-64 sm:h-80 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,white,white 1px,transparent 1px,transparent 14px)' }} />
        <div className="absolute inset-0 z-20"
          style={{ background: 'linear-gradient(to bottom, transparent 50%, var(--bg))' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-top opacity-50 z-10"
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute top-5 left-5 z-30">
          <Link href="/#projects"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/50 transition-colors">
            <ArrowLeft size={14} /> Back to Projects
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 pb-24 relative z-30">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">

          {/* Title card */}
          <motion.div variants={up} className="card">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusStyle[project.status] ?? statusStyle.Live}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />{project.status}
              </span>
              <span className="badge"><Tag size={10} className="mr-1" />{project.category}</span>
              <span className="badge"><Calendar size={10} className="mr-1" />{project.timeline}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-2 leading-tight">{project.title}</h1>
            <p className="text-base font-semibold mb-4" style={{ color: project.accentColor }}>{project.tagline}</p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{project.longDescription}</p>
            <div className="flex flex-wrap gap-3">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Github size={15} /> Source Code
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ExternalLink size={15} /> Live Demo
              </a>
            </div>
          </motion.div>

          {/* Impact Metrics */}
          <motion.div variants={up}>
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--text-subtle)' }}>Impact Metrics</p>
            <div className="grid grid-cols-3 gap-4">
              {project.stats.map(s => (
                <div key={s.label} className="card text-center py-5">
                  <p className="text-3xl font-black gradient-text mb-1">{s.value}</p>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Problem / Solution */}
          <motion.div variants={up} className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-red-500/6 border border-red-500/15">
              <p className="text-[11px] font-black uppercase tracking-widest text-red-400 mb-3">Problem</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.problem}</p>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-500/6 border border-emerald-500/15">
              <p className="text-[11px] font-black uppercase tracking-widest text-emerald-400 mb-3">Solution</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.solution}</p>
            </div>
          </motion.div>

          {/* Key Features / Highlights */}
          <motion.div variants={up} className="card">
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>Key Features & Highlights</p>
            <ul className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5 text-blue-500" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Architecture */}
          <motion.div variants={up} className="card">
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>
              <Layers size={11} className="inline mr-1.5" />System Architecture
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {project.architecture.map((a, i) => (
                <span key={i} className="flex items-center gap-1.5 text-sm">
                  <span className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] font-medium"
                    style={{ color: 'var(--text-muted)' }}>{a}</span>
                  {i < project.architecture.length - 1 && (
                    <ChevronRight size={13} style={{ color: 'var(--text-subtle)' }} />
                  )}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={up} className="card">
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm font-medium"
                  style={{ color: 'var(--text-muted)' }}>{t}</span>
              ))}
            </div>
          </motion.div>

          {/* Technical Challenges */}
          {'challenges' in project && Array.isArray(project.challenges) && project.challenges.length > 0 && (
            <motion.div variants={up} className="card">
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>
                <Zap size={11} className="inline mr-1.5" />Technical Challenges
              </p>
              <ul className="space-y-2.5">
                {(project.challenges as string[]).map((c, i) => (
                  <li key={i} className="flex gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Future Improvements */}
          {'futureImprovements' in project && Array.isArray(project.futureImprovements) && project.futureImprovements.length > 0 && (
            <motion.div variants={up} className="card">
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>
                <Lightbulb size={11} className="inline mr-1.5" />Future Improvements
              </p>
              <ul className="space-y-2">
                {(project.futureImprovements as string[]).map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <ArrowRight size={13} className="flex-shrink-0 mt-0.5 text-blue-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* More Projects */}
          {others.length > 0 && (
            <motion.div variants={up}>
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--text-subtle)' }}>More Projects</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {others.map(p => (
                  <Link key={p.slug} href={`/projects/${p.slug}`}
                    className="card group flex items-center gap-3 hover:border-blue-500/30 transition-all duration-200 p-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.gradient} flex-shrink-0`} />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs truncate">{p.title}</p>
                      <p className="text-[11px] truncate" style={{ color: 'var(--text-subtle)' }}>{p.category}</p>
                    </div>
                    <ArrowRight size={13} style={{ color: 'var(--text-subtle)' }}
                      className="flex-shrink-0 group-hover:text-blue-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
