"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  AppWindow,
  Sparkles,
  Smartphone,
  Compass,
  WifiOff,
  BellRing,
  LayoutGrid,
  MonitorSmartphone,
  Gauge,
} from "lucide-react";

const features = [
  {
    index: "01",
    title: "Installable Web Experience",
    description:
      "Allow visitors to install supported websites directly onto their device home screens.",
    tag: "Browser-to-Device",
    icon: Download,
  },
  {
    index: "02",
    title: "Custom Application Icon",
    description:
      "Give the website a recognisable icon that represents the business.",
    tag: "Multi-Resolution Icons",
    icon: AppWindow,
  },
  {
    index: "03",
    title: "Branded Splash Screen",
    description:
      "Configure the appropriate launch experience where supported.",
    tag: "Launch Presentation",
    icon: Sparkles,
  },
  {
    index: "04",
    title: "Android Compatibility",
    description:
      "Provide installation support through compatible Android browsers.",
    tag: "Android WebAPK / Browser",
    icon: Smartphone,
  },
  {
    index: "05",
    title: "iPhone Compatibility",
    description:
      "Allow users to add the website to their iPhone Home Screen through Safari.",
    tag: "iOS Safari Integration",
    icon: Compass,
  },
  {
    index: "06",
    title: "Offline Functionality",
    description:
      "Configure caching to make selected website content available offline where technically appropriate.",
    tag: "Service Worker Caching",
    icon: WifiOff,
  },
  {
    index: "07",
    title: "Push Notifications",
    description:
      "Set up web push notifications on supported devices and browsers, subject to permissions and technical requirements.",
    tag: "Web Push API",
    icon: BellRing,
  },
  {
    index: "08",
    title: "App-Like Navigation",
    description:
      "Improve the mobile experience with standalone display and appropriate navigation.",
    tag: "Standalone Viewport",
    icon: LayoutGrid,
  },
  {
    index: "09",
    title: "Responsive Experience",
    description:
      "Ensure the experience works across different screen sizes.",
    tag: "Adaptive Layout",
    icon: MonitorSmartphone,
  },
  {
    index: "10",
    title: "Performance Optimisation",
    description:
      "Review loading performance and optimise relevant assets and resources.",
    tag: "Asset & Load Tuning",
    icon: Gauge,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 lg:py-32 bg-[#F3F5F8] text-slate-900 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 mb-4">
              <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-blue-600">
                02 / Capabilities & Architecture
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.15]">
              Engineered for an Authentic App-Like Experience.
            </h2>
          </div>
          <p className="text-base text-slate-600 max-w-md leading-relaxed">
            Every transformation is configured around modern Progressive Web App
            standards—combining custom branding, standalone display, and
            intelligent caching.
          </p>
        </div>

        {/* 10-Feature Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="bg-white border border-slate-200/90 rounded-xl p-6 flex flex-col justify-between hover:border-blue-600/40 hover:shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="font-[family-name:var(--font-mono)] text-[11px] font-medium text-slate-400">
                      {feature.index}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-jakarta)] text-base font-bold text-slate-900 mb-2 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-slate-500">
                    {feature.tag}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
