# Obin Nguyen — Portfolio & CV

A bold, animated personal portfolio that doubles as an online CV for **Le Nghia Nguyen (Obin)**.
Design system: **Electric Cartography** (ink-black base, cobalt/magenta/amber-gold accents, cartographic motifs).

Built with **Vite + React + TypeScript + Tailwind**, **Framer Motion**, **GSAP/ScrollTrigger** and **Lenis** smooth scroll. Deploys as a static site to **Cloudflare Pages** at **obinle.com**.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run typecheck  # tsc --noEmit
```

---

## Edit content (no component edits needed)

Everything you can read on the site lives in **[`src/data/content.ts`](src/data/content.ts)** — typed, with comments. Change copy, projects, experience, skills, interests, links, the tagline, etc. there and the UI updates. Anything still needing a value is marked `TODO:` (search the file for them).

Design tokens (colours, fonts, theme) live in **[`src/index.css`](src/index.css)** (CSS variables, light + dark) and **[`tailwind.config.js`](tailwind.config.js)**.

---

## Sections

Hero · About · Experience (CV timeline) · Projects (pinned horizontal gallery + case-study modals) · Skills · Beyond work (Letterboxd / Goodreads + interests) · Contact.

Animation: kinetic split-text, scroll reveals, animated mesh hero canvas, pinned horizontal project scroll, magnetic buttons, tilt + spotlight cards, custom cursor, marquee, count-ups, theme toggle. All respect `prefers-reduced-motion`.

---

## Live feeds (Letterboxd & Goodreads)

The "Beyond work" section pulls recent films/books live and falls back to curated lists in `content.ts` if the feed can't be reached.

- The proxy is the **Cloudflare Worker** at [`worker/index.ts`](worker/index.ts) (route `GET /api/feeds`). It fetches and parses the RSS server-side (no browser CORS); every other path falls through to the static assets.
- **Letterboxd** (`obinhood`) works out of the box.
- **Goodreads** has no stable public username feed, so set the RSS URL as a secret to go live:
  ```bash
  npx wrangler secret put GOODREADS_RSS
  # value e.g. https://www.goodreads.com/review/list_rss/XXXX?shelf=read
  ```
  Until then, the books list uses the curated fallback.

> In `npm run dev` (plain Vite) the `/api/feeds` route isn't running, so both lists show the curated fallback. To test it locally: `npm run build && npx wrangler dev`.

---

## Deploy

### Cloudflare Workers (recommended — host + obinle.com)

The site deploys as a **Worker with static assets** (`wrangler.toml` → `main = worker/index.ts`, `[assets] directory = ./dist`). The Worker serves the built SPA and the `/api/feeds` route.

**Git (auto-deploys on push):**
1. Cloudflare dashboard → **Workers & Pages → Create → Workers → Connect to Git** (or Import) → pick the repo.
2. Build command **`npm run build`**, deploy command **`npx wrangler deploy`** (the defaults). Node is pinned to 20 via `.nvmrc`.
3. Save. Each push runs `npm run build` then `npx wrangler deploy`.
4. Then **Settings → Domains & Routes → Add → `obinle.com`** (and `www`). Cloudflare wires up DNS/SSL automatically when the domain is on your account.

**Direct deploy (Wrangler):**
```bash
npm run build
npx wrangler deploy        # or: npm run deploy
```

### Vercel / Netlify
The site is a static Vite build (`npm run build` → `dist`), so it also runs on Vercel or Netlify — point the build there and publish `dist`. The `/api/feeds` proxy is Cloudflare-specific; on other hosts port `worker/index.ts` to that platform's function format, or the feeds just use the curated fallback. Add `obinle.com` under the host's domain settings.

---

## "Fill these in" checklist

Search the project for `TODO:` — current placeholders:

| Item | Where | Notes |
|------|-------|-------|
| **Portrait photo** | `public/portrait.jpg` | Drop an ~800×800 image; an `ON` monogram shows until then (`profile.portrait` in `content.ts`). |
| **CV PDF** | `public/cv/Obin-Nguyen-CV.pdf` | A copy of your general CV is already here. Replace to update the download. |
| **Goodreads** | `goodreads` in `content.ts` + `GOODREADS_RSS` env | Add profile URL + RSS to make the books list live. |
| **Letterboxd favourites** | `moviesFallback` in `content.ts` | Curated fallback list; edit to taste (live feed overrides it when reachable). |
| **OG image (PNG)** | `public/og-image.svg` | A branded SVG is in place and referenced in `index.html`. For Twitter/Facebook (which don't render SVG OG), export a **1200×630 PNG** to `public/og-image.png` and switch the two `og:image` / `twitter:image` URLs in `index.html` back to `.png`. |
| **Project links** | `projects[].links` in `content.ts` | Only Urban Lines has a live link; add repo/live URLs to others as they go public. |

Nothing here is fabricated — experience, dates, education and projects come from your CV and project folders.

---

Built by Claude Code.
