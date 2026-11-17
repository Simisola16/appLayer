"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "q1",
    number: "Q1",
    question: "What is a Progressive Web App?",
    answer:
      "A Progressive Web App (PWA) is a web application built with modern web technologies (such as a Web App Manifest and Service Workers) that offers installability on supported devices and an app-like user experience—including a dedicated home screen icon, standalone full-screen display without browser address bars, and configurable caching.",
  },
  {
    id: "q2",
    number: "Q2",
    question: "Can my existing website become a mobile app?",
    answer:
      "Many modern, mobile-responsive websites served over HTTPS can be adapted into an installable Progressive Web App. However, technical compatibility must first be assessed by reviewing your current website architecture, hosting environment, and functional requirements.",
  },
  {
    id: "q3",
    number: "Q3",
    question: "Does it work on Android?",
    answer:
      "Yes. Supported Android browsers (such as Google Chrome, Microsoft Edge, and Samsung Internet) provide native-style installation functionality, allowing users to install your web app directly onto their home screen and app drawer.",
  },
  {
    id: "q4",
    number: "Q4",
    question: "Does it work on iPhone?",
    answer:
      "Yes. iPhone users can add compatible websites directly to their Home Screen through Safari, launching the site with a dedicated custom icon in a standalone app-like window.",
  },
  {
    id: "q5",
    number: "Q5",
    question: "Do customers need to download anything from an app store?",
    answer:
      "Not necessarily. Compatible Progressive Web Apps can be installed directly from the visitor's mobile web browser onto their device home screen without requiring an App Store or Google Play download.",
  },
  {
    id: "q6",
    number: "Q6",
    question: "Does the website work offline?",
    answer:
      "Selected content, key pages, and static assets can work offline or on unstable connections when properly configured with a Service Worker caching strategy. Dynamic features that require live server database queries still require connectivity.",
  },
  {
    id: "q7",
    number: "Q7",
    question: "Can my business send notifications?",
    answer:
      "Yes, web push notifications are available on supported platforms and browser versions (including supported Android browsers and modern iOS versions for web apps added to the Home Screen). They require appropriate technical configuration and explicit opt-in permission from the user.",
  },
  {
    id: "q8",
    number: "Q8",
    question: "Will my original website change?",
    answer:
      "The primary goal is to preserve your existing website design and content while adding Progressive Web App capabilities alongside it. Any necessary adjustments for mobile responsiveness or technical compatibility will be clearly identified during the initial assessment.",
  },
  {
    id: "q9",
    number: "Q9",
    question: "How long does implementation take?",
    answer:
      "Implementation timelines depend on your website's underlying architecture, technical readiness, and the selected package features. A clear delivery schedule is provided following your initial technical compatibility assessment.",
  },
  {
    id: "q10",
    number: "Q10",
    question: "How much does it cost?",
    answer:
      "We offer three indicative starting packages in US Dollars: the Starter Package at $99, the Professional Package at $249, and the Advanced Package starting at $499. Final quotations depend on your website architecture, technical requirements, and requested integrations.",
  },
  {
    id: "q11",
    number: "Q11",
    question: "Can I publish the app on Google Play or Apple's App Store?",
    answer:
      "Browser-based PWA installation is distinct from traditional app store publishing. Submitting an application to Google Play or Apple's App Store is a separate service that requires additional native wrapper packaging, developer account registration, and store compliance review.",
  },
  {
    id: "q12",
    number: "Q12",
    question: "Do you provide maintenance?",
    answer:
      "Yes. Ongoing maintenance, periodic compatibility checks across browser updates, and additional technical support can be arranged separately based on your business needs.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("q1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 bg-white text-slate-900 border-b border-slate-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-blue-600">
              07 / Technical & Commercial FAQ
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.15]">
            Frequently Asked Questions.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Clear answers regarding Progressive Web App capabilities, platform
            support, pricing, and project delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const contentId = `faq-panel-${faq.id}`;
            const buttonId = `faq-button-${faq.id}`;

            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-colors duration-150 ${
                  isOpen
                    ? "bg-[#F8FAFC] border-blue-600/40 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-[family-name:var(--font-mono)] text-xs font-bold px-2.5 py-1 rounded ${
                          isOpen
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {faq.number}
                      </span>
                      <span className="font-[family-name:var(--font-jakarta)] text-base sm:text-lg font-bold text-slate-900">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 sm:pl-16 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200/60 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
