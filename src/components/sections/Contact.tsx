'use client';

import { useState, FormEvent } from 'react';
import Reveal from '@/components/ui/Reveal';
import { Send, Mail, MapPin, Github, Linkedin, Code2, ArrowRight, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { motion } from 'framer-motion';

const contactLinks = [
  { icon: Mail,     label: 'Email',    value: siteConfig.email,              href: `mailto:${siteConfig.email}`, color: '#EF4444' },
  { icon: Linkedin, label: 'LinkedIn', value: 'in/durgeshkumardk',           href: siteConfig.linkedin,          color: '#0A66C2' },
  { icon: Github,   label: 'GitHub',   value: 'github/DURGESH103',           href: siteConfig.github,            color: '#6B7280' },
  { icon: Code2,    label: 'LeetCode', value: 'lc/durgeshkumar',             href: siteConfig.leetcode,          color: '#FFA116' },
  { icon: MapPin,   label: 'Location', value: 'India 🇮🇳',                  href: null,                         color: '#10B981' },
];

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 placeholder:text-[var(--text-subtle)]';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Wire to Formspree: fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: JSON.stringify(form) })
    await new Promise(r => setTimeout(r, 1400));
    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact">
      <div className="section-container">
        {/* Premium CTA headline */}
        <Reveal>
          <p className="section-label">Contact</p>
          <h2 className="section-title">
            Let&apos;s Build Something{' '}
            <span className="gradient-text">Amazing</span>
            <br />
            Together
          </h2>
          <p className="section-subtitle">
            Open to SWE internships, full-time roles, freelance projects, and technical
            collaborations. I reply within 24 hours — always.
          </p>
        </Reveal>

        {/* Open-to-work banner */}
        <Reveal delay={0.1}>
          <div className="flex items-center justify-center gap-3 mb-12 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 max-w-xl mx-auto">
            <Sparkles size={15} className="text-emerald-400 flex-shrink-0" />
            <p className="text-sm font-semibold text-emerald-400">
              Currently open to Summer 2025 internships &amp; 2026 new-grad SWE roles
            </p>
            <ArrowRight size={14} className="text-emerald-400 flex-shrink-0" />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {/* Contact cards */}
          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="space-y-3 h-full">
              {contactLinks.map(({ icon: Icon, label, value, href, color }) => (
                <motion.div key={label} whileHover={{ x: 4 }}
                  className="card flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: `${color}14`, border: `1px solid ${color}22` }}>
                    <Icon size={17} style={{ color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider mb-0.5"
                      style={{ color: 'var(--text-subtle)' }}>{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="text-sm font-semibold hover:text-blue-500 transition-colors truncate block">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.2} className="lg:col-span-3">
            <form onSubmit={submit} className="card space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Name *</label>
                  <input name="name" value={form.name} onChange={handle} required
                    placeholder="Your full name" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handle} required
                    placeholder="you@company.com" className={inputCls} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Subject *</label>
                <input name="subject" value={form.subject} onChange={handle} required
                  placeholder="Internship Opportunity / Project Collaboration / ..."
                  className={inputCls} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Message *</label>
                <textarea name="message" value={form.message} onChange={handle} required rows={5}
                  placeholder="Tell me about the role, project, or just say hi — I'd love to hear from you!"
                  className={`${inputCls} resize-none`} />
              </div>

              <motion.button type="submit"
                disabled={status === 'sending' || status === 'sent'}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="btn-primary w-full justify-center py-3.5 text-base">
                {status === 'sending'
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                  : status === 'sent'
                  ? <>✅ Sent! I&apos;ll reply within 24h</>
                  : <><Send size={16} /> Send Message</>
                }
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
