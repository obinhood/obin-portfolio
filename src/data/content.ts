/* ============================================================================
   content.ts: single source of truth for the site's words.
   Projects live in projects.ts. Everything here is real (from Obin's CVs and
   project repos). Copy rules: British English, no em dashes, no client names.
   ========================================================================== */

export type SocialLink = { label: string; handle: string; href: string };
export type NavItem = { label: string; href: string; index: string };

/** Transit "lines" used to colour the career route. */
export type LineKey = "signal" | "water" | "moss" | "ink";

export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  line: LineKey;
  summary: string;
  bullets: string[];
  tags: string[];
};

export type SkillGroup = { group: string; symbol: SymbolKey; items: string[] };
export type SymbolKey = "solid" | "dashed" | "contour" | "rail" | "hatch" | "summit";

export type Movie = { title: string; year: string; rating: number; note?: string };
export type Book = { title: string; author: string; rating: number };
export type Interest = { title: string; body: string; tag: string };
export type EducationItem = { school: string; degree: string; detail: string };
export type Figure = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string };

/* -------------------------------------------------------------------------- */

export const profile = {
  name: "Le Nghia Nguyen",
  first: "Obin",
  last: "Nguyen",
  initials: "ON",
  title: "Data & Product Strategist",
  location: "London, UK",
  coords: { lat: 51.5072, lon: -0.1276 },
  email: "nguyenler@gmail.com",
  // Hero line: what I do, in one breath.
  headline: "I map how cities move, then build products from what the map shows.",
  // The big statement in Plate 01. *Asterisks* set a phrase in italic.
  statement:
    "Czech-Vietnamese, raised in Prague, based in London. For nine years I have turned the way people move through cities into *data products* and decisions, from a rail flow product sold for £1.5M to carbon models for flood defences. Now I take ideas from the *first question* to a shipped product.",
  bio: [
    "My work sits where cities, movement and infrastructure meet. I have led data products built on mobile network data, run lifecycle and carbon models for major schemes, and turned one-off analysis into services clients pay for again.",
    "Lately I have moved from building the analysis to shaping the product: discovery, strategy, value and roadmap. I care about thoughtful design, sustainability and practical AI that actually ships.",
  ],
  fieldNotes: [
    { k: "Based", v: "London, UK" },
    { k: "Raised", v: "Prague, Czechia" },
    { k: "Studied", v: "MSc Smart Cities & Urban Analytics, UCL" },
    { k: "Now", v: "Founder, URBANLINES · AI Evaluation, Mercor" },
    { k: "Seeking", v: "Product strategy and AI product roles" },
  ],
  currently: [
    { label: "Founder", org: "URBANLINES" },
    { label: "AI Evaluation Specialist", org: "Mercor" },
  ],
  // Add a ~1000x1250 image to public/ and set its path to show a portrait.
  portrait: "",
};

export const socials: SocialLink[] = [
  { label: "LinkedIn", handle: "obin-nguyen", href: "https://www.linkedin.com/in/obin-nguyen/" },
  { label: "GitHub", handle: "obinhood", href: "https://github.com/obinhood/" },
  { label: "Letterboxd", handle: "obinhood", href: "https://letterboxd.com/obinhood/" },
  { label: "Email", handle: "nguyenler@gmail.com", href: "mailto:nguyenler@gmail.com" },
];

