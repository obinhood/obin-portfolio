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

- The proxy is a **Cloudflare Pages Function**: [`functions/api/feeds.ts`](functions/api/feeds.ts). It fetches and parses the RSS server-side (no browser CORS) and is auto-detected by Pages.
- **Letterboxd** (`obinhood`) works out of the box.
- **Goodreads** has no stable public username feed, so set the RSS URL as an env var to go live:
  ```bash
  npx wrangler pages secret put GOODREADS_RSS
  # value e.g. https://www.goodreads.com/review/list_rss/XXXX?shelf=read
  ```
  Until then, the books list uses the curated fallback.

> In `npm run dev` (plain Vite) the `/api/feeds` function isn't running, so both lists show the curated fallback. To test the function locally: `npx wrangler pages dev -- npm run dev` (or `npm run build && npx wrangler pages dev dist`).

---

## Deploy

### Cloudflare Pages (recommended — host + obinle.com)

**Option A — Git (auto-deploys on push):**
1. Push this repo to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings: **Build command** `npm run build`, **Output directory** `dist`. (Framework preset: Vite.)
4. Deploy. Then **Custom domains → Set up a domain → `obinle.com`** (and `www`). Cloudflare adds the DNS records automatically if the domain is on your Cloudflare account.

**Option B — Direct upload (Wrangler):**
```bash
npm run build
npx wrangler pages deploy dist        # or: npm run deploy
```
The `functions/` folder ships automatically with both options.

### Vercel
- Import the repo. Framework preset **Vite**, build `npm run build`, output `dist`.
- The Cloudflare Function under `functions/api/feeds.ts` is Pages-specific. On Vercel, port it to `api/feeds.ts` (Vercel Function) or the feeds simply use the static fallback. Add `obinle.com` under **Settings → Domains**.

### Netlify
- Build `npm run build`, publish `dist`.
- Port the function to `netlify/functions/feeds.ts` if you want live feeds, otherwise the fallback is used. Add `obinle.com` under **Domain settings**.

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
