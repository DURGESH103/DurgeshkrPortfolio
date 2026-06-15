'use client';

import Reveal from '@/components/ui/Reveal';
import { Github, ExternalLink, Star, GitFork, Code2, GitCommitHorizontal } from 'lucide-react';
import { useState } from 'react';

const U = 'DURGESH103';
const GITHUB_URL = `https://github.com/${U}`;
const T = 'hide_border=true&theme=transparent&title_color=3b82f6&text_color=8ba3c0&icon_color=38bdf8';

const fallbackStats = [
  { icon: Code2,              label: 'Repositories',  value: '30+',  color: '#3B82F6' },
  { icon: Star,               label: 'GitHub Stars',  value: '50+',  color: '#F59E0B' },
  { icon: GitCommitHorizontal,label: 'Total Commits', value: '300+', color: '#10B981' },
  { icon: GitFork,            label: 'Contributions', value: '300+', color: '#8B5CF6' },
];

/* Three reliable, free stat cards — no trophies (402 paywalled) */
const statCards = [
  {
    label: 'GitHub Stats',
    src: `https://github-readme-stats.vercel.app/api?username=${U}&show_icons=true&${T}&count_private=true&include_all_commits=true&rank_icon=github`,
  },
  {
    label: 'Streak Stats',
    src: `https://github-readme-streak-stats.herokuapp.com/?user=${U}&${T}&ring=3b82f6&fire=38bdf8&currStreakLabel=3b82f6&currStreakNum=f0f6ff&sideNums=8ba3c0&sideLabels=4d6b8a&dates=4d6b8a`,
  },
  {
    label: 'Top Languages',
    src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${U}&layout=compact&langs_count=8&${T}`,
  },
];

function GithubImg({ label, src }: { label: string; src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="card flex flex-col items-center justify-center min-h-[150px] gap-3 text-center">
        <Github size={26} style={{ color: 'var(--text-subtle)' }} />
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-subtle)' }}>
            View live at{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              className="text-blue-500 hover:underline">github.com/{U}</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card flex items-center justify-center p-5 min-h-[150px] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        /* width + height both set → correct aspect ratio; CSS makes it responsive */
        width={500}
        height={200}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    </div>
  );
}

export default function GithubDashboard() {
  return (
    <section id="github" className="section-alt">
      <div className="section-container">
        <Reveal>
          <p className="section-label">GitHub</p>
          <h2 className="section-title">
            Open Source{' '}
            <span className="gradient-text">Activity</span>
          </h2>
          <p className="section-subtitle">
            Live stats for{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              className="text-blue-500 font-semibold hover:underline">
              @{U}
            </a>{' '}
            — contributions, streak, and top languages. Powered by GitHub APIs.
          </p>
        </Reveal>

        {/* Always-visible fallback counters */}
        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {fallbackStats.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="card text-center py-4">
                <Icon size={20} className="mx-auto mb-2" style={{ color }} />
                <p className="text-2xl font-black mb-0.5" style={{ color }}>{value}</p>
                <p className="text-xs font-medium" style={{ color: 'var(--text-subtle)' }}>{label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="space-y-5">
          {/* Stats + Streak side by side */}
          <div className="grid md:grid-cols-2 gap-5">
            {statCards.slice(0, 2).map((c, i) => (
              <Reveal key={c.label} delay={0.1 + i * 0.05}>
                <GithubImg label={c.label} src={c.src} />
              </Reveal>
            ))}
          </div>

          {/* Top Languages full-width */}
          <Reveal delay={0.2}>
            <GithubImg label={statCards[2].label} src={statCards[2].src} />
          </Reveal>

          {/* Profile CTA */}
          <Reveal delay={0.25}>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              className="card card-hover flex items-center justify-between gap-4 p-5 group">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[var(--border)] flex items-center justify-center flex-shrink-0">
                  <Github size={22} style={{ color: 'var(--text-muted)' }} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-base">github.com/{U}</p>
                  <p className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
                    Explore all repositories, commits &amp; contributions
                  </p>
                </div>
              </div>
              <ExternalLink size={18} style={{ color: 'var(--text-subtle)' }}
                className="group-hover:text-blue-500 transition-colors flex-shrink-0" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
