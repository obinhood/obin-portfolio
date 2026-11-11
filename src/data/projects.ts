/* ============================================================================
   projects.ts: every card is real, written from the repo's README, stack and
   maturity. Excluded on purpose: the STRV pipeline, empty or duplicate repos.
   `featured` projects get the large art-directed spreads; the rest sit in the
   list below them. Screenshots are real product screens. Copy rules: British
   English, no em dashes.
   ========================================================================== */

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  role: string;
  category: string;
  featured?: boolean;
  accent: "signal" | "water" | "moss";
  image?: string; // cover, relative to /public
  gallery?: string[]; // extra screenshots shown in the case study
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  links: ProjectLink[];
};

const shots = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/projects/gallery/${slug}-${i + 1}.webp`);

export const projects: Project[] = [
  /* ------------------------------- featured ------------------------------- */
  {
    slug: "urban-lines",
    featured: true,
    name: "URBANLINES",
    tagline: "Personalised marathon route prints, drawn from verified course data.",
    year: "2025–now",
    role: "Founder / full-stack & brand",
    category: "E-commerce · Cartography",
    accent: "signal",
    image: "/projects/urban-lines.webp",
    gallery: shots("urban-lines", 5),
    problem:
      "Runners want a personal keepsake of a race they trained months for, with their own name, time and course on it, but generic map posters feel templated and the print quality rarely matches the moment.",
    approach:
      "Built the whole product as sole founder: a Python renderer that draws each course at 300 DPI, a live MapLibre preview that shares the print's palettes, personalisation with name, time and bib, Stripe checkout, an approval step before anything prints, and Prodigi fulfilment, all inside a minimal Nordic brand.",
    result:
      "A live shop at urbanlines.co.uk with verified course data for more than 900 races in 73 countries, a Next.js 16 front end on Vercel, a FastAPI renderer on Railway, Supabase and Cloudflare R2 behind it, and a repeatable path from order to delivered print.",
    stack: ["Next.js 16", "MapLibre GL", "FastAPI", "OSMnx + matplotlib", "Supabase", "Stripe", "Prodigi"],
    links: [{ label: "Visit shop", href: "https://urbanlines.co.uk" }],
  },
  {
    slug: "sidequesty",
    featured: true,
    name: "sidequesty",
    tagline: "Small real-world quests each day, with XP, streaks and a pixel pet.",
    year: "2026–now",
    role: "Founder / full-stack",
    category: "Mobile · Game",
    accent: "water",
    image: "/projects/sidequesty.webp",
    gallery: shots("sidequesty", 4),
    problem:
      "Habit apps hand you a blank page: define the habits, set the targets, log the streaks yourself. They ask what you want to do at exactly the moment you have no answer, so the app becomes one more chore.",
    approach:
      "Turned it round so the app decides and you act. Each day it picks one featured quest for where you are, plus a short list shaped by your mood, goals and, if you allow it, the local weather. The server works out XP, levels, streaks, badges and pet gifts, and a pixel pet roams a retro 90s-desktop interface.",
    result:
      "Live in the browser on Railway, while the same Expo code is readied for App Store and Google Play review. One Node and Postgres backend runs friends, co-op quests, dares, visitor accounts and push reminders, tested by over 1,600 automated checks. Moderation and launch metrics are built for the store release but not yet live.",
    stack: ["Expo / React Native", "TypeScript", "Node / Express", "PostgreSQL", "Railway", "Web push", "MET Norway weather API"],
    links: [],
  },
  {
    slug: "mamaloop",
    featured: true,
    name: "MamaLoop",
    tagline: "A map and community for London parents of babies and toddlers.",
    year: "2026",
    role: "Founder / full-stack",
    category: "Web app · Community",
    accent: "moss",
    image: "/projects/mamaloop.webp",
    gallery: shots("mamaloop", 4),
    problem:
      "Parents of under-fives in London plan every outing around naps, feeds and a buggy, yet maps rarely say whether there is a changing table or step-free entry, and local sessions are scattered across council PDFs, library pages and WhatsApp groups. A community for them also has to protect parents who cannot risk being found.",
    approach:
      "Built a TanStack Start and Supabase app in three parts: a map where parents can confirm amenities, a What's on calendar filtered to a child's age, and neighbourhood groups set by an area and radius, never a home address. Row-level security guards personal data, photos lose their location before upload, and posts containing a postcode or phone number are flagged for a moderator.",
    result:
      "Deployed on Railway with nearly 3,000 sessions gathered from council, library and provider listings, a moderator console, data download and account deletion, automated WCAG 2.2 AA checks in the Playwright tests and a draft data protection impact assessment. It has not launched, so the community features are built but have no members yet.",
    stack: ["TanStack Start", "React 19", "Supabase (Postgres, PostGIS, RLS)", "Leaflet + OpenStreetMap", "Tailwind CSS", "Playwright", "Railway"],
    links: [],
  },

  /* --------------------------------- list --------------------------------- */
  {
    slug: "carbonsense",
    name: "CarbonSense",
    tagline: "An honest, multi-model personal carbon footprint platform for the UK and EU.",
    year: "2026",
    role: "Founder / full-stack",
    category: "Climate · ESG",
    accent: "moss",
    image: "/projects/carbonsense.jpg",
    gallery: [
      "/projects/gallery/carbonsense-1.jpg",
      "/projects/gallery/carbonsense-2.jpg",
      "/projects/gallery/carbonsense-3.jpg",
      "/projects/gallery/carbonsense-4.jpg",
    ],
    problem:
      "Personal carbon calculators tend to hand you one confident number with no sense of how it was worked out or how much to trust it.",
    approach:
      "One reusable TypeScript engine blends survey, spend and activity data, reconciles the best method per category, and carries a method tag and uncertainty band on every number. The same engine powers a consumer app, an embeddable partner widget and a metered HTTP API.",
    result:
      "A working prototype localised across the UK, Germany, France, Spain and Poland, with market-based electricity, aviation radiative forcing, per-item food LCA and GDPR export and erase built in.",
    stack: ["TypeScript", "React 18", "Vite", "Node", "Carbon engine", "Partner SDK / API"],
    links: [],
  },
  {
    slug: "adloop",
    name: "AdLoop",
    tagline: "Turn a product URL into paid-social ads that learn from your own performance.",
    year: "2026",
    role: "Founder / full-stack",
    category: "SaaS · Generative AI",
    accent: "signal",
    image: "/projects/adloop.jpg",
    gallery: [
      "/projects/gallery/adloop-1.jpg",
      "/projects/gallery/adloop-2.jpg",
      "/projects/gallery/adloop-3.jpg",
      "/projects/gallery/adloop-4.jpg",
    ],
    problem:
      "Small Shopify sellers need launch-ready paid-social creative fast, but generic ad templates ignore what actually converts for their own store.",
    approach:
      "A FastAPI and Next.js SaaS takes a product URL and generates conversion scripts, static image ads in every aspect ratio and UGC-style avatar videos. Every provider sits behind a swappable adapter, and an insights loop scores each creative against the store's own history.",
    result:
      "An MVP with credit metering, Stripe billing, an async render pipeline and around 80 passing tests, running end to end in a zero-infra mock mode with real adapters wired behind interfaces.",
    stack: ["Python", "FastAPI", "Next.js", "Anthropic API", "HeyGen", "Stripe", "Supabase"],
    links: [],
  },
  {
    slug: "openplay",
    name: "OpenPlay",
    tagline: "Live court availability across Prague's sports venues, in one timetable.",
    year: "2026",
    role: "Founder / full-stack",
    category: "Web app · Sports discovery",
    accent: "water",
    image: "/projects/openplay.webp",
    gallery: shots("openplay", 4),
    problem:
      "Finding a free padel, tennis or squash court in Prague means checking club after club. The venues use many different booking systems, and some hide their timetables behind a login or take public bookings only by phone.",
    approach:
      "A scheduled collector refreshes the next 14 days for each sport every five minutes, reading only public timetables and saving snapshots to Cloudflare D1, so pages never wait on a venue's system. A Czech and English Next.js app turns them into a quick finder, a seven-day timetable and a mapped venue directory, then hands every booking to the venue.",
    result:
      "A live public prototype covering padel, tennis, squash and volleyball. A health check flags any sport feed older than 15 minutes, the page warns players when data may be out of date, and an analytics view estimates court occupancy and booking patterns from changes in public availability, without collecting customer data.",
    stack: ["Next.js 16 (vinext)", "Cloudflare Workers", "Cloudflare D1 + Drizzle", "Leaflet / OpenStreetMap", "Node.js collector", "Railway cron"],
    links: [{ label: "Live site", href: "https://openplay-production-acce.up.railway.app" }],
  },
  {
    slug: "orbital",
    name: "Orbital",
    tagline: "Interplanetary mission planning on a 3D map of the solar system.",
    year: "2026",
    role: "Designer & builder",
    category: "Web app · Astrodynamics",
    accent: "moss",
    image: "/projects/orbital.webp",
    gallery: shots("orbital", 4),
    problem:
      "Space travel is often explained as distance divided by speed. Real missions depend on moving planets, launch windows, rocket performance and gravity assists, and the maths for that lives in specialist tools that curious people rarely get to touch.",
    approach:
      "Built a three.js map of the solar system and a planner on a patched-conic model: a Lambert solver after Izzo (2015), powered flybys as in ESA's GTOP benchmarks, JPL Horizons positions through a small validating proxy, and sourced launcher and spacecraft data. Searches run in a web worker, and an Explain toggle notes what each parameter means.",
    result:
      "A working two-page prototype: a planner that finds the next launch window, picks the best-suited spacecraft and launcher, and replays flown probes such as Cassini and Voyager 2, plus an archive of 77 missions, 44 plotted from JPL's reconstructed trajectories. Replays of Cassini, New Horizons and Voyager 1 come within 2% of the launch energy each flew.",
    stack: ["three.js (WebGL)", "JavaScript (ES modules)", "Vite", "JPL Horizons API", "Web Workers", "Canvas 2D", "node:test"],
    links: [],
  },
  {
    slug: "sola",
    name: "Sola",
    tagline: "A women's safety running app with light-aware routing.",
    year: "2025",
    role: "Product & design lead",
    category: "Mobile · Safety",
    accent: "signal",
    image: "/projects/sola.jpg",
    problem:
      "Running alone, especially after dark, means constantly weighing routes against how safe and well-lit they feel, with no good tool to help.",
    approach:
      "Safety-weighted routing that blends UK Police crime data with OpenStreetMap street-lighting, plus live location sharing, check-in escalation, SOS and a fake call, in a calm 'Sola' visual language.",
    result:
      "A working MVP pairing an Expo React Native app with a FastAPI backend and a 38-test suite, kept to a private design-partner pilot.",
    stack: ["Expo / React Native", "FastAPI", "UK Police API", "OSM lighting", "Python"],
    links: [],
  },
  {
    slug: "applyforge",
    name: "ApplyForge",
    tagline: "A human-gated, truthfulness-first autopilot for job applications.",
    year: "2026",
    role: "Builder",
    category: "AI · Agentic automation",
    accent: "water",
    image: "/projects/applyforge.jpg",
    gallery: [
      "/projects/gallery/applyforge-1.jpg",
      "/projects/gallery/applyforge-2.jpg",
      "/projects/gallery/applyforge-3.jpg",
      "/projects/gallery/applyforge-4.jpg",
    ],
    problem:
      "Most job-application bots optimise for volume and will happily invent facts to beat an applicant tracking system.",
    approach:
      "Six coordinated agents for sourcing, profile, application, tracking, interview prep and outreach run behind hard safety walls: every generated claim must trace to an evidence ledger and pass an entailment check, nothing is submitted without explicit sign-off, and truthfulness deliberately outranks ATS score.",
    result:
      "A core build with live Greenhouse and Lever sourcing, a Next.js console and 130-plus passing tests under strict typing and import-linter contracts.",
    stack: ["Python", "FastAPI", "Next.js", "PostgreSQL", "pgvector", "Playwright", "Claude"],
    links: [],
  },
  {
    slug: "stavi",
    name: "Stavi",
    tagline: "AI-assisted project management for small Czech construction teams.",
    year: "2026",
    role: "Founder / full-stack & mobile",
    category: "Web & Mobile · Construction",
    accent: "moss",
    image: "/projects/stavi.jpg",
    gallery: [
      "/projects/gallery/stavi-1.jpg",
      "/projects/gallery/stavi-2.jpg",
      "/projects/gallery/stavi-3.jpg",
      "/projects/gallery/stavi-4.jpg",
    ],
    problem:
      "Small Czech building crews run projects across tools that ignore their trade specifics, from CZK budgets with DPH to permits, retention invoicing and the site diary.",
    approach:
      "A shared TypeScript domain layer powers both a Next.js web app and an Expo React Native app, with a crew of AI specialists that turn plain-Czech commands and receipt photos into tasks, diary entries and ISDOC invoices. AI runs on Claude and falls back to an on-device engine so it works offline.",
    result:
      "A trilingual (Czech, English, Vietnamese) MVP, feature-complete on the offline path and backed by Supabase with per-user row-level security.",
    stack: ["Next.js 16", "Expo / React Native", "TypeScript", "Supabase", "Claude", "RLS"],
    links: [],
  },
  {
    slug: "rental-pms",
    name: "Praha Stays",
    tagline: "Multi-channel property management for Czech short-term rentals, trilingual in EN, CS and VI.",
    year: "2026",
    role: "Founder / full-stack",
    category: "Web app · PropTech",
    accent: "signal",
    image: "/projects/rental-pms.jpg",
    gallery: [
      "/projects/gallery/rental-pms-1.jpg",
      "/projects/gallery/rental-pms-2.jpg",
      "/projects/gallery/rental-pms-3.jpg",
      "/projects/gallery/rental-pms-4.jpg",
    ],
    problem:
      "Short-term-rental operators juggle bookings across several channels with a constant risk of double-bookings, on top of Czech guest-registration and tourist-tax duties, and their teams work in different languages.",
    approach:
      "A Next.js PMS and channel manager built around one master availability ledger, with double-bookings blocked at the database layer through a Postgres exclusion constraint rather than only in app code. It adds a multi-property calendar, two-way iCal sync, Czech compliance, housekeeping and financials.",
    result:
      "A complete, trilingual core with database integration tests proving the double-booking guard and CI on every push, with Stripe, email and live channel APIs staged behind feature flags.",
    stack: ["Next.js 15", "React 19", "Prisma", "PostgreSQL", "Auth.js", "next-intl", "Stripe"],
    links: [],
  },
  {
    slug: "equity-desk",
    name: "EquityDesk",
    tagline: "A research and technical-signal workspace for equities that never places a trade.",
    year: "2026",
    role: "Builder",
    category: "Web app · Fintech",
    accent: "water",
    image: "/projects/equity-desk.jpg",
    gallery: [
      "/projects/gallery/equity-desk-1.jpg",
      "/projects/gallery/equity-desk-2.jpg",
      "/projects/gallery/equity-desk-3.jpg",
      "/projects/gallery/equity-desk-4.jpg",
    ],
    problem:
      "Long-horizon valuation and short-term technical signals usually live in separate tools, with no honest measure of whether a signal has any real edge.",
    approach:
      "Six tabs over one deterministic Python engine: a real-time Trading Desk (regime-aware buy/sell signals, probability and expectancy with quarter-Kelly sizing), a whole-market scan across the S&P 1500, a news desk mapping headlines to the tickers they tend to move, a cross-instrument ideas shortlist, a positions and PnL tracker, and a fundamental Research pipeline of DCF, DDM and relative valuation.",
    result:
      "A working, decision-support-only platform with a large deterministic test suite, CI and live WebSocket alerts, running free on delayed data. It is deliberately honest that its own backtest shows roughly break-even expectancy before costs, and it never places a trade or moves money.",
    stack: ["Python", "FastAPI", "WebSockets", "pandas", "numpy", "yfinance", "Supabase"],
    links: [],
  },
  {
    slug: "prague-real-estate",
    name: "Prague Property Intelligence",
    tagline: "A daily market tracker for Prague real estate.",
    year: "2024",
    role: "Builder",
    category: "Data product · Geospatial",
    accent: "moss",
    image: "/projects/prague.jpg",
    problem:
      "Prague's property market moves daily, but listings sites show snapshots, not change: re-listings, price drops and time-on-market are invisible.",
    approach:
      "Scrapes Sreality (and optionally Bezrealitky), tracks day-over-day price and availability changes in PostgreSQL, and derives analyst fields (price tier, Prague ring, amenity score, days-on-market) with full re-listing detection.",
    result:
      "A polished FastAPI + React dashboard with a 5-step location-resolution chain and genuine market trend insight.",
    stack: ["FastAPI", "React", "PostgreSQL", "Web scraping", "Geospatial"],
    links: [],
  },
  {
    slug: "lca-calculator",
    name: "Carbon Footprint MVP",
    tagline: "Organisational carbon accounting across Scopes 1 to 3.",
    year: "2024",
    role: "Builder",
    category: "Climate · ESG",
    accent: "signal",
    image: "/projects/carbon.jpg",
    problem:
      "SMEs need credible Scope 1-3 carbon accounting but enterprise tools are heavy and opaque about emission factors.",
    approach:
      "Built an LCA MVP with CSV upload, a DEFRA-style emission-factor resolver with version pinning, QA checks, an AR5/AR6 switch and report export, then grew it into a compliance tool.",
    result:
      "A FastAPI + SQLite tool that keeps methodology and factor versions transparent and auditable, now extended with an API-key lifecycle and compliance renderers for EU Taxonomy, UK ETS and ESOS.",
    stack: ["FastAPI", "SQLite", "DEFRA factors", "GHG Protocol", "Reporting"],
    links: [],
  },
  {
    slug: "geodem-mental-health",
    name: "Geodemographics of Mental Health",
    tagline: "Spatial patterns of mental health in urban London.",
    year: "2018",
    role: "Researcher (UCL)",
    category: "Research · R",
    accent: "water",
    image: "/projects/geodem.jpg",
    problem:
      "Mental-health outcomes vary sharply across a city, but the geodemographic drivers are easy to assert and hard to evidence.",
    approach:
      "An academic R project joining London LSOA shapefiles with census data to model the geodemographics of mental health in urban environments.",
    result:
      "UCL-era spatial analysis linking neighbourhood structure to mental-health patterns.",
    stack: ["R", "Spatial stats", "Census", "LSOA shapefiles"],
    links: [],
  },
];
