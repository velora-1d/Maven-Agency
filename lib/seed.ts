import type {
  CatalogItem,
  PageView,
  PortfolioProject,
  ServiceItem,
  SiteSettings,
  TeamMember,
  Testimonial
} from "@/lib/types";

export const seedServices: ServiceItem[] = [
  {
    id: "service-ai",
    slug: "ai-automation",
    title: {
      id: "AI dan Otomasi",
      en: "AI and Automation"
    },
    description: {
      id: "Workflow cerdas yang mengurangi kerja manual dan mempercepat tim Anda.",
      en: "Smart workflows that cut manual work and accelerate your team."
    },
    icon: "01",
    blockColor: "#FF6B00",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "service-commerce",
    slug: "e-commerce",
    title: {
      id: "E-commerce",
      en: "E-commerce"
    },
    description: {
      id: "Toko digital yang cepat, meyakinkan, dan siap tumbuh lintas channel.",
      en: "Fast, convincing digital stores built to scale across channels."
    },
    icon: "02",
    blockColor: "#A5FF8B",
    isActive: true,
    sortOrder: 2
  },
  {
    id: "service-mobile",
    slug: "mobile-app-development",
    title: {
      id: "Mobile App Development",
      en: "Mobile App Development"
    },
    description: {
      id: "Aplikasi yang terasa native, ringan, dan siap dipakai di lapangan.",
      en: "Apps that feel native, stay lightweight, and ship ready for the field."
    },
    icon: "03",
    blockColor: "#98D8FF",
    isActive: true,
    sortOrder: 3
  },
  {
    id: "service-web",
    slug: "web-development",
    title: {
      id: "Web Development",
      en: "Web Development"
    },
    description: {
      id: "Website dan platform custom dengan SEO yang kuat dan dashboard yang rapi.",
      en: "Custom websites and platforms with strong SEO and polished dashboards."
    },
    icon: "04",
    blockColor: "#FFD84D",
    isActive: true,
    sortOrder: 4
  }
];

export const seedPortfolio: PortfolioProject[] = [
  {
    id: "portfolio-atlas",
    slug: "atlas-commerce-suite",
    title: {
      id: "Atlas Commerce Suite",
      en: "Atlas Commerce Suite"
    },
    summary: {
      id: "Replatform toko B2C dengan performa checkout yang naik 38%.",
      en: "B2C commerce replatform with a 38% lift in checkout performance."
    },
    category: {
      id: "E-commerce",
      en: "E-commerce"
    },
    highlight: {
      id: "Checkout lebih cepat, katalog lebih mudah dicari.",
      en: "Faster checkout, easier catalog discovery."
    },
    image: "",
    isActive: true,
    sortOrder: 1,
    techStack: ["Next.js", "Neon", "Drizzle"]
  },
  {
    id: "portfolio-pulse",
    slug: "pulse-field-ops",
    title: {
      id: "Pulse Field Ops",
      en: "Pulse Field Ops"
    },
    summary: {
      id: "Dashboard operasional mobile-first untuk tim distribusi regional.",
      en: "Mobile-first operations dashboard for regional distribution teams."
    },
    category: {
      id: "Mobile App",
      en: "Mobile App"
    },
    highlight: {
      id: "Satu panel untuk driver, supervisor, dan laporan harian.",
      en: "One panel for drivers, supervisors, and daily reports."
    },
    image: "",
    isActive: true,
    sortOrder: 2,
    techStack: ["React Native", "Analytics", "Sync"]
  },
  {
    id: "portfolio-forge",
    slug: "forge-growth-engine",
    title: {
      id: "Forge Growth Engine",
      en: "Forge Growth Engine"
    },
    summary: {
      id: "Automasi lead funnel dengan integrasi CRM dan notifikasi internal.",
      en: "Lead funnel automation with CRM integration and internal alerts."
    },
    category: {
      id: "AI / Automation",
      en: "AI / Automation"
    },
    highlight: {
      id: "Lead qualification lebih cepat tanpa menambah headcount.",
      en: "Faster lead qualification without adding headcount."
    },
    image: "",
    isActive: true,
    sortOrder: 3,
    techStack: ["Automation", "CRM", "LLM Ops"]
  }
];

