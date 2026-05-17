import type {
  AdminResourceKey,
  CatalogItem,
  PortfolioProject,
  ServiceItem,
  SiteSettings,
  TeamMember,
  Testimonial
} from "@/lib/types";
import { parseCommaList, parseLines, slugify } from "@/lib/utils";

export type ResourceField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox";
  placeholder?: string;
  media?: boolean;
};

export type ResourceFormValues = Record<string, string | number | boolean>;

type ResourceConfig<Item> = {
  title: string;
  description: string;
  accent: string;
  fields: ResourceField[];
  createEmpty: () => ResourceFormValues;
  toFormValues: (item: Item) => ResourceFormValues;
  toPayload: (values: ResourceFormValues) => Omit<Item, "id">;
  toCard: (item: Item) => {
    title: string;
    subtitle: string;
    badges: string[];
  };
};

function readString(values: ResourceFormValues, key: string) {
  return String(values[key] ?? "");
}

function readNumber(values: ResourceFormValues, key: string) {
  const raw = values[key];
  return typeof raw === "number" ? raw : Number(raw ?? 0);
}

function readBoolean(values: ResourceFormValues, key: string) {
  return Boolean(values[key]);
}

function parseSocialLines(value: string) {
  return parseLines(value)
    .map((entry) => {
      const [label, url] = entry.split("|").map((part) => part.trim());
      if (!label || !url) {
        return null;
      }

      return { label, url };
    })
    .filter(Boolean) as Array<{ label: string; url: string }>;
}

function serializeSocialLines(
  socials: Array<{
    label: string;
    url: string;
  }>
) {
  return socials.map((social) => `${social.label} | ${social.url}`).join("\n");
}

export const resourceLabels: Record<AdminResourceKey | "settings", string> = {
  services: "Services Manager",
  portfolio: "Portfolio Manager",
  team: "Team Manager",
  testimonials: "Testimonial Manager",
  catalog: "Catalog Manager",
  settings: "Site Settings"
};

export const resourceConfigs: Record<
  AdminResourceKey,
  | ResourceConfig<ServiceItem>
  | ResourceConfig<PortfolioProject>
  | ResourceConfig<TeamMember>
  | ResourceConfig<Testimonial>
  | ResourceConfig<CatalogItem>
