/* ============================================================================
   content.ts — single source of truth for the whole site.
   Edit text here; you never need to touch the components.
   Everything is real (pulled from Obin's CV + project folders). Anything that
   still needs a value is marked with a `TODO:` so it shows up in a search.
   Note: copy avoids em dashes by preference.
   ========================================================================== */

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export type NavItem = { label: string; href: string };

export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string; // e.g. "Aug 2023"
  end: string; // e.g. "Sep 2025" or "Present"
  current?: boolean;
  summary: string;
  bullets: string[];
  tags: string[];
};

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  role: string;
  category: string;
  featured?: boolean;
  accent: "cobalt" | "magenta" | "gold";
  image?: string; // optional card/modal visual, relative to /public
  gallery?: string[]; // extra screenshots shown in the case-study modal
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  links: ProjectLink[];
};

export type SkillGroup = { group: string; items: string[] };

export type Movie = { title: string; year: string; rating: number; note?: string };
export type Book = { title: string; author: string; rating: number };
export type Interest = { title: string; body: string; tag: string };

export type EducationItem = { school: string; degree: string; detail: string; period: string };

/* -------------------------------------------------------------------------- */

export const profile = {
  name: "Le Nghia Nguyen",
  shortName: "Obin",
  initials: "ON",
  title: "Senior Strategic Consultant",
  tagline: "Senior strategic consultant at the intersection of cities, mobility, and AI.",
  location: "London, UK",
  email: "nguyenler@gmail.com",
  phone: "+44 7845 450678",
  // Short narrative bio for the About section.
  bio: [
    "I am Obin, a Czech-Vietnamese data and product person based in London, originally from Prague. For the better part of a decade I have turned messy, large-scale datasets into products and decisions, mostly at the meeting point of cities, movement, and infrastructure.",
    "Lately I have been moving from being the person who builds the analysis to the person who shapes the product: discovery, strategy, value, and roadmap. I care about thoughtful design, sustainability and carbon, and practical AI that actually ships.",
  ],
  // "Currently" one-liner for the About section.
  currently:
    "Building data products and a stack of side projects, training for a sub-4 marathon, and curating Vietnamese cinema with Star Nhà Ease.",
  // Empty = show the monogram. Add a ~800x800 image to public/ and set this to
  // its path (e.g. "/portrait.jpg") to show a photo in the About card.
  portrait: "",
};

export const socials: SocialLink[] = [
  { label: "GitHub", handle: "obinhood", href: "https://github.com/obinhood/" },
  { label: "LinkedIn", handle: "obin-nguyen", href: "https://www.linkedin.com/in/obin-nguyen/" },
  { label: "Letterboxd", handle: "obinhood", href: "https://letterboxd.com/obinhood/" },
  { label: "Email", handle: "nguyenler@gmail.com", href: "mailto:nguyenler@gmail.com" },
];

export const nav: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Beyond", href: "#beyond" },
  { label: "Contact", href: "#contact" },
];

// Relative to /public. A CV PDF is copied here during setup.
export const cv = {
  path: "/cv/Obin-Nguyen-CV.pdf",
  label: "Download CV",
};

