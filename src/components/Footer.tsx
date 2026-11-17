import React from "react";
import Link from "next/link";
import { Layers, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-[#06070a] text-slate-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Column 1: Brand Identity & Required Footer Description */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-[#111520] border border-blue-500/40 flex items-center justify-center">
                <Layers className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-jakarta)] text-lg font-bold tracking-tight text-white leading-none">
                  {SITE_CONFIG.brandName}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-slate-400 mt-1">
                  Web-to-App Studio
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Helping businesses transform their existing websites into modern,
              installable mobile experiences.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-[family-name:var(--font-mono)] text-slate-500">
              <span>Android Compatible</span>
              <span>•</span>
              <span>iPhone Compatible</span>
              <span>•</span>
              <span>USD Pricing</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-white">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-white transition-colors"
                >
                  Website Compatibility Assessment
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="hover:text-white transition-colors"
                >
                  Progressive Web App Configuration
                </Link>
              </li>
              <li>
                <Link
                  href="/#compatibility"
                  className="hover:text-white transition-colors"
                >
                  Android & iPhone Installation Setup
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="hover:text-white transition-colors"
                >
                  Offline Caching & Push Architecture
                </Link>
              </li>
              <li>
                <Link
                  href="/#process"
                  className="hover:text-white transition-colors"
                >
                  Cross-Device QA & Handover
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Packages & Enquiry */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-white">
              Packages
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/?package=starter#contact"
                  className="hover:text-white transition-colors"
                >
                  Starter — $99
                </Link>
              </li>
              <li>
                <Link
                  href="/?package=professional#contact"
                  className="hover:text-white transition-colors"
                >
                  Professional — $249
                </Link>
              </li>
              <li>
                <Link
                  href="/?package=advanced#contact"
                  className="hover:text-white transition-colors"
                >
                  Advanced — From $499
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  <span>Start Enquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026. All rights reserved.</p>
          <p>
            Progressive Web App capabilities depend on website architecture,
            browser, and operating system support.
          </p>
        </div>
      </div>
    </footer>
  );
}