> = {
  services: {
    title: "Services Manager",
    description: "Kelola blok layanan utama yang muncul di homepage.",
    accent: "#FF6B00",
    fields: [
      { name: "slug", label: "Slug", type: "text" },
      { name: "titleId", label: "Title ID", type: "text" },
      { name: "titleEn", label: "Title EN", type: "text" },
      { name: "descriptionId", label: "Description ID", type: "textarea" },
      { name: "descriptionEn", label: "Description EN", type: "textarea" },
      { name: "icon", label: "Block Number / Icon", type: "text" },
      { name: "blockColor", label: "Block Color", type: "text" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "isActive", label: "Active", type: "checkbox" }
    ],
    createEmpty: () => ({
      slug: "",
      titleId: "",
      titleEn: "",
      descriptionId: "",
      descriptionEn: "",
      icon: "",
      blockColor: "#FF6B00",
      sortOrder: 0,
      isActive: true
    }),
    toFormValues: (item: ServiceItem) => ({
      slug: item.slug,
      titleId: item.title.id,
      titleEn: item.title.en,
      descriptionId: item.description.id,
      descriptionEn: item.description.en,
      icon: item.icon,
      blockColor: item.blockColor,
      sortOrder: item.sortOrder,
      isActive: item.isActive
    }),
    toPayload: (values) => ({
      slug: slugify(readString(values, "slug")),
      title: {
        id: readString(values, "titleId"),
        en: readString(values, "titleEn")
      },
      description: {
        id: readString(values, "descriptionId"),
        en: readString(values, "descriptionEn")
      },
      icon: readString(values, "icon"),
      blockColor: readString(values, "blockColor"),
      sortOrder: readNumber(values, "sortOrder"),
      isActive: readBoolean(values, "isActive")
    }),
    toCard: (item: ServiceItem) => ({
      title: item.title.id,
      subtitle: item.title.en,
      badges: [item.slug, item.blockColor, item.isActive ? "active" : "draft"]
    })
  },
  portfolio: {
    title: "Portfolio Manager",
    description: "Kelola case study dan kartu project publik.",
    accent: "#98D8FF",
    fields: [
      { name: "slug", label: "Slug", type: "text" },
      { name: "titleId", label: "Title ID", type: "text" },
      { name: "titleEn", label: "Title EN", type: "text" },
      { name: "summaryId", label: "Summary ID", type: "textarea" },
      { name: "summaryEn", label: "Summary EN", type: "textarea" },
      { name: "categoryId", label: "Category ID", type: "text" },
      { name: "categoryEn", label: "Category EN", type: "text" },
      { name: "highlightId", label: "Highlight ID", type: "textarea" },
      { name: "highlightEn", label: "Highlight EN", type: "textarea" },
      { name: "image", label: "Image Path / URL", type: "text", media: true },
      {
        name: "techStack",
        label: "Tech Stack (comma separated)",
        type: "textarea"
      },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "isActive", label: "Active", type: "checkbox" }
    ],
    createEmpty: () => ({
      slug: "",
      titleId: "",
      titleEn: "",
      summaryId: "",
      summaryEn: "",
      categoryId: "",
      categoryEn: "",
      highlightId: "",
      highlightEn: "",
      image: "",
      techStack: "",
      sortOrder: 0,
      isActive: true
    }),
    toFormValues: (item: PortfolioProject) => ({
      slug: item.slug,
      titleId: item.title.id,
      titleEn: item.title.en,
      summaryId: item.summary.id,
      summaryEn: item.summary.en,
      categoryId: item.category.id,
      categoryEn: item.category.en,
      highlightId: item.highlight.id,
      highlightEn: item.highlight.en,
      image: item.image,
      techStack: item.techStack.join(", "),
      sortOrder: item.sortOrder,
      isActive: item.isActive
    }),
    toPayload: (values) => ({
      slug: slugify(readString(values, "slug")),
      title: {
        id: readString(values, "titleId"),
        en: readString(values, "titleEn")
      },
      summary: {
        id: readString(values, "summaryId"),
        en: readString(values, "summaryEn")
      },
      category: {
        id: readString(values, "categoryId"),
        en: readString(values, "categoryEn")
      },
      highlight: {
        id: readString(values, "highlightId"),
        en: readString(values, "highlightEn")
      },
      image: readString(values, "image"),
      techStack: parseCommaList(readString(values, "techStack")),
      sortOrder: readNumber(values, "sortOrder"),
      isActive: readBoolean(values, "isActive")
    }),
    toCard: (item: PortfolioProject) => ({
      title: item.title.id,
      subtitle: item.category.id,
      badges: [...item.techStack.slice(0, 3), item.isActive ? "active" : "draft"]
    })
  },
  team: {
    title: "Team Manager",
    description: "Kelola member, role, bio, dan link sosial.",
    accent: "#A5FF8B",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "roleId", label: "Role ID", type: "text" },
      { name: "roleEn", label: "Role EN", type: "text" },
      { name: "bioId", label: "Bio ID", type: "textarea" },
      { name: "bioEn", label: "Bio EN", type: "textarea" },
      { name: "avatar", label: "Avatar Path / URL", type: "text", media: true },
      {
        name: "socials",
        label: "Socials (one per line: Label | URL)",
        type: "textarea"
      },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "isActive", label: "Active", type: "checkbox" }
    ],
    createEmpty: () => ({
      name: "",
      roleId: "",
      roleEn: "",
      bioId: "",
      bioEn: "",
      avatar: "",
      socials: "",
      sortOrder: 0,
      isActive: true
    }),
    toFormValues: (item: TeamMember) => ({
      name: item.name,
      roleId: item.role.id,
      roleEn: item.role.en,
      bioId: item.bio.id,
      bioEn: item.bio.en,
      avatar: item.avatar,
      socials: serializeSocialLines(item.socials),
      sortOrder: item.sortOrder,
      isActive: item.isActive
    }),
    toPayload: (values) => ({
      name: readString(values, "name"),
      role: {
        id: readString(values, "roleId"),
        en: readString(values, "roleEn")
      },
      bio: {
        id: readString(values, "bioId"),
        en: readString(values, "bioEn")
      },
      avatar: readString(values, "avatar"),
      socials: parseSocialLines(readString(values, "socials")),
      sortOrder: readNumber(values, "sortOrder"),
      isActive: readBoolean(values, "isActive")
    }),
    toCard: (item: TeamMember) => ({
      title: item.name,
      subtitle: item.role.id,
      badges: [item.socials.length ? `${item.socials.length} links` : "no links"]
    })
  },
  testimonials: {
    title: "Testimonial Manager",
    description: "Kelola review klien dan rating bintang.",
    accent: "#CC0000",
    fields: [
      { name: "clientName", label: "Client Name", type: "text" },
      { name: "company", label: "Company", type: "text" },
      { name: "quoteId", label: "Quote ID", type: "textarea" },
      { name: "quoteEn", label: "Quote EN", type: "textarea" },
      { name: "rating", label: "Rating", type: "number" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "isActive", label: "Active", type: "checkbox" }
    ],
    createEmpty: () => ({
      clientName: "",
      company: "",
      quoteId: "",
      quoteEn: "",
      rating: 5,
      sortOrder: 0,
      isActive: true
    }),
    toFormValues: (item: Testimonial) => ({
      clientName: item.clientName,
      company: item.company,
      quoteId: item.quote.id,
      quoteEn: item.quote.en,
      rating: item.rating,
      sortOrder: item.sortOrder,
      isActive: item.isActive
    }),
    toPayload: (values) => ({
      clientName: readString(values, "clientName"),
      company: readString(values, "company"),
      quote: {
        id: readString(values, "quoteId"),
        en: readString(values, "quoteEn")
      },
      rating: readNumber(values, "rating"),
      sortOrder: readNumber(values, "sortOrder"),
      isActive: readBoolean(values, "isActive")
    }),
    toCard: (item: Testimonial) => ({
      title: item.clientName,
      subtitle: item.company,
      badges: [`${item.rating} stars`, item.isActive ? "active" : "draft"]
    })
  },
  catalog: {
    title: "Catalog Manager",
    description: "Kelola paket, harga, fitur, dan label teknologi.",
    accent: "#FFF6E8",
    fields: [
      { name: "slug", label: "Slug", type: "text" },
      { name: "nameId", label: "Name ID", type: "text" },
      { name: "nameEn", label: "Name EN", type: "text" },
      { name: "descriptionId", label: "Description ID", type: "textarea" },
      { name: "descriptionEn", label: "Description EN", type: "textarea" },
      { name: "categoryId", label: "Category ID", type: "text" },
      { name: "categoryEn", label: "Category EN", type: "text" },
      {
        name: "technologyLabels",
        label: "Technologies (comma separated)",
        type: "textarea"
      },
      { name: "featuresId", label: "Features ID (one per line)", type: "textarea" },
      { name: "featuresEn", label: "Features EN (one per line)", type: "textarea" },
      { name: "priceFrom", label: "Price From", type: "number" },
      { name: "priceTo", label: "Price To", type: "number" },
      { name: "priceLabelId", label: "Price Label ID", type: "text" },
      { name: "priceLabelEn", label: "Price Label EN", type: "text" },
      { name: "ctaUrl", label: "CTA URL", type: "text" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
      { name: "isPriceHidden", label: "Hide Price", type: "checkbox" },
      { name: "isActive", label: "Active", type: "checkbox" }
    ],
    createEmpty: () => ({
      slug: "",
      nameId: "",
      nameEn: "",
      descriptionId: "",
      descriptionEn: "",
      categoryId: "",
      categoryEn: "",
      technologyLabels: "",
      featuresId: "",
      featuresEn: "",
      priceFrom: 0,
      priceTo: 0,
      priceLabelId: "",
      priceLabelEn: "",
      ctaUrl: "https://wa.me/6281234567890",
      sortOrder: 0,
      isPriceHidden: false,
      isActive: true
    }),
    toFormValues: (item: CatalogItem) => ({
      slug: item.slug,
      nameId: item.name.id,
      nameEn: item.name.en,
      descriptionId: item.description.id,
      descriptionEn: item.description.en,
      categoryId: item.category.id,
      categoryEn: item.category.en,
      technologyLabels: item.technologyLabels.join(", "),
      featuresId: item.features.map((feature) => feature.id).join("\n"),
      featuresEn: item.features.map((feature) => feature.en).join("\n"),
      priceFrom: item.priceFrom ?? 0,
      priceTo: item.priceTo ?? 0,
      priceLabelId: item.priceLabel.id,
      priceLabelEn: item.priceLabel.en,
      ctaUrl: item.ctaUrl,
      sortOrder: item.sortOrder,
      isPriceHidden: item.isPriceHidden,
      isActive: item.isActive
    }),
    toPayload: (values) => {
      const featureIdLines = parseLines(readString(values, "featuresId"));
      const featureEnLines = parseLines(readString(values, "featuresEn"));

      return {
        slug: slugify(readString(values, "slug")),
        name: {
          id: readString(values, "nameId"),
          en: readString(values, "nameEn")
        },
        description: {
          id: readString(values, "descriptionId"),
          en: readString(values, "descriptionEn")
        },
        category: {
          id: readString(values, "categoryId"),
          en: readString(values, "categoryEn")
        },
        technologyLabels: parseCommaList(readString(values, "technologyLabels")),
        features: featureIdLines.map((value, index) => ({
          id: value,
          en: featureEnLines[index] ?? value
        })),
        priceFrom: readBoolean(values, "isPriceHidden")
          ? null
          : readNumber(values, "priceFrom"),
        priceTo: readBoolean(values, "isPriceHidden")
          ? null
          : readNumber(values, "priceTo"),
        priceLabel: {
          id: readString(values, "priceLabelId"),
          en: readString(values, "priceLabelEn")
        },
        isPriceHidden: readBoolean(values, "isPriceHidden"),
        ctaUrl: readString(values, "ctaUrl"),
        sortOrder: readNumber(values, "sortOrder"),
        isActive: readBoolean(values, "isActive")
      };
    },
    toCard: (item: CatalogItem) => ({
      title: item.name.id,
      subtitle: item.category.id,
      badges: [...item.technologyLabels.slice(0, 3), item.isPriceHidden ? "contact-only" : "priced"]
    })
  }
};

