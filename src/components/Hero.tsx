"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Code2,
  Download,
} from "lucide-react";
import DeviceMockup from "./DeviceMockup";
import { SITE_CONFIG } from "@/lib/config";

const trustIcons = [Smartphone, Smartphone, Download, Sparkles, Code2];

export default function Hero() {
  return (
    <section className="relative bg-[#08090d] text-white pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-white/10 overflow-hidden bg-grid-dark">
      {/* Subtle top architectural highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[320px] bg-blue-600/10 blur-[130px] rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Eyebrow Technical Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#111521] border border-white/10">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-slate-300">
                Progressive Web App Transformation Service
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-[family-name:var(--font-jakarta)] text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight text-white leading-[1.08]">
              Your Website.{" "}
              <span className="text-blue-500 block sm:inline">Now an App.</span>
            </h1>

            {/* Supporting Headline */}
            <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl">
              Give your customers an easier way to access your business.
              Transform your existing website into an installable mobile app
              experience for Android and iPhone.
            </p>

            {/* Supporting Paragraph */}
            <p className="text-base text-slate-400 leading-relaxed max-w-xl">
              Deliver a more convenient digital experience without the
              complexity and cost of building separate native applications from
              scratch.
            </p>

            {/* Key Capability Checklist Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Install on supported Android devices</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Add to iPhone Home Screen via Safari</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Dedicated custom app icon & launch view</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Configured offline & push support</span>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base px-7 py-4 rounded-xl transition-all duration-150 shadow-sm hover:shadow-blue-600/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span>Transform My Website</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center gap-2 bg-[#121622] hover:bg-[#191e2e] text-white border border-white/15 font-semibold text-base px-7 py-4 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span>Explore Packages</span>
              </Link>
            </div>

            {/* Technical Transparency Note */}
            <p className="text-xs text-slate-500 flex items-center gap-2 pt-1">
              <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
              <span>
                Actual capabilities depend on website architecture, browser, and
                operating system.
              </span>
            </p>
          </motion.div>

          {/* Right Hardware Visual Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            <DeviceMockup />
          </motion.div>
        </div>

        {/* TRUST INDICATORS FEATURE STRIP */}
        <div className="mt-16 lg:mt-20 pt-10 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {SITE_CONFIG.trustIndicators.map((item, idx) => {
              const IconComponent = trustIcons[idx] || Smartphone;
              return (
                <div
                  key={item.label}
                  className="bg-[#0e111a]/90 border border-white/[0.08] rounded-xl p-4 flex items-start gap-3 hover:border-white/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <IconComponent className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white leading-snug">
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 leading-snug">
                      {item.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
