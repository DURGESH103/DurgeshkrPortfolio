'use client';

import Reveal from '@/components/ui/Reveal';
import { Github, ExternalLink, Star, Code2, Users, Activity, Flame, TrendingUp, Calendar, Clock, GitFork, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import type { GitHubStats, LangStat, ActivityItem } from '@/app/api/github-stats/route';

const U          = 'DURGESH103';
const GITHUB_URL = `https://github.com/${U}`;

/* ── Fetch hook ──────────────────────────────────────────── */
function useGitHubStats() {
  const [data,    setData]    = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    const CACHE_KEY = 'gh_stats_v3';
    const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 h

    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const { ts, payload } = JSON.parse(raw) as { ts: number; payload: GitHubStats };
        if (Date.now() - ts < CACHE_TTL) {
          setData(payload);
          setLoading(false);
          return;
        }
      }
    } catch { /* ignore */ }

    fetch('/api/github-stats')
      .then(r => { if (!r.ok) throw new Error(); return r.json() as Promise<GitHubStats>; })
      .then(payload => {
        setData(payload);
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), payload })); } catch { /* ignore */ }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

/* ── Skeleton ────────────────────────────────────────────── */
function Sk({ className }: { className?: string }) {
  return <div className={`shimmer rounded-lg ${className ?? ''}`} />;
}

/* ── Top 4 stat cards ────────────────────────────────────── */
const TOP_CARDS = [
  { key: 'repos'                 as keyof GitHubStats, icon: Code2,    label: 'Repositories',         color: '#3B82F6' },
  { key: 'stars'                 as keyof GitHubStats, icon: Star,     label: 'GitHub Stars',         color: '#F59E0B' },
  { key: 'contributionsLastYear' as keyof GitHubStats, icon: Activity, label: 'Contributions (1 yr)', color: '#10B981' },
  { key: 'followers'             as keyof GitHubStats, icon: Users,    label: 'Followers',            color: '#8B5CF6' },
] as const;

