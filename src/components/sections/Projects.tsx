'use client';

import { projects } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import {
  Github, ExternalLink, X, ArrowRight,
  Calendar, Tag, Layers, ArrowUpRight,
  CheckCircle2, ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type Project = (typeof projects)[0];

/* ─── Status badge ─────────────────────────────────────── */
const statusStyle: Record<string, string> = {
  Live:        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'In Progress':'bg-amber-500/10  text-amber-400  border-amber-500/20',
  Archived:    'bg-slate-500/10  text-slate-400  border-slate-500/20',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusStyle[status] ?? statusStyle.Live}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

/* ─── Screenshot thumbnail with zoom on hover ─────────── */
function ProjectImage({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <div className="relative w-full overflow-hidden bg-[var(--bg-tertiary)]"
      style={{ aspectRatio: '16/9' }}>
      {/* Gradient fallback — always visible until/unless screenshot loads */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-85`} />
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg,white,white 1px,transparent 1px,transparent 14px)' }} />
      {/* Fallback title text sits behind screenshot */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 p-4 select-none">
        <span className="text-white/90 font-black text-lg text-center leading-tight drop-shadow-lg">
          {project.title}
        </span>
        <span className="text-white/60 text-xs text-center">{project.tagline}</span>
      </div>
      {/*
        Plain <img> instead of next/image:
        - next/image returns HTTP 400 when the source file is missing, spamming the console.
        - <img> with onError simply hides itself, leaving the gradient fallback visible.
        - Once you add real screenshots, the image shows perfectly with the zoom effect.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading={priority ? 'eager' : 'lazy'}
        className="absolute inset-0 w-full h-full object-cover object-top z-20 transition-transform duration-700 ease-out group-hover:scale-105"
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 inset-x-0 h-16 z-30"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }} />
    </div>
  );
}

/* ─── Full Case Study Modal ─────────────────────────────── */
function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
        onClick={onClose}>
        <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.38 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          onClick={e => e.stopPropagation()}>

          {/* Close */}
          <button onClick={onClose} aria-label="Close"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--card-hover)] transition-colors"
            style={{ color: 'var(--text-muted)' }}>
            <X size={14} />
          </button>

          {/* Header image */}
          <div className="group rounded-t-2xl overflow-hidden">
            <ProjectImage project={project} priority />
          </div>

          <div className="p-6 space-y-6">
            {/* Title row */}
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <StatusBadge status={project.status} />
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-[var(--border)]"
                    style={{ color: 'var(--text-subtle)' }}>
                    <Tag size={10} className="inline mr-1" />{project.category}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>
                    <Calendar size={10} className="inline mr-1" />{project.timeline}
                  </span>
                </div>
                <h2 className="text-2xl font-black">{project.title}</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{project.tagline}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {project.stats.map(s => (
                <div key={s.label} className="text-center p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                  <p className="text-xl font-black gradient-text">{s.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-subtle)' }}>Overview</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.longDescription}</p>
            </div>

            {/* Problem → Solution */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-red-500/6 border border-red-500/15">
                <p className="text-[11px] font-black uppercase tracking-widest text-red-400 mb-2">Problem</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.problem}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/6 border border-emerald-500/15">
                <p className="text-[11px] font-black uppercase tracking-widest text-emerald-400 mb-2">Solution</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.solution}</p>
              </div>
            </div>

            {/* Key highlights */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-subtle)' }}>Key Highlights</p>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5 text-blue-500" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture flow */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-subtle)' }}>
                <Layers size={11} className="inline mr-1.5" />Architecture
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                {project.architecture.map((a, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs">
                    <span className="px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] font-medium"
                      style={{ color: 'var(--text-muted)' }}>
                      {a}
                    </span>
                    {i < project.architecture.length - 1 && (
                      <ChevronRight size={12} style={{ color: 'var(--text-subtle)' }} />
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-subtle)' }}>Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map(t => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 pt-2 border-t border-[var(--border)]">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="btn-secondary flex-1 justify-center">
                <Github size={15} /> Source Code
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="btn-primary flex-1 justify-center">
                <ExternalLink size={15} /> Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Featured spotlight card (large horizontal) ─────── */
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const [modal, setModal] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <>
      <Reveal delay={index * 0.08}>
        <motion.div
          whileHover={{ y: -4 }}
          className="group grid lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:border-blue-500/25 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.12)]">

          {/* Screenshot side */}
          <div className={`lg:col-span-3 group overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <ProjectImage project={project} priority={index === 0} />
          </div>

          {/* Content side */}
          <div className={`lg:col-span-2 flex flex-col justify-center p-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <StatusBadge status={project.status} />
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-[var(--border)]"
                style={{ color: 'var(--text-subtle)' }}>
                {project.category}
              </span>
              <span className="text-xs ml-auto" style={{ color: 'var(--text-subtle)' }}>{project.year}</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black mb-1.5 leading-tight">{project.title}</h3>
            <p className="text-sm font-medium mb-3" style={{ color: project.accentColor }}>{project.tagline}</p>
            <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: 'var(--text-muted)' }}>
              {project.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {project.stats.map(s => (
                <div key={s.label} className="text-center p-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                  <p className="text-sm font-black gradient-text">{s.value}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-subtle)' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Tech */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tech.slice(0, 5).map(t => <span key={t} className="badge">{t}</span>)}
              {project.tech.length > 5 && <span className="badge">+{project.tech.length - 5}</span>}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="btn-secondary flex-1 justify-center text-sm py-2.5">
                <Github size={14} /> Code
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="btn-primary flex-1 justify-center text-sm py-2.5">
                <ExternalLink size={14} /> Demo
              </a>
              <button onClick={() => setModal(true)}
                className="btn-secondary px-3 py-2.5 text-sm"
                title="Case Study">
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </Reveal>

      {modal && <CaseStudyModal project={project} onClose={() => setModal(false)} />}
    </>
  );
}

/* ─── Regular grid card ─────────────────────────────────── */
function GridCard({ project, index }: { project: Project; index: number }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Reveal delay={index * 0.07}>
        <motion.div
          whileHover={{ y: -5 }}
          className="group flex flex-col rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_16px_48px_-12px_rgba(59,130,246,0.10)] h-full">

          {/* Screenshot with zoom */}
          <div className="group overflow-hidden flex-shrink-0">
            <ProjectImage project={project} />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-5">
            {/* Meta row */}
            <div className="flex items-center gap-2 mb-3">
              <StatusBadge status={project.status} />
              <span className="text-xs ml-auto" style={{ color: 'var(--text-subtle)' }}>{project.year}</span>
            </div>

            <h3 className="font-black text-base mb-1 leading-tight">{project.title}</h3>
            <p className="text-xs font-semibold mb-2" style={{ color: project.accentColor }}>{project.tagline}</p>
            <p className="text-sm leading-relaxed mb-4 flex-1 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
              {project.description}
            </p>

            {/* Stats strip */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-0.5">
              {project.stats.slice(0, 3).map(s => (
                <div key={s.label}
                  className="flex-shrink-0 text-center px-2.5 py-1.5 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                  <p className="text-xs font-black gradient-text">{s.value}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-subtle)' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Tech */}
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tech.slice(0, 4).map(t => <span key={t} className="badge text-[11px]">{t}</span>)}
              {project.tech.length > 4 && <span className="badge text-[11px]">+{project.tech.length - 4}</span>}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-1.5 pt-4 border-t border-[var(--border)]">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="btn-secondary justify-center text-xs py-2 col-span-1">
                <Github size={12} />
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="btn-primary justify-center text-xs py-2 col-span-1">
                <ExternalLink size={12} />
              </a>
              <button onClick={() => setModal(true)}
                className="btn-secondary justify-center text-xs py-2 col-span-1 gap-1">
                <ArrowUpRight size={12} /> Case
              </button>
            </div>
          </div>
        </motion.div>
      </Reveal>

      {modal && <CaseStudyModal project={project} onClose={() => setModal(false)} />}
    </>
  );
}

/* ─── Main section ──────────────────────────────────────── */

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const featured = projects.filter(p => p.featured);
  const others   = projects.filter(p => !p.featured);

  const filteredOthers = activeFilter === 'All'
    ? others
    : others.filter(p => p.category.includes(activeFilter));

  const availableCats = ['All', ...Array.from(new Set(others.map(p =>
    // Normalise compound categories to their primary tag for cleaner filter pills
    p.category.split(' / ')[0]
  )))];

  return (
    <section id="projects" className="section-alt">
      <div className="section-container">
        {/* Header */}
        <Reveal>
          <p className="section-label">Projects</p>
          <h2 className="section-title">
            Things I&apos;ve{' '}
            <span className="gradient-text">Built</span>
          </h2>
          <p className="section-subtitle">
            Production-grade projects with real impact metrics, architecture breakdowns, and live demos.
            Click <ArrowUpRight size={13} className="inline" /> on any card for a full case study.
          </p>
        </Reveal>

        {/* ── Featured spotlight ── */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-subtle)' }}>
              ⭐ Featured Work
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs px-2.5 py-1 rounded-full border border-[var(--border)]"
              style={{ color: 'var(--text-subtle)' }}>
              {featured.length} projects
            </span>
          </div>
        </Reveal>

        <div className="space-y-5 mb-16">
          {featured.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        {/* ── Other projects ── */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-subtle)' }}>
              More Projects
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs px-2.5 py-1 rounded-full border border-[var(--border)]"
              style={{ color: 'var(--text-subtle)' }}>
              {others.length} projects
            </span>
          </div>
        </Reveal>

        {/* Category filter tabs */}
        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-8">
            {availableCats.map(cat => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                  activeFilter === cat
                    ? 'border-blue-500/50 bg-blue-500/10 text-blue-400'
                    : 'border-[var(--border)] bg-[var(--card)] hover:border-blue-500/30'
                }`}
                style={activeFilter !== cat ? { color: 'var(--text-muted)' } : {}}>
                {cat}
              </motion.button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOthers.map((p, i) => (
              <GridCard key={p.slug} project={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <a href="https://github.com/DURGESH103" target="_blank" rel="noopener noreferrer"
              className="btn-secondary px-8 py-3 text-sm mx-auto inline-flex">
              <Github size={15} /> View All Projects on GitHub <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
