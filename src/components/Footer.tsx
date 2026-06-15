'use client';

import { navLinks, siteConfig } from '@/data/config';
import { Github, Linkedin, Mail, Code2, ArrowUp, ChefHat, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const socials = [
  { icon: Github,   href: siteConfig.github,                 label: 'GitHub',   display: 'github/DURGESH103' },
  { icon: Linkedin, href: siteConfig.linkedin,               label: 'LinkedIn', display: 'in/durgeshkumardk' },
  { icon: Code2,    href: siteConfig.leetcode,               label: 'LeetCode' },
  { icon: ChefHat,  href: siteConfig.codechef,               label: 'CodeChef' },
  { icon: Mail,     href: `mailto:${siteConfig.email}`,      label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-500/20">
                DK
              </div>
              <div>
                <p className="font-bold text-sm">Durgesh Kumar</p>
                <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>Software Engineer</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Final-year B.Tech CS student building high-impact web applications.
              Open to SWE internships and full-time roles.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--card)] hover:border-blue-500/50 hover:text-blue-500 transition-all duration-200"
                  style={{ color: 'var(--text-muted)' }}>
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-bold text-sm mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {navLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm hover:text-blue-500 transition-colors"
                    style={{ color: 'var(--text-muted)' }}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="font-bold text-sm mb-4">Let&apos;s Connect</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
              I&apos;m actively seeking Summer 2025 internships and new grad SWE positions.
            </p>
            <a href={`mailto:${siteConfig.email}`}
              className="btn-primary text-sm w-full justify-center mb-2">
              <Mail size={14} /> Get in Touch
            </a>
            <a href={siteConfig.resume} download
              className="btn-secondary text-sm w-full justify-center">
              Download Resume
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-[var(--border)]">
          <p className="text-xs flex items-center gap-1" style={{ color: 'var(--text-subtle)' }}>
            © {new Date().getFullYear()} Durgesh Kumar · Built with Next.js &amp;
            <Heart size={11} className="text-red-400 inline fill-red-400" />
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -2 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--card)] hover:border-blue-500/50 hover:text-blue-500 transition-all duration-200"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Back to top">
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
