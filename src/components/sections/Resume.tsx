'use client';

import Reveal from '@/components/ui/Reveal';
import { Download, FileText, X, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const atsPoints = [
  'Clean single-column layout for ATS parsers',
  'Quantified impact metrics on every bullet',
  'Keywords matched to JD (React, Node.js, AWS)',
  'No tables, images, or special characters',
  'Standard section headings recognized by ATS',
];

export default function Resume() {
  const [preview, setPreview] = useState(false);

  return (
    <section id="resume" className="bg-[var(--bg-secondary)]">
      <div className="section-container">
        <Reveal>
          <p className="section-label">Resume</p>
          <h2 className="section-title">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="section-subtitle">
            ATS-optimized, impact-driven resume ready for top product-based companies.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {/* Left: info + ATS score */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="space-y-5">
              {/* ATS Score card */}
              <div className="card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                  style={{ background: '#10B98120' }} />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-subtle)' }}>
                      ATS Score
                    </p>
                    <p className="text-3xl font-black text-emerald-500">96<span className="text-lg">/100</span></p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {atsPoints.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Download */}
              <div className="card flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">DurgeshKumar_Resume.pdf</p>
                    <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>Updated 2025</p>
                  </div>
                </div>
                <a href={siteConfig.resume} download
                  className="btn-primary text-xs px-4 py-2 flex-shrink-0">
                  <Download size={13} />
                </a>
              </div>

              <button onClick={() => setPreview(true)}
                className="btn-secondary w-full justify-center text-sm py-3">
                <FileText size={15} /> Preview Resume
              </button>
            </div>
          </Reveal>

          {/* Right: embedded PDF */}
          <Reveal delay={0.2} className="lg:col-span-3">
            <div className="card p-0 overflow-hidden" style={{ height: 500 }}>
              <object data={siteConfig.resume} type="application/pdf" className="w-full h-full">
                <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                  <FileText size={48} className="text-blue-500" />
                  <p className="font-semibold">PDF preview not available</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Add your resume at <code className="text-blue-400 text-xs">public/resume.pdf</code>
                  </p>
                  <a href={siteConfig.resume} download className="btn-primary">
                    <Download size={15} /> Download Instead
                  </a>
                </div>
              </object>
            </div>
          </Reveal>
        </div>

        {/* Modal preview */}
        <AnimatePresence>
          {preview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              onClick={() => setPreview(false)}>
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-[var(--card)] rounded-2xl overflow-hidden"
                style={{ height: '85vh' }}>
                <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
                  <p className="font-semibold text-sm">Resume Preview</p>
                  <div className="flex gap-2">
                    <a href={siteConfig.resume} download className="btn-primary text-xs px-3 py-1.5">
                      <Download size={12} /> Download
                    </a>
                    <button onClick={() => setPreview(false)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center border border-[var(--border)]"
                      style={{ color: 'var(--text-muted)' }}>
                      <X size={13} />
                    </button>
                  </div>
                </div>
                <object data={siteConfig.resume} type="application/pdf" className="w-full" style={{ height: 'calc(85vh - 52px)' }}>
                  <div className="flex items-center justify-center h-full p-8 text-center">
                    <p style={{ color: 'var(--text-muted)' }}>Add <code>public/resume.pdf</code> to preview here.</p>
                  </div>
                </object>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
