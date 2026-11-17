"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Link2,
  FileSearch,
  FileSpreadsheet,
  CheckSquare,
  Code,
  Smartphone,
  CheckCircle,
  Clock,
} from "lucide-react";

const workflowSteps = [
  {
    step: "01",
    title: "Client submits website URL.",
    detail:
      "Share your existing web address, preferred package, and target objectives through our project enquiry form.",
    icon: Link2,
  },
  {
    step: "02",
    title: "Technical compatibility assessment.",
    detail:
      "We inspect your website architecture, hosting setup, HTTPS configuration, and mobile readiness.",
    icon: FileSearch,
  },
  {
    step: "03",
    title: "Package selection and quotation.",
    detail:
      "We confirm the appropriate transformation tier and provide a clear quotation based on technical requirements.",
    icon: FileSpreadsheet,
  },
  {
    step: "04",
    title: "Project approval.",
    detail:
      "Once the scope, deliverables, and brand assets (icons and colours) are approved, implementation begins.",
    icon: CheckSquare,
  },
  {
    step: "05",
    title: "Development and configuration.",
    detail:
      "We engineer the Web App Manifest, service worker caching rules, installation prompts, and selected features.",
    icon: Code,
  },
  {
    step: "06",
    title: "Testing across devices.",
    detail:
      "We verify installation flows, standalone viewport presentation, and offline behaviour across supported Android and iPhone environments.",
    icon: Smartphone,
  },
  {
    step: "07",
    title: "Deployment and handover.",
    detail:
      "The Progressive Web App configuration is deployed to your environment with complete customer installation guidance.",
    icon: CheckCircle,
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 lg:py-32 bg-[#090b10] text-white border-b border-white/10 bg-grid-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 mb-4">
              <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-blue-400">
                06 / Delivery Workflow
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.15]">
              Your Project, From Assessment to Launch.
            </h2>
          </div>

          {/* Timeline Transparency Note */}
          <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111522] border border-white/10 text-xs sm:text-sm text-slate-300">
            <Clock className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              Implementation timelines depend on website architecture and
              project complexity.
            </span>
          </div>
        </div>

        {/* 7-Stage Implementation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {workflowSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-[#10141f] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-blue-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded">
                      {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="font-[family-name:var(--font-jakarta)] text-sm font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-[family-name:var(--font-mono)] text-slate-500">
                  <span>Stage {item.step} of 07</span>
                  <span className="text-blue-400">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
