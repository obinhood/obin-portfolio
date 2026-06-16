# Portfolio + CV Website — Build Prompt

A ready-to-paste prompt for **Claude Code**. It builds a bold, colorful, heavily-animated
personal portfolio that doubles as an online CV — pulling real content from your local
projects and linking your Letterboxd + Goodreads.

**How to use**
1. Open a terminal in the folder where you want the site (e.g. `obin-portfolio`).
2. Run `claude` and paste everything below the line.
3. Fill in the `<< >>` placeholders at the top, or let Claude Code ask you / scan your machine.
4. Answer its setup questions, then let it build and run `npm run dev`.

---

# ROLE
You are a senior creative front-end engineer and motion designer. Build me a standout
personal **portfolio website that also serves as my CV**. The bar is an award-style,
"made-in-Framer" feel — bold, colorful, and rich with tasteful animation. It must be a
real, runnable codebase (not a mockup) that I can deploy.

# ABOUT ME (fill in what you can; ask me for the rest)
- Name: Le Nghia Nguyen (Obin)
- Title / role: Senior Strategic Consultant
- One-line tagline: << short, punchy positioning line >>
- Location: << city, country >>
- Email: nguyenler@gmail.com
- Links: GitHub https://github.com/obinhood/, https://www.linkedin.com/in/obin-nguyen/
- Letterboxd username: << username >>  → hhttps://letterboxd.com/obinhood/
- Goodreads: << profile url or user id >>
- Résumé/CV file to mirror (if any): /Users/obinle/Documents/Projects/obin-portfolio/background

# STEP 0 — GATHER REAL CONTENT BEFORE CODING
Don't invent my experience. First, collect real material, then confirm with me:
1. Ask me for the path to my projects/code folder (e.g. `~/Documents/Projects`). Scan it:
   read each project's `README`, `package.json`, and any `about`/`docs` to extract project
   name, summary, role, tech stack, dates, screenshots, and live/repo links.
2. If a GitHub username is available, list my public/pinned repos (stars, language, description)
   to enrich the projects list. Skip anything private unless I point you to it.
3. If a résumé/CV path is given, parse it for my work history, education, and skills.
4. Compile everything into a single editable data file (see below). For anything you can't
   find, insert a clearly-marked `TODO:` placeholder and give me a checklist at the end.
   Never fabricate employers, dates, or metrics.

# TECH STACK
- **Vite + React + TypeScript** (fast, simple to deploy). Use Next.js only if you have a
  reason and tell me why.
- **Tailwind CSS** for styling, with design tokens (colors, type scale, spacing) centralized.
- **Framer Motion** (`motion`) for component/scroll animation + orchestration.
- **GSAP + ScrollTrigger** for timeline-based scroll scenes and pinning.
- **Lenis** for smooth, inertial scrolling.
- Optional, only for the hero: **react-three-fiber / three.js** OR a 2D `<canvas>` shader
  (animated gradient mesh / blobs / particles). Keep it lightweight and lazy-loaded.
- All site content lives in **`src/data/content.ts`** (typed) so I can edit text without
  touching components.

# SITE STRUCTURE (single-page, anchored nav; sub-routes only if useful)
1. **Hero** — my name as oversized kinetic type, animated colorful background, tagline,
   primary CTAs (View work / Download CV / Email). Scroll-cue.
2. **About** — short narrative bio, portrait, "currently" line, social links.
3. **Experience (CV)** — animated vertical timeline of roles: company, title, dates, 2–3
   impact bullets, tech tags. Include a **"Download CV (PDF)"** button.
4. **Projects** — the showcase. Responsive grid/gallery of cards with hover motion. Each
   opens a detail view (modal or `/work/:slug` route) with problem → approach → result,
   visuals, stack, and links to live/repo. Mark featured projects.