export const experience: Experience[] = [
  {
    company: "Amey / CitiLogik",
    role: "Senior Strategic Consultant & Deputy Head of Data Products",
    location: "London, UK",
    start: "Aug 2023",
    end: "Sep 2025",
    summary:
      "Senior delivery, product and technical leadership for mobility and infrastructure data services built on mobile network data, demographics, geospatial analytics and AI-enabled workflows.",
    bullets: [
      "Led end-to-end client delivery from commercial scoping through QA to stakeholder read-outs for local authorities, transport providers and infrastructure clients.",
      "Delivery lead on Uber Boats and on MND services for Brighton, Hull and other city authorities, turning movement data into evidence for transport planning.",
      "Cut AWS spend ~20% (≈£5k/month) and reduced data processing time ~60% by optimising PySpark/Python/SQL workflows.",
      "Drove AI/ML proof-of-concepts (road-defect computer vision, bat detection under bridges) to automate field-intensive inspection.",
    ],
    tags: ["Product ownership", "Mobile network data", "PySpark", "AWS", "Stakeholder strategy", "AI PoCs"],
  },
  {
    company: "Jacobs",
    role: "Senior Data Analyst / Technical Lead",
    location: "London, UK",
    start: "Jun 2021",
    end: "Sep 2023",
    summary:
      "Technical lead across infrastructure, water and transport analytics: lifecycle models, predictive maintenance and BI for clients including National Highways, the Environment Agency, United Utilities and HS2.",
    bullets: [
      "Technical lead on EA TEAM2100 Thames Estuary lifecycle modelling, including cost-of-inaction logic and carbon profiles for intervention strategies.",
      "Built an IoT predictive-maintenance pilot for EA water pumps (Azure Data Factory ETL, Power BI, ML) that won a Jacobs Award of Excellence.",
      "Delivered risk frameworks (United Utilities) and defect analytics (HS2), translating technical outputs into board-ready decisions.",
      "Connected financial, operational and carbon performance so clients could weigh maintenance strategy against long-term risk.",
    ],
    tags: ["Azure Data Factory", "Power BI", "Predictive maintenance", "Lifecycle modelling", "Machine learning"],
  },
  {
    company: "Movement Strategies (later GHD)",
    role: "Data Analyst → Senior Data Analyst",
    location: "London, UK",
    start: "Apr 2019",
    end: "Jun 2021",
    summary:
      "Movement intelligence and spatial analytics using mobile network, routing and geospatial data to build transport, rail and retail insight products.",
    bullets: [
      "Played a major role building an origin-destination rail product from MND, cross-referenced with route data and validated against ORR, sold to TfL for £1.5M.",
      "Worked with Telefónica Smart Steps on footfall, socio-demographics and travel behaviour for rail hubs such as Victoria and Waterloo.",
      "Productised one-off analytical methods into repeatable, sellable services with QA logic baked in.",
      "Refined flight-detection and behaviour-classification algorithms; analysed inbound visitor movement through COVID.",
    ],
    tags: ["PostGIS", "QGIS", "Python", "SQL", "Geospatial", "Productisation"],
  },
  {
    company: "Freshminds Talent",
    role: "Analyst",
    location: "London, UK",
    start: "Feb 2018",
    end: "Apr 2019",
    summary:
      "Analytics and market research supporting strategy engagements for leading consultancies including Bain, Teneo and McKinsey.",
    bullets: [
      "Delivered quantitative and qualitative analysis across 10+ consulting-style projects.",
      "Built outputs and visualisations in Python, Excel and Power BI to support data-led recommendations.",
    ],
    tags: ["Market research", "Python", "Power BI", "Strategy support"],
  },
  {
    company: "EY — InnovEYtion Hub",
    role: "Junior Consultant",
    location: "Prague, Czech Republic",
    start: "Apr 2017",
    end: "Sep 2017",
    summary:
      "Smart-cities, innovation strategy and digital transformation for public-sector and urban innovation contexts.",
    bullets: [
      "Contributed to Smart City work for Istanbul and digital strategy for Prague districts (open data, IoT, data economy).",
      "Assessed where disruptive tech and open innovation could create value in automotive, steel and energy.",
    ],
    tags: ["Smart cities", "Innovation strategy", "Stakeholder workshops"],
  },
];