function TopCards({ data, loading, error }: { data: GitHubStats | null; loading: boolean; error: boolean }) {
  if (loading) return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
      {TOP_CARDS.map(c => (
        <div key={c.key} className="card text-center py-5 space-y-3">
          <Sk className="w-5 h-5 mx-auto" /><Sk className="h-7 w-14 mx-auto" /><Sk className="h-2.5 w-24 mx-auto" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
      {TOP_CARDS.map(({ key, icon: Icon, label, color }, i) => {
        const raw = data?.[key];
        const val = !error && raw != null ? Number(raw).toLocaleString() : '—';
        return (
          <motion.div key={key}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="card text-center py-5">
            <Icon size={20} className="mx-auto mb-2" style={{ color }} />
            <p className="text-2xl font-black mb-1" style={{ color }}>{val}</p>
            <p className="text-xs font-medium" style={{ color: 'var(--text-subtle)' }}>{label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── Secondary detail row ────────────────────────────────── */
function DetailRow({ data, loading, error }: { data: GitHubStats | null; loading: boolean; error: boolean }) {
  const items = [
    { icon: Flame,      label: 'Current Streak', value: data?.currentStreak  != null ? `${data.currentStreak}d`  : '—', color: '#F59E0B' },
    { icon: TrendingUp, label: 'Longest Streak',  value: data?.longestStreak  != null ? `${data.longestStreak}d`  : '—', color: '#10B981' },
    { icon: Users,      label: 'Following',       value: data?.following       != null ? String(data.following)    : '—', color: '#8B5CF6' },
    { icon: Calendar,   label: 'Last Active',
      value: data?.lastActiveDate
        ? new Date(data.lastActiveDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '—',
      color: '#38BDF8',
    },
  ];

  return (
    <div className="card p-5 mb-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500 mb-4">Activity Overview</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex flex-col items-center text-center gap-1.5">
            {loading
              ? <><Sk className="w-8 h-8 rounded-xl" /><Sk className="h-5 w-12 mt-1" /><Sk className="h-2.5 w-20 mt-0.5" /></>
              : <>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <p className="text-base font-black" style={{ color: error ? 'var(--text-subtle)' : color }}>{value}</p>
                  <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>{label}</p>
                </>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Language bars ───────────────────────────────────────── */
function LangBar({ lang, animate }: { lang: LangStat; animate: boolean }) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.02 }}
      className="relative flex flex-col gap-2 rounded-xl p-3.5 border border-[var(--border)] bg-[var(--card)] overflow-hidden cursor-default"
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${lang.color}40`;
        (e.currentTarget as HTMLElement).style.boxShadow  = `0 6px 20px -4px ${lang.color}22`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow  = 'none';
      }}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: lang.color, boxShadow: `0 0 6px ${lang.color}60` }} />
          <span className="text-sm font-semibold truncate">{lang.name}</span>
        </div>
        <span className="text-xs font-bold flex-shrink-0" style={{ color: lang.color }}>{lang.pct}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
        <motion.div className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg,${lang.color},${lang.color}99)`, boxShadow: `0 0 6px ${lang.color}50` }}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${lang.pct}%` : 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} />
      </div>
    </motion.div>
  );
}

function Languages({ data, loading, error }: { data: GitHubStats | null; loading: boolean; error: boolean }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div ref={ref} className="card p-5 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500">Top Languages</p>
        <a href={`${GITHUB_URL}?tab=repositories`} target="_blank" rel="noopener noreferrer"
          className="text-xs text-blue-500 hover:underline flex items-center gap-1">
          <Eye size={11} /> All repos
        </a>
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => <Sk key={i} className="h-[72px]" />)}
        </div>
      )}

      {error && (
        <p className="text-sm text-center py-3" style={{ color: 'var(--text-subtle)' }}>
          Language data unavailable
        </p>
      )}

      {!loading && !error && (
        <>
          {(data?.topLanguages ?? []).length === 0
            ? <p className="text-sm text-center py-3" style={{ color: 'var(--text-subtle)' }}>No language data</p>
            : <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(data!.topLanguages).map(lang => <LangBar key={lang.name} lang={lang} animate={inView} />)}
              </div>
          }
          <p className="text-[11px] text-center" style={{ color: 'var(--text-subtle)' }}>
            Calculated from actual repository language bytes · forks excluded
          </p>
        </>
      )}
    </div>
  );
}

/* ── Most starred repo ───────────────────────────────────── */
function TopRepo({ data, loading, error }: { data: GitHubStats | null; loading: boolean; error: boolean }) {
  if (loading) return (
    <div className="card p-5 space-y-3">
      <Sk className="h-3 w-36" /><Sk className="h-6 w-48" />
      <div className="flex gap-2"><Sk className="h-5 w-16" /><Sk className="h-5 w-20" /></div>
    </div>
  );

  if (error || !data?.mostStarredRepo) return (
    <div className="card p-5 flex items-center gap-3">
      <Star size={16} style={{ color: 'var(--text-subtle)' }} />
      <p className="text-sm" style={{ color: 'var(--text-subtle)' }}>Most starred repo unavailable</p>
    </div>
  );

  const repo = data.mostStarredRepo;
  return (
    <a href={repo.url} target="_blank" rel="noopener noreferrer"
      className="card card-hover p-5 flex items-center justify-between gap-4 group">
      <div className="space-y-1.5 min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-500">Most Starred Repository</p>
        <p className="font-bold text-base truncate">{repo.name}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-xs font-semibold text-yellow-500">
            <Star size={12} /> {repo.stars.toLocaleString()}
          </span>
          {repo.language && <span className="badge">{repo.language}</span>}
        </div>
      </div>
      <ExternalLink size={16} style={{ color: 'var(--text-subtle)' }} className="group-hover:text-blue-500 transition-colors flex-shrink-0" />
    </a>
  );
}

/* ── Recent activity ─────────────────────────────────────── */
const EV_META: Record<string, { icon: React.ElementType; color: string }> = {
  PushEvent:        { icon: GitFork,  color: '#3B82F6' },
  CreateEvent:      { icon: Code2,    color: '#10B981' },
  PullRequestEvent: { icon: GitFork,  color: '#8B5CF6' },
  WatchEvent:       { icon: Star,     color: '#F59E0B' },
  ForkEvent:        { icon: GitFork,  color: '#38BDF8' },
};
function evMeta(type: string) { return EV_META[type] ?? { icon: Activity, color: '#64748B' }; }

function RecentActivity({ data, loading, error }: { data: GitHubStats | null; loading: boolean; error: boolean }) {
  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500">Recent Activity</p>
        <a href={`${GITHUB_URL}?tab=overview`} target="_blank" rel="noopener noreferrer"
          className="text-xs text-blue-500 hover:underline flex items-center gap-1"><Eye size={11} /> View all</a>
      </div>

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Sk className="w-7 h-7 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-1.5"><Sk className="h-3 w-3/4" /><Sk className="h-2.5 w-1/2" /></div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-center py-3" style={{ color: 'var(--text-subtle)' }}>
          Activity unavailable ·{' '}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View on GitHub</a>
        </p>
      )}

      {!loading && !error && (
        <div className="space-y-2.5">
          {(data?.recentActivity ?? [] as ActivityItem[]).length === 0
            ? <p className="text-sm text-center py-3" style={{ color: 'var(--text-subtle)' }}>No recent activity</p>
            : (data!.recentActivity).map((ev, i) => {
                const { icon: Icon, color } = evMeta(ev.type);
                const repoShort = ev.repo.replace(`${U}/`, '');
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${color}18` }}>
                      <Icon size={13} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold leading-snug truncate">{ev.detail}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <a href={ev.repoUrl} target="_blank" rel="noopener noreferrer"
                          className="text-[11px] text-blue-500 hover:underline truncate">{repoShort}</a>
                        <span className="text-[11px] flex-shrink-0" style={{ color: 'var(--text-subtle)' }}>
                          <Clock size={9} className="inline mr-0.5" />
                          {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
          }
        </div>
      )}
    </div>
  );
}

/* ── GitHub image cards (contribution graph / streak) ────── */
function GithubImgCard({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return (
    <div className="card flex flex-col items-center justify-center min-h-[140px] gap-2 text-center">
      <Github size={20} style={{ color: 'var(--text-subtle)' }} />
      <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View on GitHub</a>
      </p>
    </div>
  );
  return (
    <div className="card flex items-center justify-center p-4 min-h-[140px] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={500} height={180}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        onError={() => setFailed(true)} loading="lazy" />
    </div>
  );
}

const T = 'hide_border=true&theme=transparent&title_color=3b82f6&text_color=8ba3c0&icon_color=38bdf8';

/* ── Error banner ────────────────────────────────────────── */
function ErrorBanner() {
  return (
    <div className="card p-5 text-center space-y-2 border-red-500/20">
      <Github size={24} className="mx-auto" style={{ color: 'var(--text-subtle)' }} />
      <p className="font-semibold text-sm">Unable to fetch GitHub data</p>
      <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
        Live stats are temporarily unavailable. View profile at{' '}
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">github.com/{U}</a>
      </p>
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────── */
export default function GithubDashboard() {
  const { data, loading, error } = useGitHubStats();

  return (
    <section id="github" className="section-alt">
      <div className="section-container">
        <Reveal>
          <p className="section-label">GitHub</p>
          <h2 className="section-title">Open Source <span className="gradient-text">Activity</span></h2>
          <p className="section-subtitle">
            Live stats from{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              className="text-blue-500 font-semibold hover:underline">@{U}</a>
            {' '}via GitHub API
          </p>
        </Reveal>

        <Reveal delay={0.05}><TopCards  data={data} loading={loading} error={error} /></Reveal>
        <Reveal delay={0.08}><DetailRow data={data} loading={loading} error={error} /></Reveal>

        {error && <Reveal delay={0.1}><ErrorBanner /></Reveal>}

        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-5">
            <Reveal delay={0.11}><TopRepo        data={data} loading={loading} error={error} /></Reveal>
            <Reveal delay={0.13}><RecentActivity data={data} loading={loading} error={error} /></Reveal>
          </div>
          <div className="space-y-5">
            <Reveal delay={0.12}>
              <GithubImgCard
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${U}&${T}&ring=3b82f6&fire=38bdf8&currStreakLabel=3b82f6&currStreakNum=f0f6ff&sideNums=8ba3c0&sideLabels=4d6b8a&dates=4d6b8a`}
                alt="GitHub Streak" />
            </Reveal>
            <Reveal delay={0.14}><Languages data={data} loading={loading} error={error} /></Reveal>
          </div>
        </div>

        <Reveal delay={0.18}>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
            className="card card-hover flex items-center justify-between gap-4 p-5 group mt-5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[var(--border)] flex items-center justify-center flex-shrink-0">
                <Github size={20} style={{ color: 'var(--text-muted)' }} />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm">github.com/{U}</p>
                <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>Explore all repositories &amp; contributions</p>
              </div>
            </div>
            <ExternalLink size={16} style={{ color: 'var(--text-subtle)' }} className="group-hover:text-blue-500 transition-colors flex-shrink-0" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
