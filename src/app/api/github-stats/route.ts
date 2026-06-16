import { NextResponse } from 'next/server';

const USERNAME = 'DURGESH103';
const BASE     = 'https://api.github.com';

// Revalidate every 6 hours at the edge
export const revalidate = 21600;

/* ── Public types (imported by the dashboard) ────────────── */
export interface LangStat    { name: string; pct: number; color: string; bytes: number; }
export interface ActivityItem { type: string; repo: string; repoUrl: string; detail: string; date: string; }
export interface GitHubStats {
  repos:                 number;
  stars:                 number;
  followers:             number;
  following:             number;
  contributionsLastYear: number;
  currentStreak:         number;
  longestStreak:         number;
  lastActiveDate:        string;   // YYYY-MM-DD
  mostStarredRepo:       { name: string; stars: number; url: string; language: string | null } | null;
  topLanguages:          LangStat[];
  recentActivity:        ActivityItem[];
}

/* ── Helpers ─────────────────────────────────────────────── */
const LANG_COLORS: Record<string, string> = {
  JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3776AB',
  HTML: '#E34F26', CSS: '#264DE4', Java: '#B07219', 'C++': '#F34B7D',
  C: '#555555', Go: '#00ADD8', Rust: '#DEA584', Ruby: '#701516',
  Shell: '#89E051', Vue: '#42B883', Svelte: '#FF3E00', Kotlin: '#A97BFF',
  Swift: '#F05138', PHP: '#777BB4', Dart: '#00B4AB', 'C#': '#178600',
  Scala: '#DC322F',
};
function langColor(name: string) { return LANG_COLORS[name] ?? '#8B5CF6'; }

function ghHeaders(): HeadersInit {
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };
}

function eventDetail(type: string, payload: Record<string, unknown>): string {
  switch (type) {
    case 'PushEvent':        return `Pushed ${(payload.commits as unknown[] | undefined)?.length ?? 0} commit(s)`;
    case 'CreateEvent':      return `Created ${payload.ref_type ?? 'branch/tag'}`;
    case 'PullRequestEvent': return `PR ${payload.action ?? 'opened'}`;
    case 'IssuesEvent':      return `Issue ${payload.action ?? 'opened'}`;
    case 'ForkEvent':        return 'Forked repository';
    case 'WatchEvent':       return 'Starred repository';
    case 'ReleaseEvent':     return 'Published a release';
    case 'DeleteEvent':      return `Deleted ${payload.ref_type ?? 'ref'}`;
    default:                 return type.replace('Event', '');
  }
}

/* ── Streak calculation from sorted contribution dates ────── */
function computeStreaks(days: { date: string; count: number }[]) {
  const active = new Set(days.filter(d => d.count > 0).map(d => d.date));
  if (active.size === 0) return { currentStreak: 0, longestStreak: 0 };

  const sorted = [...active].sort();

  // Longest streak
  let longest = 1, run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const gap = (new Date(sorted[i]).getTime() - new Date(sorted[i - 1]).getTime()) / 86_400_000;
    run = gap === 1 ? run + 1 : 1;
    if (run > longest) longest = run;
  }

  // Current streak — walk back from today (or yesterday if today has no contributions yet)
  const todayStr = new Date().toISOString().slice(0, 10);
  const seed     = active.has(todayStr)
    ? new Date(todayStr)
    : (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d; })();

  let current = 0;
  const cursor = new Date(seed);
  while (active.has(cursor.toISOString().slice(0, 10))) {
    current++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return { currentStreak: current, longestStreak: longest };
}

/* ── GraphQL: contribution calendar ─────────────────────── */
interface ContribDay  { contributionCount: number; date: string; }
interface ContribWeek { contributionDays: ContribDay[]; }

async function fetchContributions(): Promise<{ days: { date: string; count: number }[]; total: number }> {
  if (!process.env.GITHUB_TOKEN) return { days: [], total: 0 };

  const query = `{
    user(login: "${USERNAME}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }`;

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 21600 },
  });

  if (!res.ok) return { days: [], total: 0 };

  const json = await res.json() as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions: number;
            weeks: ContribWeek[];
          };
        };
      };
    };
  };

  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) return { days: [], total: 0 };

  const days = cal.weeks.flatMap(w => w.contributionDays.map(d => ({ date: d.date, count: d.contributionCount })));
  return { days, total: cal.totalContributions };
}

/* ── Fallback contributions via public contributions-api ─── */
async function fetchContribsFallback(): Promise<{ days: { date: string; count: number }[]; total: number }> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      { next: { revalidate: 21600 } },
    );
    if (!res.ok) return { days: [], total: 0 };

    const json = await res.json() as {
      contributions?: { date: string; count: number }[];
      total?: Record<string, number>;
    };

    const days  = (json.contributions ?? []).map(c => ({ date: c.date, count: c.count }));
    const total = Object.values(json.total ?? {}).reduce((a, b) => a + b, 0);
    return { days, total };
  } catch {
    return { days: [], total: 0 };
  }
}