export const projects: Project[] = [
  {
    slug: "urban-lines",
    name: "URBALINES",
    tagline: "Personalised marathon-route and city-map art prints.",
    year: "2024 — now",
    role: "Founder / full-stack & brand",
    category: "E-commerce · Cartography",
    featured: true,
    accent: "magenta",
    image: "/projects/urban-lines.jpg",
    gallery: [
      "/projects/gallery/urban-lines-1.jpg",
      "/projects/gallery/urban-lines-2.jpg",
      "/projects/gallery/urban-lines-3.jpg",
      "/projects/gallery/urban-lines-4.jpg",
    ],
    problem:
      "Runners and city-lovers want a premium, personal memento of a route or place, but generic map posters feel templated and the print quality rarely matches the moment.",
    approach:
      "Built an end-to-end product: an OSM-driven map renderer with hand-tuned palettes and water-bleed fixes, a customisation and approval flow, Stripe checkout, and Prodigi fulfilment, wrapped in a Nordic, premium brand system.",
    result:
      "A live shop (urbanlines.co.uk) with a FastAPI + Next.js 14 stack on Supabase, Cloudflare R2 and Railway/Vercel, a full brand book, and a repeatable pipeline from order to delivered print.",
    stack: ["Next.js 14", "FastAPI", "Supabase", "Cloudflare R2", "Stripe", "Prodigi", "OSM"],
    links: [{ label: "Visit shop", href: "https://urbanlines.co.uk" }],
  },
  {
    slug: "sola",
    name: "Sola",
    tagline: "A women's safety running app with light-aware routing.",
    year: "2025",
    role: "Product & design lead",
    category: "Mobile · Safety",
    featured: true,
    accent: "cobalt",
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
    slug: "carbonsense",
    name: "CarbonSense",
    tagline: "An honest, multi-model personal carbon footprint platform for the UK and EU.",
    year: "2026",
    role: "Founder / full-stack",
    category: "Climate · ESG",
    accent: "gold",
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
    accent: "magenta",
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
    slug: "applyforge",
    name: "ApplyForge",
    tagline: "A human-gated, truthfulness-first autopilot for job applications.",
    year: "2026",
    role: "Builder",
    category: "AI · Agentic automation",
    accent: "cobalt",
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
    accent: "gold",
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
    accent: "magenta",
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
    slug: "prague-real-estate",
    name: "Prague Property Intelligence",
    tagline: "A daily market tracker for Prague real estate.",
    year: "2024",
    role: "Builder",
    category: "Data product · Geospatial",
    accent: "cobalt",
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
    slug: "prague-hall-booking",
    name: "Prague Hall Booking",
    tagline: "One place to book rehearsal space across Prague's fragmented venues.",
    year: "2026",
    role: "Builder",
    category: "Full-stack · Booking platform",
    accent: "gold",
    image: "/projects/prague-hall-booking.jpg",
    problem:
      "Prague's rehearsal and hall space is scattered across many independent venues, each on its own booking island of portals, calendars or just phone and email, so renters have to check every venue separately.",
    approach:
      "A Postgres and PostGIS model makes double-bookings structurally impossible via a single exclusion constraint, a NestJS API handles attribute, geo and time-window search, a Next.js app drives booking, and a connector layer reconciles each venue's availability from iCal feeds and booking SaaS without touching the core.",
    result:
      "A verified Phase 1 slice: the anti-double-booking race passes, real venue iCal feeds import genuine busy periods, and request-mode booking, a provider dashboard and a self-serve onboarding wizard all work.",
    stack: ["Next.js 15", "NestJS", "PostgreSQL", "PostGIS", "iCal / RRULE", "Docker"],
    links: [],
  },
  {
    slug: "side-quest",
    name: "Side Quest",
    tagline: "A gamified daily-adventures app with a pixel pet.",
    year: "2025",
    role: "Designer & builder",
    category: "Mobile · Game",
    accent: "magenta",
    image: "/projects/sidequest.jpg",
    problem:
      "Habit and to-do apps feel like admin: streaks and checklists that nag rather than delight.",
    approach:
      "Reframed daily tasks as a tiny RPG: choose a pixel 'tamagotchi' that wanders your home screen, earn XP and level up, and collect artefacts, all in a playful Y2K / vaporwave interface.",
    result:
      "A multi-platform MVP: a React and Vite web app plus an Expo React Native twin sharing one Node and Express backend, covering onboarding, pet selection, XP and levelling, and quests.",
    stack: ["React", "Vite", "Node / Express", "PostgreSQL", "Expo", "Gamification"],
    links: [],
  },
  {
    slug: "equity-desk",
    name: "EquityDesk",
    tagline: "A research and technical-signal workspace for equities that never places a trade.",
    year: "2026",
    role: "Builder",
    category: "Web app · Fintech",
    accent: "cobalt",
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
    slug: "lca-calculator",
    name: "Carbon Footprint MVP",
    tagline: "Organisational carbon accounting across Scopes 1–3.",
    year: "2024",
    role: "Builder",
    category: "Climate · ESG",
    accent: "gold",
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
    accent: "magenta",
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

export const skills: SkillGroup[] = [
  { group: "Languages", items: ["Python", "SQL", "R", "TypeScript", "JavaScript"] },
  { group: "Data & ML", items: ["Pandas", "NumPy", "scikit-learn", "PySpark", "Databricks", "DuckDB"] },
  { group: "Geospatial", items: ["PostGIS", "QGIS", "GeoPandas", "OSMnx", "NetworkX"] },
  { group: "Cloud & pipelines", items: ["AWS", "Azure Data Factory", "Supabase", "Railway", "Cloudflare R2"] },
  { group: "Product & BI", items: ["Power BI", "Tableau", "Agile / Scrum", "Roadmapping", "Discovery", "JIRA"] },
  { group: "Build", items: ["React", "Next.js", "FastAPI", "Flask", "Stripe", "Git"] },
];

// Marquee strip text (skills/interests scrolling band).
export const marquee: string[] = [
  "Data products",
  "Mobility intelligence",
  "Spatial data science",
  "Carbon & ESG",
  "Product strategy",
  "AI that ships",
  "Cartography",
  "Marathons",
  "Vietnamese cinema",
];

export const education: EducationItem[] = [
  { school: "UCL", degree: "MSc, Smart Cities & Urban Analytics", detail: "CASA — spatial data, mobility, urban tech", period: "" },
  { school: "Aston University", degree: "BSc, Psychology & Business", detail: "", period: "" },
  { school: "Hong Kong Polytechnic University", degree: "Exchange — Marketing & Management", detail: "", period: "" },
];

export const certifications: string[] = [
  "AgilePM Practitioner",
  "Sustainability Transformation for Leaders",
  "Become a Product Manager",
  "Strategic Planning & Urban Design Foundations",
  "Smarter Cities: Using Data to Drive Urban Innovation",
];

/* ---------------------------- Beyond work --------------------------------- */

export const letterboxd = {
  username: "obinhood",
  url: "https://letterboxd.com/obinhood/",
  rss: "https://letterboxd.com/obinhood/rss/",
};

// Static fallback shown if the live Letterboxd feed can't be fetched (CORS, etc).
// TODO: swap these for your genuine favourites if you like — these are placeholders to edit.
export const moviesFallback: Movie[] = [
  { title: "Cyclo", year: "1995", rating: 5, note: "Trần Anh Hùng" },
  { title: "The Scent of Green Papaya", year: "1993", rating: 5 },
  { title: "Drive My Car", year: "2021", rating: 4.5 },
  { title: "In the Mood for Love", year: "2000", rating: 5 },
  { title: "Perfect Days", year: "2023", rating: 4.5 },
  { title: "Past Lives", year: "2023", rating: 4 },
];

export const goodreads = {
  // TODO: add your Goodreads profile URL and the recently-read shelf RSS URL.
  url: "", // e.g. "https://www.goodreads.com/user/show/XXXXXXXX-obin"
  rss: "", // e.g. "https://www.goodreads.com/review/list_rss/XXXX?shelf=read"
};

// Static fallback / curated reading list.
export const booksFallback: Book[] = [
  { title: "Superintelligence", author: "Nick Bostrom", rating: 4 },
  { title: "Life 3.0", author: "Max Tegmark", rating: 4 },
  { title: "The Death and Life of Great American Cities", author: "Jane Jacobs", rating: 5 },
  { title: "Order Without Design", author: "Alain Bertaud", rating: 4 },
  { title: "How Big Things Get Done", author: "Bent Flyvbjerg", rating: 4 },
];

export const interests: Interest[] = [
  {
    tag: "Running",
    title: "Chasing a sub-4 marathon",
    body: "Barcelona 2026 in 4:46:37, a half PB of 1:59:29, and a stubborn plan to break four hours. I think about pacing, fuelling and tapering more than is reasonable.",
  },
  {
    tag: "Cinema",
    title: "Curating Vietnamese film",
    body: "Curator with Star Nhà Ease, programming Vietnamese cinema and Czech-Vietnamese strands at UK festivals, with a soft spot for 1985–2010.",
  },
  {
    tag: "Community",
    title: "VietPro UK committee",
    body: "Helping with events, partnerships and marketing for the Czech-Vietnamese and wider Vietnamese professional community in the UK.",
  },
  {
    tag: "Making",
    title: "Maps, photography & flat",
    body: "Cartography and 3D city maps, photography and visual storytelling, and slowly renovating a three-bed flat in Wapping.",
  },
];

export const contact = {
  heading: "Let's make something",
  body: "Open to product strategy and AI product roles, interesting collaborations, or just a good conversation about cities, data and film.",
  email: "nguyenler@gmail.com",
};
