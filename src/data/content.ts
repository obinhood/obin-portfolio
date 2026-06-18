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
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  links: ProjectLink[];
};

export type SkillGroup = { group: string; items: string[] };

export type Stat = { value: number; label: string; prefix?: string; suffix?: string; decimals?: number };

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
  available: "Open to product strategy & AI product roles",
  // Short narrative bio for the About section.
  bio: [
    "I am Obin, a Czech-Vietnamese data and product person based in London, originally from Prague. For the better part of a decade I have turned messy, large-scale datasets into products and decisions, mostly at the meeting point of cities, movement, and infrastructure.",
    "Lately I have been moving from being the person who builds the analysis to the person who shapes the product: discovery, strategy, value, and roadmap. I care about thoughtful design, sustainability and carbon, and practical AI that actually ships.",
  ],
  // "Currently" one-liner for the About section.
  currently:
    "Building data products and a stack of side projects, training for a sub-4 marathon, and curating Vietnamese cinema with Star Nhà Ease.",
  // TODO: drop a square portrait at public/portrait.jpg (≈800x800) to replace the monogram.
  portrait: "/portrait.jpg",
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

export const stats: Stat[] = [
  { value: 1.5, prefix: "£", suffix: "M", label: "Rail O-D product sold to TfL", decimals: 1 },
  { value: 7, suffix: "+", label: "Years in data, analytics & product" },
  { value: 20, suffix: "%", label: "AWS spend cut via pipeline optimisation" },
  { value: 60, suffix: "%", label: "Faster data processing at Amey" },
];

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
    name: "Urban Lines",
    tagline: "Personalised marathon-route and city-map art prints.",
    year: "2024 — now",
    role: "Founder / full-stack & brand",
    category: "E-commerce · Cartography",
    featured: true,
    accent: "magenta",
    image: "/projects/urban-lines.jpg",
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
      "Designed safety-weighted routing that blends data.police.uk crime data with OpenStreetMap street-lighting, plus SOS and fake-call features, all in a calm 'Sola' visual language.",
    result:
      "A complete design and spec with a backend and iOS concept: routes optimised for light and lower-risk streets rather than purely the shortest path.",
    stack: ["Swift / iOS", "Routing", "data.police.uk", "OSM lighting", "Python backend"],
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
      "Light and dark prototypes plus a web build and a Supabase-backed version, covering onboarding, pet selection, XP and levelling, and quest screens.",
    stack: ["React", "Supabase", "Pixel art", "Vaporwave UI", "Gamification"],
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
      "Built an LCA MVP with CSV upload, a DEFRA-style emission-factor resolver with version pinning, QA checks, an AR5/AR6 switch and report export.",
    result:
      "A FastAPI + SQLite tool that makes the methodology and factor versions transparent and auditable.",
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
