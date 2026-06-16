import type { Movie, Book } from "@/data/content";

/**
 * Live feed fetching. In production these hit the Cloudflare Pages Function at
 * /api/feeds (see functions/api/feeds.ts), which fetches and parses the
 * Letterboxd / Goodreads RSS server-side to avoid CORS. If the function is
 * unavailable (e.g. `vite dev` without wrangler) or the feed fails, the caller
 * falls back to the curated static lists in content.ts.
 */

type FeedItem = {
  title: string;
  year?: string;
  author?: string;
  rating?: number;
};

async function getFeed(source: "letterboxd" | "goodreads"): Promise<FeedItem[] | null> {
  try {
    const res = await fetch(`/api/feeds?source=${source}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { items?: FeedItem[] };
    if (!data.items || data.items.length === 0) return null;
    return data.items;
  } catch {
    return null;
  }
}

export async function getMovies(): Promise<Movie[] | null> {
  const items = await getFeed("letterboxd");
  if (!items) return null;
  return items.slice(0, 8).map((i) => ({
    title: i.title,
    year: i.year ?? "",
    rating: i.rating ?? 0,
  }));
}

export async function getBooks(): Promise<Book[] | null> {
  const items = await getFeed("goodreads");
  if (!items) return null;
  return items.slice(0, 6).map((i) => ({
    title: i.title,
    author: i.author ?? "",
    rating: i.rating ?? 0,
  }));
}
