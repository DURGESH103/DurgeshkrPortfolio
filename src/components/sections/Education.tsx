'use client';

import { education } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ShieldCheck, CheckCircle2,
  FileText, ImageIcon, X, Download,
  ZoomIn, ZoomOut, RotateCcw,
} from 'lucide-react';
import { useState, useCallback } from 'react';

type ProofConfig = { type: 'pdf' | 'image'; src: string; label: string };
type EduEntry = (typeof education)[0] & { proof?: ProofConfig };

/* ─── Document Modal ────────────────────────────────────── */
function ProofModal({
  proof,
  title,
  onClose,
}: {
  proof: ProofConfig;
  title: string;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const clampZoom = useCallback((z: number) => Math.min(3, Math.max(0.5, z)), []);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Modal panel */}
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
          className="relative flex flex-col w-full max-w-3xl rounded-2xl overflow-hidden"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            maxHeight: '90vh',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Toolbar */}
          <div
            className="flex items-center justify-between gap-3 px-4 py-3 flex-shrink-0 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            {/* Left: doc info */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                {proof.type === 'pdf'
                  ? <FileText size={13} className="text-blue-400" />
                  : <ImageIcon size={13} className="text-blue-400" />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate">{proof.label}</p>
                <p className="text-xs truncate" style={{ color: 'var(--text-subtle)' }}>{title}</p>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Zoom controls — only for images */}
              {proof.type === 'image' && (
                <>
                  <button
                    onClick={() => setZoom(z => clampZoom(z - 0.25))}
                    className="w-7 h-7 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--bg)] hover:border-blue-500/40 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={12} />
                  </button>
                  <button
                    onClick={() => setZoom(z => clampZoom(z + 0.25))}
                    className="w-7 h-7 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--bg)] hover:border-blue-500/40 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={12} />
                  </button>
                  <button
                    onClick={() => setZoom(1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--bg)] hover:border-blue-500/40 transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    aria-label="Reset zoom"
                  >
                    <RotateCcw size={12} />
                  </button>
                </>
              )}

              {/* Download */}
              <a
                href={proof.src}
                download
                className="w-7 h-7 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--bg)] hover:border-blue-500/40 transition-colors"
                style={{ color: 'var(--text-muted)' }}
                aria-label="Download"
                onClick={e => e.stopPropagation()}
              >
                <Download size={12} />
              </a>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--bg)] hover:border-red-500/40 hover:text-red-400 transition-colors"
                style={{ color: 'var(--text-muted)' }}
                aria-label="Close"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Content area */}
          <div
            className="flex-1 overflow-auto flex items-start justify-center p-4"
            style={{ background: 'var(--bg)', minHeight: 320 }}
          >
            {proof.type === 'image' ? (
              <motion.div
                animate={{ scale: zoom }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{ transformOrigin: 'top center' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={proof.src}
                  alt={proof.label}
                  className="max-w-full rounded-xl shadow-2xl"
                  style={{ display: 'block' }}
                  onError={e => {
                    /* Show placeholder if file not found */
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    (e.currentTarget.nextElementSibling as HTMLElement | null)
                      ?.style.setProperty('display', 'flex');
                  }}
                />
                {/* Placeholder shown if image missing */}
                <div
                  style={{ display: 'none' }}
                  className="w-full min-h-[320px] rounded-xl border border-dashed border-[var(--border)] items-center justify-center flex-col gap-3 text-center p-8"
                >
                  <ImageIcon size={36} style={{ color: 'var(--text-subtle)' }} />
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                    Marksheet not found
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
                    Add your file to{' '}
                    <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-[11px]">
                      {proof.src}
                    </code>
                  </p>
                </div>
              </motion.div>
            ) : (
              /* PDF embed */
              <div className="w-full flex flex-col gap-3">
                <object
                  data={proof.src}
                  type="application/pdf"
                  className="w-full rounded-xl border border-[var(--border)]"
                  style={{ minHeight: 480 }}
                >
                  {/* PDF fallback */}
                  <div className="flex flex-col items-center justify-center min-h-[320px] gap-4 p-8 text-center rounded-xl border border-dashed border-[var(--border)]">
                    <FileText size={36} style={{ color: 'var(--text-subtle)' }} />
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
                        PDF preview not available
                      </p>
                      <p className="text-xs mb-4" style={{ color: 'var(--text-subtle)' }}>
                        Add your CGPA report to{' '}
                        <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded text-[11px]">
                          {proof.src}
                        </code>
                      </p>
                      <a href={proof.src} download className="btn-primary text-xs px-4 py-2">
                        <Download size={13} /> Download PDF
                      </a>
                    </div>
                  </div>
                </object>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-t flex-shrink-0"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-subtle)' }}>
              <ShieldCheck size={12} className="text-emerald-500" />
              Verified Academic Record
            </div>
            {proof.type === 'image' && (
              <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
                Zoom: {Math.round(zoom * 100)}%
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Education card ────────────────────────────────────── */
function EduCard({ edu }: { edu: EduEntry }) {
  const [open, setOpen] = useState(false);
  const proof = edu.proof;

  return (
    <>
      <motion.div whileHover={{ x: 3 }} className="card flex-1 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-black text-lg leading-tight">{edu.degree}</h3>
            <p className="text-sm font-semibold text-blue-500 mt-0.5">{edu.institution}</p>
            <p className="text-sm font-bold text-emerald-500 mt-0.5">{edu.grade}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]"
              style={{ color: 'var(--text-muted)' }}
            >
              {edu.duration}
            </span>
            {/* Verified badge per card */}
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
              <ShieldCheck size={10} />
              Verified
            </span>
          </div>
        </div>

        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{edu.description}</p>

        {/* Stats */}
        {'stats' in edu && Array.isArray(edu.stats) && edu.stats.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(edu.stats as { label: string; value: string }[]).map(s => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)]"
              >
                <span className="text-xs font-black gradient-text">{s.value}</span>
                <span className="text-xs" style={{ color: 'var(--text-subtle)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Coursework */}
        {edu.coursework.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <BookOpen size={12} style={{ color: 'var(--text-subtle)' }} />
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>
                Key Subjects
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {edu.coursework.map(c => (
                <span key={c} className="badge text-[11px]">{c}</span>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {'highlights' in edu && Array.isArray(edu.highlights) && edu.highlights.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-1.5">
              {(edu.highlights as string[]).map((h, j) => (
                <li key={j} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* View Proof button */}
        {proof && (
          <div className="pt-3 border-t border-[var(--border)]">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200"
              style={{
                borderColor: 'rgba(59,130,246,0.3)',
                color: '#3b82f6',
                background: 'rgba(59,130,246,0.06)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.12)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.5)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.06)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.3)';
              }}
            >
              {proof.type === 'pdf'
                ? <FileText size={12} />
                : <ImageIcon size={12} />}
              {proof.label}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Modal — rendered outside card so it overlays full screen */}
      {open && proof && (
        <ProofModal proof={proof} title={edu.degree} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

/* ─── Section ───────────────────────────────────────────── */
export default function Education() {
  return (
    <section id="education">
      <div className="section-container">
        <Reveal>
          <p className="section-label">Education</p>
          <h2 className="section-title">
            Academic{' '}
            <span className="gradient-text">Background</span>
          </h2>
          <p className="section-subtitle">
            My educational journey — real records, real numbers, real foundation.
          </p>
        </Reveal>

        {/* Global verified badge */}
        <Reveal delay={0.05}>
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-emerald-400 text-xs font-semibold">
              <ShieldCheck size={13} />
              Verified Academic Records
            </div>
          </div>
        </Reveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline spine */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, #3b82f6, #06b6d4, transparent)' }}
          />

          <div className="space-y-6">
            {(education as EduEntry[]).map((edu, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="flex gap-6">
                  {/* Icon node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/30 text-xl">
                      {edu.icon}
                    </div>
                  </div>
                  <EduCard edu={edu} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
