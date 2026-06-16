import { NextResponse } from 'next/server';

const USERNAME = 'DURGESH103';
const BASE     = 'https://api.github.com';

// Cache for 1 hour at the CDN/edge layer
export const revalidate = 3600;

export interface GitHubStats {
  repos:         number;
  stars:         number;
  commits:       number;
  contributions: number;
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      // Add GITHUB_TOKEN env var in Vercel for higher rate limits (optional but recommended)
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    };

    // 1. Fetch all public repos (paginated, up to 300)
    let repos: {
      stargazers_count: number;
      fork: boolean;
    }[] = [];

    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `${BASE}/users/${USERNAME}/repos?per_page=100&page=${page}&type=owner`,
        { headers, next: { revalidate: 3600 } },
      );
      if (!res.ok) break;
      const batch = await res.json();
      if (!Array.isArray(batch) || batch.length === 0) break;
      repos = repos.concat(batch);
      if (batch.length < 100) break;
    }

    const publicRepos = repos.filter((r) => !r.fork).length;
    const totalStars  = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);

    // 2. Fetch contribution events (last 90 days via public events API — no token needed)
    //    GitHub only exposes ~300 events via public API; for a real commit count
    //    we sum push-event commit counts from the events feed.
    let commits       = 0;
    let contributions = 0;

    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `${BASE}/users/${USERNAME}/events/public?per_page=100&page=${page}`,
        { headers, next: { revalidate: 3600 } },
      );
      if (!res.ok) break;
      const events: {
        type: string;
        payload: { commits?: { length: number }[] };
      }[] = await res.json();
      if (!Array.isArray(events) || events.length === 0) break;

      for (const event of events) {
        contributions++;
        if (event.type === 'PushEvent') {
          commits += event.payload?.commits?.length ?? 0;
        }
      }
      if (events.length < 100) break;
    }

    const stats: GitHubStats = {
      repos:    publicRepos,
      stars:    totalStars,
      commits,
      contributions,
    };

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    console.error('[github/route] fetch failed:', err);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 },
    );
  }
}