export function getSettingsFormValues(settings: SiteSettings): ResourceFormValues {
  return {
    heroBadgeId: settings.heroBadge.id,
    heroBadgeEn: settings.heroBadge.en,
    heroHeadlineId: settings.heroHeadline.id,
    heroHeadlineEn: settings.heroHeadline.en,
    heroSubheadlineId: settings.heroSubheadline.id,
    heroSubheadlineEn: settings.heroSubheadline.en,
    heroCtaLabelId: settings.heroCtaLabel.id,
    heroCtaLabelEn: settings.heroCtaLabel.en,
    heroCtaHref: settings.heroCtaHref,
    aboutHeadlineId: settings.aboutHeadline.id,
    aboutHeadlineEn: settings.aboutHeadline.en,
    aboutStoryId: settings.aboutStory.id,
    aboutStoryEn: settings.aboutStory.en,
    missionId: settings.mission.id,
    missionEn: settings.mission.en,
    visionId: settings.vision.id,
    visionEn: settings.vision.en,
    stats: settings.stats
      .map((stat) => `${stat.value} | ${stat.label.id} | ${stat.label.en}`)
      .join("\n"),
    whyUs: settings.whyUs
      .map(
        (item) =>
          `${item.title.id} | ${item.title.en} | ${item.body.id} | ${item.body.en}`
      )
      .join("\n"),
    contactHeadlineId: settings.contactHeadline.id,
    contactHeadlineEn: settings.contactHeadline.en,
    contactCopyId: settings.contactCopy.id,
    contactCopyEn: settings.contactCopy.en,
    whatsapp: settings.whatsapp,
    phone: settings.phone,
    email: settings.email,
    addressId: settings.address.id,
    addressEn: settings.address.en,
    socials: serializeSocialLines(settings.socials)
  };
}

