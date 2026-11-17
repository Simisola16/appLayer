"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  Blocks,
  Globe2,
  MousePointerClick,
  Palette,
  BadgeCheck,
} from "lucide-react";

const benefits = [
  {
    index: "01",
    title: "Cost Efficiency",
    description:
      "Reduce the need to commission separate native applications for supported use cases.",
    icon: Wallet,
  },
  {
    index: "02",
    title: "Existing Website Integration",
    description:
      "Build on an existing website rather than automatically starting from scratch.",
    icon: Blocks,
  },
  {
    index: "03",
    title: "Cross-Platform Reach",
    description:
      "Reach customers across supported Android and iPhone devices.",
    icon: Globe2,
  },
  {
    index: "04",
    title: "Convenient Installation",
    description: "Give customers a convenient way to access the business.",
    icon: MousePointerClick,
  },
  {
    index: "05",
    title: "Custom Branding",
    description:
      "Maintain the business's identity through icons, colours and launch presentation.",
    icon: Palette,
  },
  {
    index: "06",
    title: "Professional Implementation",
    description:
      "Receive a properly configured and tested web app experience.",
    icon: BadgeCheck,
  },
];

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="py-24 lg:py-32 bg-[#F3F5F8] text-slate-900 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 mb-4">
            <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-blue-600">
              05 / Strategic Advantage
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.15]">
            A Smarter Way to Deliver Mobile Experiences.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Why businesses choose Progressive Web App transformation when
            expanding their mobile presence.
          </p>
        </div>

        {/* 6 Professional Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-8 flex flex-col justify-between hover:border-blue-600/40 hover:shadow-[0_12px_36px_rgba(15,23,42,0.05)] transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-[family-name:var(--font-mono)] text-xs font-semibold text-slate-400">
                      {item.index}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
