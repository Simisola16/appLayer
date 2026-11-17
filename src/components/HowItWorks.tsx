"use client";

import React from "react";
import { motion } from "framer-motion";
import { SearchCode, Sliders, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    label: "Step 01 — Website Assessment",
    title: "Website Assessment",
    description:
      "We review your existing website, architecture and technical compatibility to determine the best transformation approach.",
    icon: SearchCode,
    deliverables: [
      "HTTPS & architecture inspection",
      "Responsive layout readiness review",
      "Platform capability mapping",
    ],
  },
  {
    number: "02",
    label: "Step 02 — App Transformation",
    title: "App Transformation",
    description:
      "We configure your Progressive Web App experience, including installation support, branding and appropriate app-like functionality.",
    icon: Sliders,
    deliverables: [
      "Web App Manifest & custom icon setup",
      "Service worker & caching strategy",
      "Standalone viewport & launch styling",
    ],
  },
  {
    number: "03",
    label: "Step 03 — Testing and Launch",
    title: "Testing and Launch",
    description:
      "We test the experience across supported devices and prepare your web app for customer installation.",
    icon: Rocket,
    deliverables: [
      "Android browser installation verification",
      "iPhone Safari Home Screen validation",
      "Deployment & customer install guidance",
    ],
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 bg-white text-slate-900 border-b border-slate-200 bg-grid-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 mb-4">
            <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-blue-600">
              01 / Methodology
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.15]">
            From Website to App in Three Simple Steps.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            A structured engineering process designed to add installable mobile
            capabilities to your existing web presence without disrupting daily
            operations.
          </p>
        </div>

        {/* Three-Step Architectural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-7 sm:p-8 flex flex-col justify-between hover:border-blue-600/40 hover:bg-white hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-200"
              >
                <div>
                  {/* Top Row: Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-7">
                    <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md bg-slate-900 text-white">
                      Step {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Step Title & Exact Required Copy */}
                  <h3 className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Technical Sub-Deliverables */}
                <div className="mt-8 pt-6 border-t border-slate-200/80">
                  <div className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-slate-400 mb-3">
                    Key Focus Areas
                  </div>
                  <ul className="space-y-2">
                    {step.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs font-medium text-slate-700"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