export function getSettingsFields(): ResourceField[] {
  return [
    { name: "heroBadgeId", label: "Hero Badge ID", type: "text" },
    { name: "heroBadgeEn", label: "Hero Badge EN", type: "text" },
    { name: "heroHeadlineId", label: "Hero Headline ID", type: "text" },
    { name: "heroHeadlineEn", label: "Hero Headline EN", type: "text" },
    { name: "heroSubheadlineId", label: "Hero Subheadline ID", type: "textarea" },
    { name: "heroSubheadlineEn", label: "Hero Subheadline EN", type: "textarea" },
    { name: "heroCtaLabelId", label: "Hero CTA Label ID", type: "text" },
    { name: "heroCtaLabelEn", label: "Hero CTA Label EN", type: "text" },
    { name: "heroCtaHref", label: "Hero CTA Href", type: "text" },
    { name: "aboutHeadlineId", label: "About Headline ID", type: "text" },
    { name: "aboutHeadlineEn", label: "About Headline EN", type: "text" },
    { name: "aboutStoryId", label: "About Story ID", type: "textarea" },
    { name: "aboutStoryEn", label: "About Story EN", type: "textarea" },
    { name: "missionId", label: "Mission ID", type: "textarea" },
    { name: "missionEn", label: "Mission EN", type: "textarea" },
    { name: "visionId", label: "Vision ID", type: "textarea" },
    { name: "visionEn", label: "Vision EN", type: "textarea" },
    {
      name: "stats",
      label: "Stats (one per line: Value | Label ID | Label EN)",
      type: "textarea"
    },
    {
      name: "whyUs",
      label: "Why Us (one per line: Title ID | Title EN | Body ID | Body EN)",
      type: "textarea"
    },
    { name: "contactHeadlineId", label: "Contact Headline ID", type: "text" },
    { name: "contactHeadlineEn", label: "Contact Headline EN", type: "text" },
    { name: "contactCopyId", label: "Contact Copy ID", type: "textarea" },
    { name: "contactCopyEn", label: "Contact Copy EN", type: "textarea" },
    { name: "whatsapp", label: "WhatsApp", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "addressId", label: "Address ID", type: "text" },
    { name: "addressEn", label: "Address EN", type: "text" },
    {
      name: "socials",
      label: "Socials (one per line: Label | URL)",
      type: "textarea"
    }
  ];
}

