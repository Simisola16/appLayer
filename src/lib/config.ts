export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "NGN";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  region: string;
}

export const CURRENCIES: CurrencyConfig[] = [
  {
    code: "USD",
    symbol: "$",
    label: "USD ($)",
    region: "United States Dollar",
  },
  {
    code: "EUR",
    symbol: "€",
    label: "EUR (€)",
    region: "Euro",
  },
  {
    code: "GBP",
    symbol: "£",
    label: "GBP (£)",
    region: "British Pound",
  },
  {
    code: "CAD",
    symbol: "CA$",
    label: "CAD (CA$)",
    region: "Canadian Dollar",
  },
  {
    code: "AUD",
    symbol: "A$",
    label: "AUD (A$)",
    region: "Australian Dollar",
  },
  {
    code: "NGN",
    symbol: "₦",
    label: "NGN (₦)",
    region: "Nigerian Naira",
  },
];

export interface PackageItem {
  id: "starter" | "professional" | "advanced";
  name: string;
  priceDisplay: string;
  pricesByCurrency: Record<CurrencyCode, string>;
  pricePrefix?: string;
  badge?: string;
  popular?: boolean;
  description: string;
  inheritedLabel?: string;
  features: string[];
  ctaText: string;
  formOptionValue: string;
}

export function formatPackageOptionForCurrency(
  pkg: PackageItem,
  currency: CurrencyCode
): string {
  const price = pkg.pricesByCurrency[currency] || pkg.priceDisplay;
  const shortTitle = pkg.name.replace(" Package", "");
  if (pkg.pricePrefix) {
    return `${shortTitle} — ${pkg.pricePrefix} ${price} (${currency})`;
  }
  return `${shortTitle} — ${price} (${currency})`;
}

export const SITE_CONFIG = {
  brandName: "AppLayer",
  brandDescriptor: "PWA Transformation Studio",
  siteTitle: "Website to Mobile App Transformation | Installable PWA Solutions",
  siteDescription:
    "Give your customers an easier way to access your business. Transform your existing website into an installable mobile app experience for Android and iPhone.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://applayer.studio",
  /**
   * Configurable integration endpoints.
   * No personal or fake phone/email credentials are embedded.
   * Set NEXT_PUBLIC_WHATSAPP_NUMBER (digits only, e.g. "15550000000") or NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL in .env.local when connecting live channels.
   */
  integrations: {
    enquiryEndpoint: process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "/api/enquiry",
    whatsappPlaceholderNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    hasLiveBackend: Boolean(process.env.NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL),
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ],
  trustIndicators: [
    {
      label: "Android Compatible",
      detail: "Browser-native installation",
    },
    {
      label: "iPhone Compatible",
      detail: "Safari Home Screen integration",
    },
    {
      label: "Installable Experience",
      detail: "Direct from browser, no store bottleneck",
    },
    {
      label: "Custom Branding",
      detail: "Dedicated icon, theme & launch view",
    },
    {
      label: "Modern Web Technology",
      detail: "Standard-compliant PWA architecture",
    },
  ],
  packages: [
    {
      id: "starter",
      name: "Starter Package",
      priceDisplay: "$99",
      pricesByCurrency: {
        USD: "$99",
        EUR: "€92",
        GBP: "£79",
        CAD: "CA$139",
        AUD: "A$149",
        NGN: "₦150,000",
      },
      description:
        "For businesses looking to make their existing websites installable.",
      features: [
        "Initial website compatibility assessment",
        "Progressive Web App configuration",
        "Custom app icon configuration",
        "Basic splash screen configuration",
        "Android installation support",
        "iPhone Home Screen installation guidance",
        "Basic service worker configuration",
        "Installation testing",
        "Basic launch support",
      ],
      ctaText: "Choose Starter",
      formOptionValue: "Starter — $99",
    },
    {
      id: "professional",
      name: "Professional Package",
      priceDisplay: "$249",
      pricesByCurrency: {
        USD: "$249",
        EUR: "€229",
        GBP: "£199",
        CAD: "CA$349",
        AUD: "A$379",
        NGN: "₦375,000",
      },
      badge: "MOST POPULAR",
      popular: true,
      description:
        "For businesses seeking a more complete app-like experience.",
      inheritedLabel: "Includes everything in Starter, plus:",
      features: [
        "Enhanced mobile experience",
        "Advanced caching configuration",
        "Offline functionality where technically supported",
        "Custom installation experience",
        "Push notification setup where supported",
        "Performance optimisation",
        "Cross-device testing",
        "Additional configuration",
        "Priority implementation support",
      ],
      ctaText: "Choose Professional",
      formOptionValue: "Professional — $249",
    },
    {
      id: "advanced",
      name: "Advanced Package",
      pricePrefix: "Starting at",
      priceDisplay: "$499",
      pricesByCurrency: {
        USD: "$499",
        EUR: "€459",
        GBP: "£399",
        CAD: "CA$699",
        AUD: "A$759",
        NGN: "₦750,000",
      },
      description:
        "For businesses requiring more advanced functionality and custom integrations.",
      inheritedLabel: "Includes everything in Professional, plus:",
      features: [
        "Advanced offline capabilities",
        "Background synchronisation where supported",
        "Custom application integrations",
        "Advanced notification workflows",
        "Additional technical customisation",
        "Extended testing",
        "Priority support",
        "Custom implementation planning",
      ],
      ctaText: "Request Advanced Quote",
      formOptionValue: "Advanced — Starting at $499",
    },
  ] as PackageItem[],
  pricingDisclaimers: {
    primary:
      "All packages represent indicative starting prices. Final quotations depend on website architecture, technical compatibility, requested functionality, integrations and implementation complexity.",
    exclusions: [
      "Major website redesigns are not automatically included.",
      "Backend development is quoted separately.",
      "App Store and Google Play publishing are separate services.",
      "Third-party subscriptions and infrastructure costs are excluded unless specifically agreed.",
      "Additional custom features may require separate quotations.",
    ],
  },
};

export function buildWhatsAppEnquiryUrl(customMessage?: string): string {
  const defaultText =
    customMessage ||
    "Hello, I would like to enquire about transforming our existing business website into an installable Progressive Web App (PWA).";
  const encoded = encodeURIComponent(defaultText);
  const cleanNumber = SITE_CONFIG.integrations.whatsappPlaceholderNumber.replace(
    /[^0-9]/g,
    ""
  );
  if (cleanNumber) {
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  }
  return `https://wa.me/?text=${encoded}`;
}