export const seedTeam: TeamMember[] = [
  {
    id: "team-raka",
    name: "Raka Pradana",
    role: {
      id: "Founder / Strategy Lead",
      en: "Founder / Strategy Lead"
    },
    bio: {
      id: "Menghubungkan kebutuhan bisnis dengan eksekusi digital yang berani dan terukur.",
      en: "Connects business needs with bold, measurable digital execution."
    },
    avatar: "",
    socials: [
      { label: "LinkedIn", url: "https://linkedin.com" },
      { label: "Behance", url: "https://behance.net" }
    ],
    isActive: true,
    sortOrder: 1
  },
  {
    id: "team-sinta",
    name: "Sinta Wulandari",
    role: {
      id: "Product Designer",
      en: "Product Designer"
    },
    bio: {
      id: "Mendesain antarmuka yang lantang, terarah, dan tetap mudah digunakan.",
      en: "Designs loud, intentional interfaces that remain easy to use."
    },
    avatar: "",
    socials: [{ label: "Dribbble", url: "https://dribbble.com" }],
    isActive: true,
    sortOrder: 2
  },
  {
    id: "team-arya",
    name: "Arya Nugraha",
    role: {
      id: "Engineering Lead",
      en: "Engineering Lead"
    },
    bio: {
      id: "Fokus pada arsitektur cepat, maintainable, dan siap scale.",
      en: "Focused on fast, maintainable architecture that is ready to scale."
    },
    avatar: "",
    socials: [{ label: "GitHub", url: "https://github.com" }],
    isActive: true,
    sortOrder: 3
  }
];

export const seedTestimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    clientName: "Nadia Putri",
    company: "Atlas Retail",
    quote: {
      id: "MAVEN Forge berhasil mengubah brief yang berantakan menjadi sistem yang jelas, cepat, dan enak dipakai tim kami.",
      en: "MAVEN Forge turned a messy brief into a clear, fast system our team loves using."
    },
    rating: 5,
    isActive: true,
    sortOrder: 1
  },
  {
    id: "testimonial-2",
    clientName: "Daniel Hart",
    company: "Northbound Studio",
    quote: {
      id: "Mereka tidak hanya bangun produk, tapi juga ikut menyusun arah digitalnya.",
      en: "They did not just build the product. They helped shape the digital direction."
    },
    rating: 5,
    isActive: true,
    sortOrder: 2
  },
  {
    id: "testimonial-3",
    clientName: "Bimaantara Jaya",
    company: "FintechID Utama",
    quote: {
      id: "Kecepatan eksekusi tim MAVEN sangat luar biasa. Sistem backend kami yang rumit berhasil dioptimasi tanpa downtime sama sekali.",
      en: "The execution speed of the MAVEN team is exceptional. Our complex backend system was optimized with zero downtime."
    },
    rating: 5,
    isActive: true,
    sortOrder: 3
  },
  {
    id: "testimonial-4",
    clientName: "Elena Rostova",
    company: "Lumina Global Logistics",
    quote: {
      id: "Desain UI/UX yang diberikan tidak hanya indah dipandang, tetapi juga berhasil meningkatkan retensi pengguna aktif kami hingga 45% dalam kuartal pertama.",
      en: "The UI/UX design provided is not only visually stunning but also increased our active user retention by 45% in the first quarter."
    },
    rating: 5,
    isActive: true,
    sortOrder: 4
  },
  {
    id: "testimonial-5",
    clientName: "Hendra Wijaya",
    company: "Kopi Kultur Nusantara",
    quote: {
      id: "Storefront e-commerce baru kami super cepat dan responsif. Pengalaman checkout pelanggan kini jauh lebih mulus dan konversi penjualan melesat tajam.",
      en: "Our new e-commerce storefront is blazing fast and responsive. The customer checkout experience is seamless, and sales conversions have skyrocketed."
    },
    rating: 5,
    isActive: true,
    sortOrder: 5
  },
  {
    id: "testimonial-6",
    clientName: "Sarah Chen",
    company: "SaaSify Matrix",
    quote: {
      id: "Pendekatan automasi AI dari MAVEN Forge menghemat waktu kerja operasional tim kami hingga puluhan jam setiap minggunya. Sangat direkomendasikan!",
      en: "The AI automation approach from MAVEN Forge saves our ops team dozens of hours every week. Highly recommended!"
    },
    rating: 5,
    isActive: true,
    sortOrder: 6
  }
];