export const nav: NavItem[] = [
  { label: "Work", href: "#work", index: "02" },
  { label: "Experience", href: "#experience", index: "03" },
  { label: "Toolkit", href: "#toolkit", index: "04" },
  { label: "Beyond", href: "#beyond", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
];

export const cv = {
  path: "/cv/Obin-Nguyen-CV.pdf",
  label: "Download CV",
};

/** Headline numbers for the statement plate. */
export const figures: Figure[] = [
  {
    value: 1.5,
    prefix: "£",
    suffix: "M",
    decimals: 1,
    label: "Rail origin-destination product I helped build, sold to a major transport authority",
  },
  {
    value: 60,
    suffix: "%",
    label: "Less data processing time after re-engineering PySpark, Python and SQL pipelines",
  },
  {
    value: 20,
    suffix: "%",
    label: "Cut from a monthly AWS bill, roughly £5k a month saved",
  },
];

/* --------------------------------- Route ---------------------------------- */

export const lines: Record<LineKey, string> = {
  signal: "Founder & AI",
  water: "Mobility data",
  moss: "Infrastructure & climate",
  ink: "Strategy & cities",
};

export const experience: Experience[] = [
  {
    company: "Mercor",
    role: "AI Evaluation Specialist (freelance)",
    location: "Remote",
    start: "Apr 2026",
    end: "Present",
    current: true,
    line: "signal",
    summary: "Freelance evaluation of frontier AI models on complex, multi-step analytical work.",
    bullets: [
      "Evaluate frontier AI models on complex, multi-step analytical tasks against set criteria.",
    ],
    tags: ["LLM evaluation", "Analytical reasoning", "AI quality"],
  },
  {
    company: "URBANLINES",
    role: "Founder",
    location: "London, UK",
    start: "Oct 2025",
    end: "Present",
    current: true,
    line: "signal",
    summary: "A personalised race-map and city-map print shop, built and launched as sole founder.",
    bullets: [
      "Built and launched urbanlines.co.uk as sole founder, from brand, pricing and go-to-market to the full-stack build.",
      "Designed an OpenStreetMap renderer, a customisation and approval flow, Stripe checkout and print-on-demand fulfilment.",
    ],
    tags: ["Brand", "Pricing", "Go-to-market", "Next.js", "FastAPI", "Stripe"],
  },
  {
    company: "Amey / CitiLogik",
    role: "Senior Strategic Consultant & Deputy Head of Data Products",
    location: "London, UK",
    start: "Aug 2023",
    end: "Sep 2025",
    line: "water",
    summary:
      "Delivery, product and technical leadership for mobility and infrastructure data services built on mobile network data, demographics, geospatial analytics and AI-enabled workflows.",
    bullets: [
      "Led end-to-end client delivery, from commercial scoping through QA to stakeholder read-outs, for local authorities, transport operators and infrastructure clients.",
      "Built transport carbon baselines from mobile network data and identified areas for councils to install public EV chargers from trip and dwell-time patterns.",
      "Cut AWS spend by about 20% (roughly £5k a month) and data processing time by about 60% by optimising PySpark, Python and SQL workflows.",
      "Led an agent-based LLM pipeline that read reports and extracted structured data, measuring its accuracy against hand-checked samples before rolling it out to the wider team.",
      "Co-developed AI proofs of concept, from road-defect computer vision to bat detection for ecological surveys, taking each from user problem to working prototype.",
    ],
    tags: ["Product ownership", "Mobile network data", "PySpark", "AWS", "LLM pipelines", "Stakeholder strategy"],
  },
  {
    company: "Jacobs",
    role: "Senior Data Analyst / Technical Lead",
    location: "London, UK",
    start: "Jun 2021",
    end: "Sep 2023",
    line: "moss",
    summary:
      "Technical lead across infrastructure, water and transport analytics: lifecycle models, predictive maintenance and BI for highways, flood-defence, water and rail clients.",
    bullets: [
      "Led lifecycle modelling for a major estuary flood-defence programme, including cost-of-inaction logic and carbon profiles for intervention strategies.",
      "Product owner on an IoT predictive-maintenance pilot for water pumps (Azure Data Factory, Power BI, ML) that flagged faults up to four days earlier and won a Jacobs Award of Excellence.",
      "Ran PAS 2080 whole-life carbon assessments and built climate change scenarios into flood and asset risk models.",
      "Built risk frameworks and defect analytics that turned technical outputs into board-ready decisions.",
    ],
    tags: ["Azure Data Factory", "Power BI", "Predictive maintenance", "Lifecycle modelling", "Whole-life carbon"],
  },
  {
    company: "Prague Institute of Planning and Development",
    role: "Urban Analytics Adviser (part-time)",
    location: "Prague, Czechia",
    start: "2022",
    end: "2024",
    line: "ink",
    summary: "Part-time adviser on urban analytics to the city's planning institute, alongside my role at Jacobs.",
    bullets: [],
    tags: ["Urban analytics", "Planning", "Spatial data"],
  },
  {
    company: "Movement Strategies (now GHD)",
    role: "Senior Data Analyst",
    location: "London, UK",
    start: "Apr 2019",
    end: "Jun 2021",
    line: "water",
    summary:
      "Movement intelligence and spatial analytics, using mobile network, routing and geospatial data to build transport, rail and retail insight products.",
    bullets: [
      "Played a major role in building an origin-destination rail product from mobile network data, validated against official rail statistics and sold to a major transport authority for £1.5M.",
      "Analysed footfall, socio-demographics and travel behaviour at major London rail hubs.",
      "Productised one-off analytical methods into repeatable, sellable services with QA built in.",
      "Ran QA on outputs against official statistics and benchmarks, documenting each adjustment so figures were traceable.",
    ],
    tags: ["PostGIS", "QGIS", "Python", "SQL", "Geospatial", "Productisation"],
  },
  {
    company: "Freshminds",
    role: "Analyst",
    location: "London, UK",
    start: "Feb 2018",
    end: "Apr 2019",
    line: "ink",
    summary: "Analytics and market research supporting strategy engagements for leading consultancies.",
    bullets: [
      "Delivered quantitative and qualitative analysis across more than ten consulting projects.",
      "Built outputs and visualisations in Python, Excel and Power BI to support data-led recommendations.",
    ],
    tags: ["Market research", "Python", "Power BI", "Strategy support"],
  },
  {
    company: "EY",
    role: "Junior Consultant",
    location: "Prague, Czechia",
    start: "Apr 2017",
    end: "Sep 2017",
    line: "ink",
    summary: "Smart cities, innovation strategy and digital transformation for public-sector and industrial clients.",
    bullets: [
      "Contributed to smart-city strategy for a major city and digital strategy for city districts, covering open data, IoT and the data economy.",
      "Assessed where new technology and open innovation could create value in automotive, steel and energy, including energy-efficiency and waste-reduction proposals.",
    ],
    tags: ["Smart cities", "Innovation strategy", "Workshops"],
  },
];

export const education: EducationItem[] = [
  { school: "UCL", degree: "MSc Smart Cities & Urban Analytics", detail: "CASA: spatial data, mobility, urban tech" },
  { school: "Aston University", degree: "BSc Psychology & Business", detail: "" },
  { school: "Hong Kong Polytechnic University", degree: "Exchange, Marketing & Management", detail: "" },
];

export const certifications: string[] = [
  "AgilePM Practitioner",
  "Sustainability Transformation for Leaders",
  "Become a Product Manager",
  "Strategic Planning & Urban Design Foundations",
  "Smarter Cities: Using Data to Drive Urban Innovation",
];

/* -------------------------------- Toolkit --------------------------------- */

export const capabilities: string[] = [
  "Product strategy",
  "Data products",
  "Mobility intelligence",
  "Spatial data science",
  "Carbon & ESG",
  "AI that ships",
  "Cartography",
];

export const skills: SkillGroup[] = [
  { group: "Product & strategy", symbol: "hatch", items: ["Discovery", "Roadmapping", "Agile / Scrum", "Stakeholder strategy", "Power BI", "Tableau", "JIRA"] },
  { group: "Data & ML", symbol: "dashed", items: ["Pandas", "NumPy", "scikit-learn", "PySpark", "Databricks", "DuckDB"] },
  { group: "Geospatial", symbol: "contour", items: ["PostGIS", "QGIS", "GeoPandas", "OSMnx", "NetworkX"] },
  { group: "Languages", symbol: "solid", items: ["Python", "SQL", "R", "TypeScript", "JavaScript"] },
  { group: "Cloud & pipelines", symbol: "rail", items: ["AWS", "Azure Data Factory", "Supabase", "Railway", "Cloudflare R2"] },
  { group: "Build & AI", symbol: "summit", items: ["React", "Next.js", "FastAPI", "Claude / LLM agents", "Stripe", "Git"] },
];

/* ------------------------------ Beyond work ------------------------------- */

export const running = {
  latest: { race: "Barcelona Marathon", year: "2026", time: "4:31:00" },
  halfPB: "1:59:29",
  goal: "4:00:00",
  note: "A stubborn plan to break four hours, and more thought about pacing, fuelling and tapering than is reasonable.",
};

export const letterboxd = {
  username: "obinhood",
  url: "https://letterboxd.com/obinhood/",
  rss: "https://letterboxd.com/obinhood/rss/",
};

// Static fallback shown if the live Letterboxd feed can't be fetched.
export const moviesFallback: Movie[] = [
  { title: "Cyclo", year: "1995", rating: 5, note: "Trần Anh Hùng" },
  { title: "The Scent of Green Papaya", year: "1993", rating: 5 },
  { title: "In the Mood for Love", year: "2000", rating: 5 },
  { title: "Drive My Car", year: "2021", rating: 4.5 },
  { title: "Perfect Days", year: "2023", rating: 4.5 },
  { title: "Past Lives", year: "2023", rating: 4 },
];

export const goodreads = {
  // Add the Goodreads profile URL and the read-shelf RSS URL to go live.
  url: "",
  rss: "",
};

export const booksFallback: Book[] = [
  { title: "The Death and Life of Great American Cities", author: "Jane Jacobs", rating: 5 },
  { title: "Order Without Design", author: "Alain Bertaud", rating: 4 },
  { title: "How Big Things Get Done", author: "Bent Flyvbjerg", rating: 4 },
  { title: "Superintelligence", author: "Nick Bostrom", rating: 4 },
  { title: "Life 3.0", author: "Max Tegmark", rating: 4 },
];

export const interests: Interest[] = [
  {
    tag: "Running",
    title: "Chasing a sub-4 marathon",
    body: "Barcelona 2026 in 4:31:00, a half PB of 1:59:29, and a stubborn plan to break four hours. I think about pacing, fuelling and tapering more than is reasonable.",
  },
  {
    tag: "Cinema",
    title: "Curating Vietnamese film",
    body: "Curator with Star Nhà Ease, programming Vietnamese cinema and Czech-Vietnamese strands at UK festivals, with a soft spot for 1985 to 2010.",
  },
  {
    tag: "Community",
    title: "VietPro UK committee",
    body: "Events, partnerships and marketing for the Czech-Vietnamese and wider Vietnamese professional community in the UK.",
  },
  {
    tag: "Making",
    title: "Maps, photographs, a flat",
    body: "Cartography and 3D city maps, photography and visual storytelling, and slowly renovating a three-bed flat in Wapping.",
  },
];

export const contact = {
  heading: "Let's make *something* worth mapping.",
  body: "Open to product strategy and AI product roles, interesting collaborations, or a good conversation about cities, data and film.",
  email: "nguyenler@gmail.com",
};