5. **Skills / Stack** — grouped, animated (languages, frameworks, tools, design).
6. **Beyond work (personal interests)** — make this genuinely fun and on-brand:
   - **Movies** — a "Now watching / Recently watched" strip from my **Letterboxd RSS**
     (`https://letterboxd.com/<username>/rss/`): poster, title, my rating (★). Link to my
     Letterboxd. Cache/fallback gracefully if the feed can't be fetched (CORS) — fall back
     to a curated favorites list in the data file plus a prominent profile link.
   - **Books** — same idea from my **Goodreads RSS** (e.g. recently-read shelf feed):
     cover, title, author, rating. Link to my Goodreads, with a static fallback list.
   - Room for other interests (hobbies, music, photography) — placeholders I can edit.
7. **Contact / Footer** — email CTA, socials, back-to-top, subtle credit, current year.

# DESIGN DIRECTION — BOLD & COLORFUL
- Energetic, saturated palette built on 2–3 vivid brand hues + accents, used in gradients
  and color transitions. Strong light/dark contrast; pick a default and support a theme toggle.
- Expressive **display typography** (a characterful variable display font + clean sans for
  body, via Google Fonts or self-hosted). Huge headings, confident scale jumps.
- Layered depth: animated gradient mesh, soft noise/grain overlay, glassy surfaces, blend modes.
- Generous whitespace so the color and motion feel intentional, not noisy.
- A cohesive, distinctive look — not a generic template. Define the system in the design tokens.

# ANIMATION SPEC (this is the centerpiece — make it feel alive)
- **Page load**: orchestrated intro reveal (logo/name → hero), staggered.
- **Scroll reveals**: elements fade/slide/scale in on enter; stagger lists and grids.
- **Hero**: animated colorful background (mesh gradient / blobs / particles) + kinetic
  split-text headline (per-character or per-word).
- **Smooth scroll** (Lenis) with at least one **pinned, scroll-driven scene** (e.g. projects
  that horizontally scroll, or a sticky section that morphs as you scroll).
- **Parallax** on hero/section layers and project imagery.
- **Magnetic buttons** + **hover tilt / spotlight** on project cards.
- **Custom cursor** (with a graceful default-cursor fallback) and animated nav/underlines.
- **Marquee** strip (skills or interests) and animated **count-ups** for any stats.
- **Micro-interactions** everywhere: links, toggles, theme switch, form states.
- Consider the **View Transitions API** for project open/close where supported.
- **Performance & accessibility**: honor `prefers-reduced-motion` (provide reduced variants),
  use transform/opacity (GPU-friendly), lazy-load heavy/3D bits, keep it 60fps and
  jank-free on mobile.

# QUALITY BAR
- Fully **responsive** (mobile-first) and keyboard-accessible; semantic HTML, ARIA where
  needed, visible focus states, alt text. Target WCAG AA contrast even with bold colors.
- **SEO/meta**: title, description, favicon, Open Graph + Twitter cards, an OG image,
  `sitemap.xml`, `robots.txt`. Add JSON-LD `Person` schema for the CV.
- Strong **Lighthouse** scores (aim 90+ across Performance/Accessibility/Best-Practices/SEO).
- Clean, typed, component-driven code; reusable animation hooks/components; no dead code.

# DELIVERABLES
- A runnable project: `npm install && npm run dev` works first try.
- `src/data/content.ts` holding all my real (or `TODO:`-flagged) content.
- A `README.md` with: how to edit content, how to run, and one-click deploy steps for
  **Vercel** and **Netlify**.
- A final **"Fill these in" checklist** of every placeholder/`TODO:` and where it lives.

# WORKING STYLE
- Before building, show me a brief plan: chosen stack, color palette + fonts (2–3 options if
  unsure), and the section list — get my OK on the visual direction.
- Then scaffold, implement section by section, and run the dev server so I can see it.
- Keep dependencies lean and current; explain any non-obvious choices in one line.
- Ask me concise questions whenever real content or a preference is missing — don't guess.

Begin with STEP 0 (gather my content) and the visual-direction plan.