/* ── Main handler ────────────────────────────────────────── */
export async function GET() {
  try {
    const headers = ghHeaders();
    const fetchOpts = { headers, next: { revalidate: 21600 } } as RequestInit & { next: { revalidate: number } };

    /* 1 — User profile */
    const userRes = await fetch(`${BASE}/users/${USERNAME}`, fetchOpts);
    if (!userRes.ok) throw new Error(`user: ${userRes.status}`);
    const user = await userRes.json() as {
      public_repos: number; followers: number; following: number;
    };

    /* 2 — All owned repos (paginated up to 500) */
    type Repo = {
      name: string; html_url: string; fork: boolean;
      stargazers_count: number; language: string | null;
      languages_url: string;
    };
    let allRepos: Repo[] = [];
    for (let page = 1; page <= 5; page++) {
      const r = await fetch(
        `${BASE}/users/${USERNAME}/repos?per_page=100&page=${page}&type=owner&sort=updated`,
        fetchOpts,
      );
      if (!r.ok) break;
      const batch: Repo[] = await r.json();
      if (!Array.isArray(batch) || batch.length === 0) break;
      allRepos = allRepos.concat(batch);
      if (batch.length < 100) break;
    }

    const ownedRepos = allRepos.filter(r => !r.fork);
    const totalStars = ownedRepos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0);
    const topRepo    = [...ownedRepos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0] ?? null;

    /* 3 — Language bytes across ALL owned repos (sample top 30 by stars) */
    const reposToSample = [...ownedRepos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 30);

    const langBytes: Record<string, number> = {};
    await Promise.allSettled(
      reposToSample.map(async repo => {
        try {
          const r = await fetch(repo.languages_url, fetchOpts);
          if (!r.ok) return;
          const data: Record<string, number> = await r.json();
          for (const [lang, bytes] of Object.entries(data)) {
            langBytes[lang] = (langBytes[lang] ?? 0) + bytes;
          }
        } catch { /* ignore individual failures */ }
      }),
    );

    const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0);
    const topLanguages: LangStat[] = totalBytes > 0
      ? Object.entries(langBytes)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, bytes]) => ({
            name,
            bytes,
            pct: Math.round((bytes / totalBytes) * 100),
            color: langColor(name),
          }))
      : [];

    /* 4 — Recent public events */
    type GHEvent = {
      type: string;
      repo: { name: string; url: string };
      created_at: string;
      payload: Record<string, unknown>;
    };
    let events: GHEvent[] = [];
    for (let page = 1; page <= 3; page++) {
      const r = await fetch(
        `${BASE}/users/${USERNAME}/events/public?per_page=100&page=${page}`,
        fetchOpts,
      );
      if (!r.ok) break;
      const batch: GHEvent[] = await r.json();
      if (!Array.isArray(batch) || batch.length === 0) break;
      events = events.concat(batch);
      if (batch.length < 100) break;
    }

    const lastActiveDate = events[0]?.created_at?.slice(0, 10) ?? '';

    const seen = new Set<string>();
    const recentActivity: ActivityItem[] = [];
    for (const ev of events) {
      const key = `${ev.type}:${ev.repo.name}:${ev.created_at.slice(0, 10)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      recentActivity.push({
        type:    ev.type,
        repo:    ev.repo.name,
        repoUrl: `https://github.com/${ev.repo.name}`,
        detail:  eventDetail(ev.type, ev.payload),
        date:    ev.created_at.slice(0, 10),
      });
      if (recentActivity.length === 8) break;
    }

    /* 5 — Contributions + streaks (GraphQL preferred, fallback to public API) */
    let contribs = await fetchContributions();
    if (contribs.total === 0) contribs = await fetchContribsFallback();

    const { currentStreak, longestStreak } = computeStreaks(contribs.days);

    const stats: GitHubStats = {
      repos:                 ownedRepos.length,
      stars:                 totalStars,
      followers:             user.followers,
      following:             user.following,
      contributionsLastYear: contribs.total,
      currentStreak,
      longestStreak,
      lastActiveDate,
      mostStarredRepo: topRepo
        ? { name: topRepo.name, stars: topRepo.stargazers_count, url: topRepo.html_url, language: topRepo.language }
        : null,
      topLanguages,
      recentActivity,
    };

    return NextResponse.json(stats, {
      headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=43200' },
    });
  } catch (err) {
    console.error('[github-stats] error:', err);
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
}
