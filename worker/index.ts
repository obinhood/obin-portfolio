/**
 * Cloudflare Worker entry point.
 *
 * Serves the built Vite SPA from the [assets] directory (dist/) and handles the
 * one dynamic route, GET /api/feeds, which proxies and parses the Letterboxd /
 * Goodreads RSS server-side (no browser CORS) and returns clean JSON. Anything
 * that isn't /api/feeds falls through to the static assets. Deployed with
 * `wrangler deploy` (see wrangler.toml).
 *
 * Goodreads has no stable public username RSS, so its feed URL is read from the
 * GOODREADS_RSS secret (set it with `wrangler secret put GOODREADS_RSS`). Leave
 * it unset and the books section uses the curated fallback in content.ts.
 */

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  GOODREADS_RSS?: string;
}

type Item = { title: string; year?: string; author?: string; rating?: number };

const LETTERBOXD_RSS = "https://letterboxd.com/obinhood/rss/";

function tag(block: string, name: string): string | undefined {
  // Matches <name>...</name> including CDATA, namespaced or not.
  const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i");
  const m = block.match(re);
  if (!m) return undefined;
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function parseLetterboxd(xml: string): Item[] {
  const items: Item[] = [];
  const blocks = xml.split(/<item>/i).slice(1);
  for (const raw of blocks) {
    const block = raw.split(/<\/item>/i)[0];
    const filmTitle = tag(block, "letterboxd:filmTitle");
    const filmYear = tag(block, "letterboxd:filmYear");
    const ratingRaw = tag(block, "letterboxd:memberRating");
    const fallbackTitle = tag(block, "title");
    const title = filmTitle ?? fallbackTitle ?? "";
    if (!title) continue;
    items.push({ title, year: filmYear, rating: ratingRaw ? Number(ratingRaw) : undefined });
    if (items.length >= 10) break;
  }
  return items;
}

function parseGoodreads(xml: string): Item[] {
  const items: Item[] = [];
  const blocks = xml.split(/<item>/i).slice(1);
  for (const raw of blocks) {
    const block = raw.split(/<\/item>/i)[0];
    const title = tag(block, "title");
    if (!title) continue;
    const author = tag(block, "author_name");
    const ratingRaw = tag(block, "user_rating");
    items.push({ title, author, rating: ratingRaw ? Number(ratingRaw) : undefined });
    if (items.length >= 8) break;
  }
  return items;
}

async function handleFeeds(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const source = url.searchParams.get("source");

  const json = (items: Item[], status = 200) =>
    new Response(JSON.stringify({ items }), {
      status,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=3600, s-maxage=3600",
        "access-control-allow-origin": "*",
        "x-content-type-options": "nosniff",
      },
    });

  try {
    if (source === "letterboxd") {
      const res = await fetch(LETTERBOXD_RSS, {
        headers: { "user-agent": "obinle.com feed reader" },
        cf: { cacheTtl: 3600, cacheEverything: true },
      } as RequestInit);
      if (!res.ok) return json([]);
      return json(parseLetterboxd(await res.text()));
    }

    if (source === "goodreads") {
      if (!env.GOODREADS_RSS) return json([]);
      const res = await fetch(env.GOODREADS_RSS, {
        headers: { "user-agent": "obinle.com feed reader" },
        cf: { cacheTtl: 3600, cacheEverything: true },
      } as RequestInit);
      if (!res.ok) return json([]);
      return json(parseGoodreads(await res.text()));
    }

    return json([], 400);
  } catch {
    return json([]);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/feeds") {
      return handleFeeds(request, env);
    }
    // Everything else: serve the static SPA.
    return env.ASSETS.fetch(request);
  },
};