export const seedCatalog: CatalogItem[] = [
  {
    id: "catalog-starter",
    slug: "starter-commerce-kit",
    name: {
      id: "Starter Commerce Kit",
      en: "Starter Commerce Kit"
    },
    description: {
      id: "Paket awal untuk brand yang ingin punya storefront cepat dan kredibel.",
      en: "An entry package for brands that need a fast and credible storefront."
    },
    category: {
      id: "E-commerce",
      en: "E-commerce"
    },
    technologyLabels: ["Next.js", "CMS", "SEO"],
    features: [
      {
        id: "Katalog produk dan halaman promo",
        en: "Product catalog and campaign pages"
      },
      {
        id: "Dashboard admin sederhana",
        en: "Simple admin dashboard"
      },
      {
        id: "Optimasi performa dasar",
        en: "Baseline performance optimization"
      }
    ],
    priceFrom: 15000000,
    priceTo: 25000000,
    priceLabel: {
      id: "Mulai dari",
      en: "Starting from"
    },
    isPriceHidden: false,
    ctaUrl: "https://wa.me/6281234567890",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "catalog-automation",
    slug: "ops-automation-sprint",
    name: {
      id: "Ops Automation Sprint",
      en: "Ops Automation Sprint"
    },
    description: {
      id: "Audit proses, desain workflow, dan implementasi automasi berdampak tinggi.",
      en: "Process audit, workflow design, and high-impact automation delivery."
    },
    category: {
      id: "AI / Automation",
      en: "AI / Automation"
    },
    technologyLabels: ["AI", "CRM", "Workflow"],
    features: [
      {
        id: "Mapping bottleneck internal",
        en: "Internal bottleneck mapping"
      },
      {
        id: "Integrasi notifikasi dan approval",
        en: "Notification and approval integrations"
      },
      {
        id: "Handover dokumentasi tim",
        en: "Team documentation handoff"
      }
    ],
    priceFrom: null,
    priceTo: null,
    priceLabel: {
      id: "Hubungi Kami",
      en: "Contact Us"
    },
    isPriceHidden: true,
    ctaUrl: "https://wa.me/6281234567890",
    isActive: true,
    sortOrder: 2
  },
  {
    id: "catalog-mobile",
    slug: "field-mobile-launch",
    name: {
      id: "Field Mobile Launch",
      en: "Field Mobile Launch"
    },
    description: {
      id: "MVP aplikasi mobile untuk operasional, sales, atau layanan lapangan.",
      en: "A mobile MVP for operations, sales, or field service workflows."
    },
    category: {
      id: "Mobile App",
      en: "Mobile App"
    },
    technologyLabels: ["React Native", "API", "Offline Sync"],
    features: [
      {
        id: "Validasi use case dan flow inti",
        en: "Core use case and flow validation"
      },
      {
        id: "Desain UI dan modul inti",
        en: "UI design and core modules"
      },
      {
        id: "Build siap demo investor atau stakeholder",
        en: "Build ready for investor or stakeholder demos"
      }
    ],
    priceFrom: 25000000,
    priceTo: 50000000,
    priceLabel: {
      id: "Estimasi paket",
      en: "Package estimate"
    },
    isPriceHidden: false,
    ctaUrl: "https://wa.me/6281234567890",
    isActive: true,
    sortOrder: 3
  }
];

