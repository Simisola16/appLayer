import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Compatibility from "@/components/Compatibility";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing Packages (USD) | Website to Mobile App Transformation",
  description:
    "Explore transparent USD pricing packages to transform your existing website into an installable Progressive Web App for Android and iPhone.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08090d]">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Dedicated Pricing Hero Banner */}
        <section className="py-16 lg:py-20 bg-[#08090d] text-white border-b border-white/10 bg-grid-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-white/[0.06] border border-white/10 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-blue-400 mb-4">
                Commercial Packages • USD
              </span>
              <h1 className="font-[family-name:var(--font-jakarta)] text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                Website-to-App Transformation Packages.
              </h1>
              <p className="mt-4 text-lg text-slate-300 leading-relaxed">
                Structured Progressive Web App packages designed for businesses
                seeking a reliable, installable mobile experience across
                supported Android and iPhone devices.
              </p>
            </div>
          </div>
        </section>

        <Pricing />
        <Compatibility />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
