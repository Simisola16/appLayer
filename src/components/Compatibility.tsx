"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Info,
  Smartphone,
  Share,
  PlusSquare,
  Download,
} from "lucide-react";

const androidCapabilities = [
  "Install through supported browsers.",
  "Dedicated home screen icon.",
  "Standalone application experience.",
  "Configured offline functionality.",
  "Push notifications where supported.",
  "Responsive mobile interface.",
];

const iphoneCapabilities = [
  "Add to Home Screen through Safari.",
  "Dedicated home screen icon.",
  "Standalone application experience.",
  "Configured offline functionality.",
  "Web push notifications on supported iOS versions for installed web apps.",
  "Responsive mobile interface.",
];

export default function Compatibility() {
  return (
    <section
      id="compatibility"
      className="py-24 lg:py-32 bg-[#090b10] text-white border-b border-white/10 bg-grid-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 mb-4">
            <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-blue-400">
              03 / Cross-Platform Compatibility
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.15]">
            One Web App. Multiple Devices.
          </h2>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Deliver an installable application experience across both major
            mobile ecosystems from a single web codebase—configured for each
            platform&apos;s installation method.
          </p>
        </div>

        {/* Two Device Comparison Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PANEL 1: ANDROID */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="bg-[#10141f] border border-white/10 rounded-2xl p-7 sm:p-9 flex flex-col justify-between"
          >
            <div>
              {/* Panel Top Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest text-emerald-400">
                      Platform Profile 01
                    </span>
                    <h3 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-white">
                      ANDROID
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-[family-name:var(--font-mono)] text-slate-400 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg">
                  Chrome / Edge / Samsung
                </span>
              </div>

              {/* Visual Installation Preview Box */}
              <div className="my-6 p-4 rounded-xl bg-[#0a0d14] border border-white/[0.07]">
                <div className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-slate-400 mb-2.5">
                  Android Installation Mechanism
                </div>
                <div className="flex items-center justify-between bg-[#141927] border border-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                      App
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">
                        Install Application Prompt
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Direct browser prompt & app drawer integration
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
                    <Download className="w-3.5 h-3.5" />
                    Install
                  </span>
                </div>
              </div>

              {/* Capabilities List */}
              <ul className="space-y-3.5 mt-6">
                {androidCapabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-base text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 text-xs text-slate-400 font-[family-name:var(--font-mono)]">
              Supports native-style WebAPK installation on compatible Android
              browsers.
            </div>
          </motion.div>

          {/* PANEL 2: IPHONE */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="bg-[#10141f] border border-white/10 rounded-2xl p-7 sm:p-9 flex flex-col justify-between"
          >
            <div>
              {/* Panel Top Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest text-blue-400">
                      Platform Profile 02
                    </span>
                    <h3 className="font-[family-name:var(--font-jakarta)] text-2xl font-bold text-white">
                      IPHONE
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-[family-name:var(--font-mono)] text-slate-400 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg">
                  iOS Safari Home Screen
                </span>
              </div>

              {/* Visual Installation Preview Box */}
              <div className="my-6 p-4 rounded-xl bg-[#0a0d14] border border-white/[0.07]">
                <div className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-slate-400 mb-2.5">
                  iPhone Installation Mechanism
                </div>
                <div className="flex items-center justify-between bg-[#141927] border border-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-blue-400">
                      <Share className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">
                        Safari Share Menu → Add to Home Screen
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Guided visual prompt for iPhone visitors
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-md">
                    <PlusSquare className="w-3.5 h-3.5 text-blue-400" />
                    Add
                  </span>
                </div>
              </div>

              {/* Capabilities List */}
              <ul className="space-y-3.5 mt-6">
                {iphoneCapabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-base text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 text-xs text-slate-400 font-[family-name:var(--font-mono)]">
              Configured with Apple touch icons, status bar styling, and standalone
              manifest properties.
            </div>
          </motion.div>
        </div>

        {/* Technical Transparency & Platform Difference Notice */}
        <div className="mt-10 bg-[#10141f] border border-blue-500/30 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white">
              Platform & Browser Capability Notice
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Progressive Web App capabilities differ between platforms,
              operating system releases, and browser versions. Not every PWA
              feature works identically on Android and iPhone—for example,
              installation flows, background processes, and web push
              notification requirements follow distinct platform rules on
              Android browsers versus iOS Safari. During our initial website
              assessment, we map exact supported behaviours for your audience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
