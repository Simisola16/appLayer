"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  AlertCircle,
  ShieldAlert,
  Globe,
} from "lucide-react";
import {
  SITE_CONFIG,
  CURRENCIES,
  CurrencyCode,
  PackageItem,
} from "@/lib/config";

interface PricingProps {
  onSelectPackage?: (packageValue: string) => void;
}

export default function Pricing({ onSelectPackage }: PricingProps) {
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyCode>("USD");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlCurrency = params.get("currency")?.toUpperCase() as CurrencyCode;
      if (
        urlCurrency &&
        CURRENCIES.some((item) => item.code === urlCurrency)
      ) {
        setSelectedCurrency(urlCurrency);
      }
    }
  }, []);

  const handleCurrencyChange = (code: CurrencyCode) => {
    setSelectedCurrency(code);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("change-pwa-currency", { detail: code })
      );
    }
  };

  const handlePackageClick = (pkg: PackageItem) => {
    const displayedPrice =
      pkg.pricesByCurrency[selectedCurrency] || pkg.priceDisplay;
    const shortName = pkg.name.replace(" Package", "");
    const formattedOption =
      selectedCurrency === "USD"
        ? pkg.formOptionValue
        : pkg.pricePrefix
        ? `${shortName} — ${pkg.pricePrefix} ${displayedPrice} (${selectedCurrency})`
        : `${shortName} — ${displayedPrice} (${selectedCurrency})`;

    if (onSelectPackage) {
      onSelectPackage(formattedOption);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("change-pwa-currency", { detail: selectedCurrency })
      );
      window.dispatchEvent(
        new CustomEvent("select-pwa-package", {
          detail: {
            packageId: pkg.id,
            currency: selectedCurrency,
            optionLabel: formattedOption,
          },
        })
      );
    }
  };

  const activeCurrencyMeta =
    CURRENCIES.find((c) => c.code === selectedCurrency) || CURRENCIES[0];

  return (
    <section
      id="pricing"
      className="py-24 lg:py-32 bg-white text-slate-900 border-b border-slate-200 bg-grid-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 mb-4">
            <span className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-widest text-blue-600">
              04 / Investment Packages ({selectedCurrency})
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-jakarta)] text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-slate-900 leading-[1.15]">
            Transparent Transformation Packages.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Select the transformation tier that matches your technical
            requirements. Switch between international currencies below to view
            indicative package pricing.
          </p>

          {/* Interactive International Currency Switcher */}
          <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-3 bg-[#F8FAFC] border border-slate-200/90 p-2 rounded-2xl shadow-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider text-slate-500">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Currency:</span>
            </div>
            <div
              role="group"
              aria-label="Select pricing currency"
              className="flex flex-wrap items-center justify-center gap-1.5"
            >
              {CURRENCIES.map((curr) => {
                const isActive = selectedCurrency === curr.code;
                return (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => handleCurrencyChange(curr.code)}
                    aria-pressed={isActive}
                    title={curr.region}
                    className={`px-3.5 py-2 rounded-xl text-xs font-[family-name:var(--font-mono)] font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:text-slate-900"
                    }`}
                  >
                    {curr.label}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-3 text-xs font-[family-name:var(--font-mono)] text-slate-500">
            Displaying prices in{" "}
            <span className="font-semibold text-slate-700">
              {activeCurrencyMeta.region} ({activeCurrencyMeta.code})
            </span>
            {selectedCurrency !== "USD" &&
              " • Converted from standard USD base packages"}
          </p>
        </div>

        {/* Three Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SITE_CONFIG.packages.map((pkg, idx) => {
            const isPopular = Boolean(pkg.popular);
            const activePrice =
              pkg.pricesByCurrency[selectedCurrency] || pkg.priceDisplay;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-200 ${
                  isPopular
                    ? "bg-[#090b10] text-white border-2 border-blue-600 shadow-[0_24px_60px_rgba(15,23,42,0.18)] lg:-translate-y-2 p-8 sm:p-9"
                    : "bg-[#F8FAFC] text-slate-900 border border-slate-200/90 hover:border-slate-300 p-7 sm:p-8"
                }`}
              >
                {/* Subtle MOST POPULAR Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-8">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-widest bg-blue-600 text-white shadow-sm">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Package Name & Active Currency Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <h3
                      className={`font-[family-name:var(--font-jakarta)] text-xl font-bold ${
                        isPopular ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {pkg.name}
                    </h3>
                    <span
                      className={`font-[family-name:var(--font-mono)] text-xs px-2.5 py-1 rounded ${
                        isPopular
                          ? "bg-white/10 text-slate-300"
                          : "bg-slate-200/70 text-slate-600"
                      }`}
                    >
                      {selectedCurrency}
                    </span>
                  </div>

                  {/* Dynamic Price Display */}
                  <div className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    {pkg.pricePrefix && (
                      <span
                        className={`text-sm font-medium ${
                          isPopular ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {pkg.pricePrefix}
                      </span>
                    )}
                    <span
                      key={`${pkg.id}-${selectedCurrency}`}
                      className={`font-[family-name:var(--font-jakarta)] font-extrabold tracking-tight ${
                        activePrice.length > 6
                          ? "text-3xl sm:text-4xl"
                          : "text-4xl sm:text-5xl"
                      } ${isPopular ? "text-white" : "text-slate-900"}`}
                    >
                      {activePrice}
                    </span>
                    <span
                      className={`text-xs font-[family-name:var(--font-mono)] uppercase ${
                        isPopular ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      / project
                    </span>
                  </div>

                  {/* Package Description */}
                  <p
                    className={`text-sm leading-relaxed pb-6 border-b ${
                      isPopular
                        ? "text-slate-300 border-white/10"
                        : "text-slate-600 border-slate-200"
                    }`}
                  >
                    {pkg.description}
                  </p>

                  {/* Inherited Label if present */}
                  <div className="mt-6">
                    {pkg.inheritedLabel ? (
                      <p
                        className={`text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider font-semibold mb-4 ${
                          isPopular ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        {pkg.inheritedLabel}
                      </p>
                    ) : (
                      <p
                        className={`text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider font-semibold mb-4 ${
                          isPopular ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Package Includes:
                      </p>
                    )}

                    {/* Feature List */}
                    <ul className="space-y-3">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm"
                        >
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isPopular ? "text-blue-400" : "text-blue-600"
                            }`}
                          />
                          <span
                            className={
                              isPopular ? "text-slate-200" : "text-slate-700"
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Package CTA Button */}
                <div className="mt-9 pt-6 border-t border-current/10">
                  <Link
                    href={`/?package=${pkg.id}&currency=${selectedCurrency}#contact`}
                    onClick={() => handlePackageClick(pkg)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isPopular
                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-sm hover:shadow-blue-600/25"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* PRICING DISCLAIMER & SCOPE CLARIFICATIONS */}
        <div className="mt-14 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3.5 pb-6 border-b border-slate-200">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-[family-name:var(--font-mono)]">
                Pricing Disclaimer
              </h4>
              <p className="mt-1.5 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                {SITE_CONFIG.pricingDisclaimers.primary}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider text-slate-500 mb-3.5">
              <ShieldAlert className="w-4 h-4 text-slate-400" />
              <span>Scope & Commercial Clarifications</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {SITE_CONFIG.pricingDisclaimers.exclusions.map((note) => (
                <div
                  key={note}
                  className="bg-white border border-slate-200/80 rounded-lg px-4 py-3 text-xs text-slate-600 flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