export const seedSettings: SiteSettings = {
  heroBadge: {
    id: "Neo-Brutal Digital Agency",
    en: "Neo-Brutal Digital Agency"
  },
  heroHeadline: {
    id: "Forge Your Digital Future",
    en: "Forge Your Digital Future"
  },
  heroSubheadline: {
    id: "Kami membantu brand, tim operasional, dan bisnis bertumbuh lewat sistem digital yang keras kepala soal hasil.",
    en: "We help brands, ops teams, and growing businesses build digital systems that stay stubbornly focused on results."
  },
  heroCtaLabel: {
    id: "Mulai Proyek",
    en: "Start a Project"
  },
  heroCtaHref: "#contact",
  heroImage1: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  heroImage2: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  aboutHeadline: {
    id: "Studio digital dengan rasa editorial dan ritme produk yang cepat.",
    en: "A digital studio with editorial energy and a fast product rhythm."
  },
  aboutStory: {
    id: "MAVEN Forge lahir untuk menjembatani strategi, desain, dan implementasi. Kami suka proyek yang butuh struktur, kecepatan, dan identitas visual yang tidak malu terlihat berbeda.",
    en: "MAVEN Forge exists to bridge strategy, design, and implementation. We thrive on projects that need structure, speed, and a visual identity unafraid to look different."
  },
  mission: {
    id: "Membangun produk digital yang membantu bisnis bergerak lebih cepat tanpa kehilangan karakter.",
    en: "Build digital products that help businesses move faster without losing character."
  },
  vision: {
    id: "Menjadi partner eksekusi digital yang paling dipercaya untuk bisnis yang ingin tumbuh berani.",
    en: "Become the most trusted digital execution partner for businesses ready to grow boldly."
  },
  stats: [
    {
      value: "27+",
      label: {
        id: "Klien Aktif",
        en: "Active Clients"
      }
    },
    {
      value: "61",
      label: {
        id: "Proyek Selesai",
        en: "Completed Projects"
      }
    },
    {
      value: "4",
      label: {
        id: "Tahun Bereksperimen",
        en: "Years of Shipping"
      }
    }
  ],
  whyUs: [
    {
      title: {
        id: "Strategi yang membumi",
        en: "Grounded strategy"
      },
      body: {
        id: "Kami suka solusi yang bisa dipakai besok pagi, bukan cuma presentasi yang keren.",
        en: "We focus on solutions teams can actually use tomorrow morning, not just nice decks."
      }
    },
    {
      title: {
        id: "Eksekusi lintas disiplin",
        en: "Cross-discipline execution"
      },
      body: {
        id: "Desain, engineering, dan automasi dibangun bareng agar hasilnya terasa utuh.",
        en: "Design, engineering, and automation are built together so the output feels whole."
      }
    },
    {
      title: {
        id: "Bahasa bisnis, bukan jargon",
        en: "Business language over jargon"
      },
      body: {
        id: "Kami menerjemahkan teknologi menjadi dampak yang bisa dipahami stakeholder.",
        en: "We translate technology into stakeholder-friendly business impact."
      }
    }
  ],
  contactHeadline: {
    id: "Mari bentuk sistem digital berikutnya.",
    en: "Let's forge the next digital system."
  },
  contactCopy: {
    id: "Ceritakan target Anda. Kami bantu petakan scope, prioritas, dan bentuk eksekusi paling masuk akal.",
    en: "Tell us your target. We will help map scope, priorities, and the most sensible execution path."
  },
  whatsapp: "+62 812-3456-7890",
  phone: "+62 21-555-0199",
  email: "hello@mavenforge.dev",
  address: {
    id: "Jakarta, Indonesia",
    en: "Jakarta, Indonesia"
  },
  socials: [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "Behance", url: "https://behance.net" }
  ]
};

export const seedPageViews: PageView[] = [
  {
    id: "view-1",
    path: "/id",
    locale: "id",
    referrer: "direct",
    visitorId: "seed-visitor-1",
    visitedAt: new Date().toISOString()
  }
];
