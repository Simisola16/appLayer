import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090d",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: SITE_CONFIG.siteTitle,
    template: `%s | ${SITE_CONFIG.brandName}`,
  },
  description: SITE_CONFIG.siteDescription,
  applicationName: SITE_CONFIG.brandName,
  keywords: [
    "Website to Mobile App Transformation",
    "Progressive Web App Development",
    "Installable Web Application",
    "Convert Website to PWA",
    "Android and iPhone Web App",
    "Business Web App Solutions",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.brandName,
    title: SITE_CONFIG.siteTitle,
    description: SITE_CONFIG.siteDescription,
    images: [
      {
        url: "/images/og-preview.svg",
        width: 1200,
        height: 630,
        alt: "Your Website. Now an App. — Website to Mobile App Transformation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.siteTitle,
    description: SITE_CONFIG.siteDescription,
    images: ["/images/og-preview.svg"],
  },
  icons: {
    icon: "/icons/logo-mark.svg",
    shortcut: "/icons/logo-mark.svg",
    apple: "/icons/logo-mark.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-[family-name:var(--font-inter)] antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