export function settingsValuesToPayload(values: ResourceFormValues): SiteSettings {
  return {
    heroBadge: {
      id: readString(values, "heroBadgeId"),
      en: readString(values, "heroBadgeEn")
    },
    heroHeadline: {
      id: readString(values, "heroHeadlineId"),
      en: readString(values, "heroHeadlineEn")
    },
    heroSubheadline: {
      id: readString(values, "heroSubheadlineId"),
      en: readString(values, "heroSubheadlineEn")
    },
    heroCtaLabel: {
      id: readString(values, "heroCtaLabelId"),
      en: readString(values, "heroCtaLabelEn")
    },
    heroCtaHref: readString(values, "heroCtaHref"),
    aboutHeadline: {
      id: readString(values, "aboutHeadlineId"),
      en: readString(values, "aboutHeadlineEn")
    },
    aboutStory: {
      id: readString(values, "aboutStoryId"),
      en: readString(values, "aboutStoryEn")
    },
    mission: {
      id: readString(values, "missionId"),
      en: readString(values, "missionEn")
    },
    vision: {
      id: readString(values, "visionId"),
      en: readString(values, "visionEn")
    },
    stats: parseLines(readString(values, "stats")).map((entry) => {
      const [value, labelId, labelEn] = entry.split("|").map((part) => part.trim());
      return {
        value: value ?? "",
        label: {
          id: labelId ?? "",
          en: labelEn ?? labelId ?? ""
        }
      };
    }),
    whyUs: parseLines(readString(values, "whyUs")).map((entry) => {
      const [titleId, titleEn, bodyId, bodyEn] = entry
        .split("|")
        .map((part) => part.trim());
      return {
        title: {
          id: titleId ?? "",
          en: titleEn ?? titleId ?? ""
        },
        body: {
          id: bodyId ?? "",
          en: bodyEn ?? bodyId ?? ""
        }
      };
    }),
    contactHeadline: {
      id: readString(values, "contactHeadlineId"),
      en: readString(values, "contactHeadlineEn")
    },
    contactCopy: {
      id: readString(values, "contactCopyId"),
      en: readString(values, "contactCopyEn")
    },
    whatsapp: readString(values, "whatsapp"),
    phone: readString(values, "phone"),
    email: readString(values, "email"),
    address: {
      id: readString(values, "addressId"),
      en: readString(values, "addressEn")
    },
    socials: parseSocialLines(readString(values, "socials"))
  };
}
